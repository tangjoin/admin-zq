<template>
    <Card>

    <Form ref="loginForm" :model="form" :label-width="150" inline :rules="rules">
        <FormItem label="网站主域名" prop="domainId">
            <Select v-model="form.domainId" style="width:200px">
                <Option v-for="item in domainlist" :value="item._id" :key="item._id">{{ item.domain }}</Option>
            </Select>
            <!-- <i-input v-model="form.domain" placeholder="不带www的主域名"></i-input> -->
        </FormItem>
        <FormItem label="首页缓存时间" prop="indexcachetime">
            <InputNumber :max="9999999" :min="1" v-model="form.indexcachetime"></InputNumber>
        </FormItem>
        <FormItem label="首页类目文章数量" prop="indexnum">
          <InputNumber :max="9999999" :min="1" v-model="form.indexnum"></InputNumber>
        </FormItem>
        <FormItem label="首页最新内容数量" prop="indexnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="form.indexnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="首页最火内容数量" prop="indexhotnum">
            <InputNumber :max="9999999" :min="1" v-model="form.indexhotnum"></InputNumber>
        </FormItem>
        <FormItem label="首页推荐内容数量" prop="indexrandnum">
            <InputNumber :max="9999999" :min="1" v-model="form.indexrandnum"></InputNumber>
        </FormItem>
        <FormItem label="类目页面缓存时间" prop="listcachetime">
            <InputNumber :max="9999999" :min="1" v-model="form.listcachetime"></InputNumber>
        </FormItem>
        <FormItem label="类目页面文章数量" prop="listnum">
            <InputNumber :max="9999999" :min="1" v-model="form.listnum"></InputNumber>
        </FormItem>
        <FormItem label="类目最新内容数量" prop="listnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="form.listnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="类目最火内容数量" prop="listhotnum">
            <InputNumber :max="9999999" :min="1" v-model="form.listhotnum"></InputNumber>
        </FormItem>
        <FormItem label="类目推荐内容数量" prop="listrandnum">
            <InputNumber :max="9999999" :min="1" v-model="form.listrandnum"></InputNumber>
        </FormItem>
        <FormItem label="内容页面缓存时间" prop="cjcachetime">
            <InputNumber :max="9999999" :min="1" v-model="form.cjcachetime"></InputNumber>
        </FormItem>
        <FormItem label="最新内容数量" prop="cjnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="form.cjnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="最火内容数量" prop="cjhotnum">
            <InputNumber :max="9999999" :min="1" v-model="form.cjhotnum"></InputNumber>
        </FormItem>
        <FormItem label="推荐内容数量" prop="cjrandnum">
            <InputNumber :max="9999999" :min="1" v-model="form.cjrandnum"></InputNumber>
        </FormItem>
        <FormItem label="网站地图数量" prop="sitemapnum">
            <InputNumber :max="9999999" :min="1" v-model="form.sitemapnum"></InputNumber>
        </FormItem>
        <FormItem label="是否开启缓存" prop="iscache">
          <i-switch size="large" v-model="form.iscache">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="生成内容页面的文件规则" prop="cjname">
          <i-input v-model="form.cjname" placeholder=""></i-input>
        </FormItem>
        <FormItem label="模板文件目录" prop="moban">
          <Select v-model="form.moban" placeholder="未选择,则会随机模板" style="width:200px">
            <Option v-for="item in mobanarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="图片目录模板" prop="imgmoban">
          <i-input v-model="form.imgmoban" placeholder=""></i-input>
          
        </FormItem>
        <FormItem label="手机域名前缀" prop="subDomain">
          <i-input v-model="form.subDomain" placeholder=""></i-input>
           
        </FormItem>
        <FormItem label="robots.txt的内容" prop="robotstxt">
          <i-input type="textarea" v-model="form.robotstxt" placeholder="空为默认生成"></i-input>
           
        </FormItem>
        <FormItem label="手机域名前缀" prop="mapXmlName">
          <i-input v-model="form.mapXmlName" placeholder="空为默认sitemap.xml"></i-input>
           
        </FormItem>
        <FormItem label="手机域名前缀" prop="mapTxtName">
          <i-input v-model="form.mapTxtName" placeholder="空为默认sitemap.txt"></i-input>
           
        </FormItem>
        <FormItem label="模板说明" prop="">
          <span style="color: #ed3f14;">年 2018 月 08 日 08 !随机数字 @随机字母 #随机数字文字混合</span>
          <span style="color: #2d8cf0;">如:年-月-日/###### </span>
          <span style="color: #19be6b;">会替换为2018-02-02/jn5s82 不需要加.html .jpg等后缀</span>
           
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" type="primary">添加</Button>
            <!-- <Button @click="handleSubmit" type="primary" long>登录</Button> -->
        </FormItem>
    </Form>
    </Card>
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      domainlist: [],
      mobanarr:[],
      form: {
        indexcachetime:600,
        indexnum:5,
        indexnewsnum:5,
        indexhotnum:5,
        indexrandnum:10,
        listcachetime:600,
        listnum:25,
        listnewsnum:5,
        listhotnum:5,
        listrandnum:10,
        cjcachetime:2592000,
        cjnewsnum:5,
        cjhotnum:5,
        cjrandnum:10,
        sitemapnum:888,
        iscache:true,
        cjname:'/年/月/日/########',
        moban:'',
        imgmoban:'/img/年/月日/########',
        subDomain:'m'

        //     domain: "",
        //     title: "",
        //     keyword: "",
        //     describe: ""
      },
      rules: {
        domainId: [{ required: true, message: "域名不能为空", trigger: "blur" }],
        name: [{ required: true, message: "类目不能为空", trigger: "blur" }],
        nametxt: [{ required: true, message: "类目名称不能为空", trigger: "blur" }],
        asname: [{ required: true, message: "别名类目不能为空", trigger: "blur" }],
        asnametxt: [{ required: true, message: "别名类目名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Message.loading({ content: "加载中", duration: 0 });
          util.post("/wzconfig", this.form, res => {
            this.$Message.destroy();
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
            }
          });
        }
      });
    },
    getdata() {
      util.get("/domain", {}, res => {
        // console.log(res);
        if (res.data.code == 0) {
            this.domainlist = res.data.data
            this.mobanarr = res.data.mobanarr
        }
        
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
