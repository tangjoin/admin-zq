
var express = require('express');
var router = express.Router();
var zqcjs = require('../../models/zqcjs')
var zqgroups = require('../../models/zqgroups')
var domains = require('../../models/domains')
var wzconfigs = require('../../models/wzconfigs')
var waiurls = require('../../models/waiurls')
var fs = require('fs')
var ejs = require('ejs')
var common = require('../common')


var lists = async (req, res) => {
  

  // console.log('栏目页面');
  var mainDomain = common.getMainDdomain(req.hostname)
  //取去url中的栏目 , 和页码
  var pagehtmlejs = process.cwd() + '/views/common/pager.ejs'
  var htmlfile
  // http://www.zmxlx.com/guojinews/2/
  
  // console.log(common.strTrim('guojinews/2/', '', '/'));
  
  if (req.url.indexOf('/index.html') == -1) {
    htmlfile = process.cwd() + '/cache/' + req.hostname + req.url + '/index.html'
  }else{
    htmlfile = process.cwd() + '/cache/' + req.hostname + req.url
  }
  
  var urlpatharr = []
  // var urlpath = req.params[0].replace(/([a-z\/]+)/, "$1-")
  // var urlpath = req.params[0].replace(/[0-9]+\/?$/, "$1-")
  urlpatharr[0] = req.params[0].match(/[a-z\/]+/g)[0]
  
  
  urlpatharr[1] = parseInt(req.params[0].match(/[0-9]+\/?$/))
  if (!urlpatharr[1]) {
    urlpatharr[1] = 1
  }
  // console.log(urlpatharr);
  
  // var urlpatharr = urlpath.split('-')
  // for (let index = 0; index < urlpatharr.length; index++) {
  //   const item = urlpatharr[index];
  //   urlpatharr[index] = item.replace(/\/$/, "")
  // }
  // console.log(urlpatharr);
  //断否是否为分页的格式
  // if (urlpatharr[1].indexOf('/') != -1) {
  //   urlpatharr[1] = parseInt(urlpatharr[1])
  //   // return res.send('asdf');
  //   // return res.status(404).send('Not Found');
  // }

  // // console.log(urlpatharr+'asdfas');
  //域名管理
  var domaindb
  domaindb = domains.findOne({ domain: mainDomain }).exec()
  domaindb = await domaindb
  // console.log(domaindb);
  //网站配置
  var wzconfigdb
  wzconfigdb = wzconfigs.findOne({ domainId: domaindb._id }).exec()
  wzconfigdb = await wzconfigdb
  // console.log(wzconfigdb);
  if (domaindb.domain == req.hostname) {
    return res.redirect('http://www.' + req.headers.host.replace(/(:80|:443)/, '') + req.url);
  }
  //判断子域名是否正确
  if (!common.ifSubPath(req.hostname, wzconfigdb.subDomain)) {
    return res.status(404).send('Not Found');
  }

  //判断缓存  wzconfigdb.cjcachetime
  // console.log('wzconfigdb', wzconfigdb);
  // console.log(htmlfile);
  if (fs.existsSync(htmlfile) && wzconfigdb.iscache) {
    let isfile = await common.isfiletime(htmlfile, wzconfigdb.listcachetime)
    // console.log(isfile);
    if (isfile) {
      // console.log('走的缓存,还是缓存期');
      return res.sendFile(htmlfile)
    } else {
      fs.unlinkSync(htmlfile)
      // console.log('不在缓存期了,删除');
    }
  }
  //判断缓存完

  //当前栏目
  // console.log(common.strTrim(urlpatharr[0], '/', '/'));
  
  var zqgroupdb
  zqgroupdb = zqgroups.findOne({ domainId: domaindb._id, asname: common.strTrim(urlpatharr[0], '/', '/')  }).exec()
  zqgroupdb = await zqgroupdb
  // console.log(zqgroupdb);
  
  if (!zqgroupdb) {
    return res.status(404).send('Not Found');
  }

  // console.log(zqgroupdb);
  //所有栏目
  var zqgroupsdb
  zqgroupsdb = zqgroups.find({ domainId: domaindb._id }).exec()
  zqgroupsdb = await zqgroupsdb
  // console.log(zqgroupsdb);
  if (!zqgroupsdb) {
    return res.status(404).send('Not Found');
  }
  //外连输出
  var waiurlsdb
  var waiurlsdb = waiurls.find({domainId: domaindb._id}).exec()
  waiurlsdb = await waiurlsdb
  // console.log(',',waiurlsdb);
  //最新推荐 最多40个
  var newcontents
  newcontents = zqcjs.find({ domainId: domaindb._id }, "keyword standardTime url title describe author source time imgUrl").sort({ standardTime: -1 }).limit(40).exec();
  newcontents = await newcontents
  newcontents = common.randarr(newcontents, wzconfigdb.listnewsnum)
  // console.log(newcontents);
  //最火推荐 最多40个
  var hotcontents
  hotcontents = zqcjs.find({ domainId: domaindb._id }, "keyword standardTime url title describe author source time imgUrl").sort({ spiderNum: -1 }).limit(30).exec()
  hotcontents = await hotcontents
  hotcontents = common.randarr(hotcontents, wzconfigdb.listhotnum)
  // console.log(hotcontents);
  
  //随机推荐 最多60个
  var randcontents
  randcontents = zqcjs.find({ domainId: domaindb._id }, "keyword standardTime url title describe author source time imgUrl").sort({ _id: -1 }).limit(60).exec()
  // randcontents = zqcjs.find({ domainId: domaindb._id }, "keyword standardTime url title describe author source time imgUrl").sort({ _id: -1 }).limit(60).hint({ _id: 1 }).exec()
  randcontents = await randcontents
  randcontents = common.randarr(randcontents, wzconfigdb.listrandnum)
  //取栏目页面最新的文章,做分页
  var page = 0
  if (urlpatharr[1] > 0) {
    page = urlpatharr[1] * wzconfigdb.listnum - wzconfigdb.listnum
  }
  // console.log(page);

  var contentdb
  contentdb = zqcjs.find({
    categoryId: zqgroupdb._id 
  }, "keyword standardTime url title describe author source time imgUrl").sort({ _id: -1 }).limit(wzconfigdb.listnum).skip(page).exec()
  // }, "keyword standardTime url title describe author source time imgUrl").sort({ _id: -1 }).limit(wzconfigdb.listnum).skip(page).hint({ _id: 1 }).exec()
  // }, "keyword standardTime url title describe author source time imgUrl").sort({ _id: -1 }).limit(wzconfigdb.listnum).exec()
  contentdb = await contentdb
  // console.log('asdf',contentdb);
  //设置分页
  var contentnum = 0
  contentnum = zqcjs.find({
    categoryId: zqgroupdb._id
  }, 'spiderNum').count().exec()
  contentnum = await contentnum
  // console.log(contentnum);
  var pager = {
    pagePath: "/" + common.strTrim(urlpatharr[0],'/','/'),
    maxNum: contentnum,
    pageCount: parseInt(Math.ceil(contentnum / wzconfigdb.listnum)),
    pageCurrent: urlpatharr[1] > 0 ? urlpatharr[1] : 1,
  }
  //生成分页html
  var pagerhtml = fs.readFileSync(pagehtmlejs, 'utf-8')
  pagerhtml = ejs.render(pagerhtml, {
    pager
  })
  pagerhtml = pagerhtml.replace(/\s+/gi, " ")
  // 分页生成完成end
  // http页面基本信息req.headers.host.replace(/(:80|:443)/, '')
  var tohttp = {
    mainDomain: common.getMainDdomain(req.headers.host.replace(/(:80|:443)/, '')),
    waphostname: wzconfigdb.subDomain + '.' + common.getMainDdomain(req.headers.host.replace(/(:80|:443)/, '')),
    url: req.url,
    contentUrl: 'http://' + req.headers.host.replace(/(:80|:443)/, '') + req.url,
    hostname: req.hostname,
    host: req.headers.host.replace(/(:80|:443)/, ''),
    ip: req.ip.replace(/::ffff:/, ''),
    userAgent: req.header('user-agent')
  }
  var mobanpath = 'moban/' + wzconfigdb.moban + '/wzlist' + (common.isSubDomain(req.hostname) ? 'wap' : '')
  
  res.render(mobanpath, {
    tohttp,
    waiurlsdb,
    domaindb,
    groupdb: zqgroupdb,
    groupsdb: zqgroupsdb,
    wzconfigdb,
    contentdb,
    newcontents,
    hotcontents,
    randcontents,
    pager,
    pagerhtml
  }, (err, html) => {
    if (err) {
      return res.send(err.toString())
    }
    common.mkdir(htmlfile)
    // fs.mkdirSync(htmldir)
    if (wzconfigdb.iscache) {
      // console.log('缓存html');
      fs.writeFileSync(htmlfile, html)
    }
    return res.send(html);
  });
  // res.render({},);


}

//类目页面的处理
router.get(/^\/([\w\/]*)(index\.html)?$/, lists);
// router.get('/:name/index.html', lists);

module.exports = router;