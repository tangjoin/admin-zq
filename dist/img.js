var express = require('express');
var http = require('http');
var https = require('https');
var router = express.Router();
var fs = require('fs')
// var wzconfigs = require('../../models/wzconfigs')
// var domains = require('../../models/domains')
var imgs = require('../../models/imgs')
var common = require('../../routes/common')

//处理站点的静态文件, 如 css img font
router.get('*', async (req, res, next) => {
  // res.send(req.params.name + ':' + req.params.id);
  // return next()
  // console.log('图片访问处理');

  // console.log(req.url);
  var newImgUrl = req.url.split('?')[0]
  var imgfile = process.cwd() + '/cache/' + req.hostname + newImgUrl
  let bool = req.url.length > 5 ? true : false
  // var reg8 = /\/?$/;
  // console.log(reg8.test(req.url));
  
  // '(\.jpg|\.jpeg|\.gif|\.png|\.bmp|\.png|\.tif|\.pcx|\.tga|\.exif|\.fpx|\.svg|\.psd|\.cdr|\.pcd|\.dxf|\.ufo|\.eps|\.ai|\.raw|\.WMF|\.webp)$'
  var regimg = /(\.jpg|\.jpeg|\.gif|\.png|\.bmp|\.png|\.tif|\.pcx|\.tga|\.exif|\.fpx|\.svg|\.psd|\.cdr|\.pcd|\.dxf|\.ufo|\.eps|\.ai|\.raw|\.WMF|\.webp)$/
  if (fs.existsSync(imgfile) && imgfile.indexOf('.html') == -1 && regimg.test(newImgUrl) == true && bool) {
    // console.log('走缓存' + imgfile);
    return res.sendFile(imgfile)
  }
  // console.log(common.md5(req.url));
  var imgdb
  imgdb = imgs.findOne({ md5: common.md5(newImgUrl) }).exec()
  imgdb = await imgdb
  if (!imgdb) {
    return next()
  }
  var httpImg = function httpImg(response) {
    response.setEncoding('binary');  //二进制binary
    var Data = '';
    response.on('data', function (data) {    //加载到内存
      Data += data;
    }).on('end', function () {          //加载完
      // console.log(response.statusCode);
      // fs.mkdirSync(htmldir)
      if (response.statusCode == 200) {
        common.mkdir(imgfile)
        fs.writeFileSync(imgfile, Data, { encoding: 'binary' })
        return res.sendFile(imgfile)
      } else {
        return res.sendFile(process.cwd() + '/404.jpg')
      }
      // console.log('保存缓存');

    })

  }
  if (imgdb.imgUrl.indexOf('https://') == -1) {
    http.get(imgdb.imgUrl, httpImg).on('error', function (err) {
      // console.log('asdfasdfas');
      // return res.sendFile('./404.jpg')
      return res.sendFile(process.cwd() + '/404.jpg')
    })
  } else {

    https.get(imgdb.imgUrl, httpImg).on('error', function (err) {
      // console.log('asdfasdfas');
      return res.sendFile(process.cwd() + '/404.jpg')
      // return res.send('asdfasfasd');

    })
  }



});


module.exports = router;
