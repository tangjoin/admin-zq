<template>
    <Card>
    <Form inline ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="域名" prop="domain" >
            <i-input v-model="formValidate.domain" disabled placeholder=""></i-input>
        </FormItem>
        <FormItem label="首页缓存时间" prop="indexcachetime">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.indexcachetime"></InputNumber>
        </FormItem>
        <FormItem label="首页类目文章数量" prop="indexnum">
          <InputNumber :max="9999999" :min="1" v-model="formValidate.indexnum"></InputNumber>
        </FormItem>
        <FormItem label="首页最新内容数量" prop="indexnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.indexnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="首页最火内容数量" prop="indexhotnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.indexhotnum"></InputNumber>
        </FormItem>
        <FormItem label="首页推荐内容数量" prop="indexrandnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.indexrandnum"></InputNumber>
        </FormItem>
        <FormItem label="类目页面缓存时间" prop="listcachetime">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.listcachetime"></InputNumber>
        </FormItem>
        <FormItem label="类目页面文章数量" prop="listnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.listnum"></InputNumber>
        </FormItem>
        <FormItem label="类目最新内容数量" prop="listnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.listnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="类目最火内容数量" prop="listhotnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.listhotnum"></InputNumber>
        </FormItem>
        <FormItem label="类目推荐内容数量" prop="listrandnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.listrandnum"></InputNumber>
        </FormItem>
        <FormItem label="内容页面缓存时间" prop="cjcachetime">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.cjcachetime"></InputNumber>
        </FormItem>
        <FormItem label="最新内容数量" prop="cjnewsnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.cjnewsnum"></InputNumber>
        </FormItem>
        <FormItem label="最火内容数量" prop="cjhotnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.cjhotnum"></InputNumber>
        </FormItem>
        <FormItem label="推荐内容数量" prop="cjrandnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.cjrandnum"></InputNumber>
        </FormItem>
        <FormItem label="网站地图数量" prop="sitemapnum">
            <InputNumber :max="9999999" :min="1" v-model="formValidate.sitemapnum"></InputNumber>
        </FormItem>
        <FormItem label="是否开启缓存" prop="iscache">
          <i-switch size="large" v-model="formValidate.iscache">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="生成内容页面的文件规则" prop="cjname">
          <i-input v-model="formValidate.cjname" placeholder=""></i-input>
        </FormItem>
        <FormItem label="模板文件目录" prop="moban">
          <Select v-model="formValidate.moban" style="width:200px">
            <Option v-for="item in mobanarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="图片目录模板" prop="imgmoban">
          <i-input v-model="formValidate.imgmoban" placeholder=""></i-input>
          
        </FormItem>
        <FormItem label="手机域名前缀" prop="subDomain">
          <i-input v-model="formValidate.subDomain" placeholder=""></i-input>
           
        </FormItem>
        <FormItem label="robots.txt的内容" prop="robotstxt">
          <i-input type="textarea" v-model="formValidate.robotstxt" placeholder="空为默认生成"></i-input>
           
        </FormItem>
        <FormItem label="地图xml文件名" prop="mapXmlName">
          <i-input v-model="formValidate.mapXmlName" placeholder="空为默认sitemap.xml"></i-input>
           
        </FormItem>
        <FormItem label="地图txt文件名" prop="mapTxtName">
          <i-input v-model="formValidate.mapTxtName" placeholder="空为默认sitemap.txt"></i-input>
           
        </FormItem>
        <FormItem label="模板说明" prop="">
          <span style="color: #ed3f14;">年 2018 月 08 日 08 !随机数字 @随机字母 #随机数字文字混合</span>
          <span style="color: #2d8cf0;">如:年-月-日/###### </span>
          <span style="color: #19be6b;">会替换为2018-02-02/jn5s82 不需要加.html .jpg等后缀</span>
           
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
            <Poptip
                confirm
                title="确定要删除吗?"
                @on-ok="ok"
                @on-cancel="cancel">
                <Button type="error" style="margin-left: 18px">删除</Button>
            </Poptip>
            
        </FormItem>
    </Form>
    <Spin size="large" fix v-if="loading"></Spin>
    
    </Card>
    
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      modal1: false,
      loading: true,
      mobanarr:[],
      formValidate: {},
      ruleValidate: {
        domain: [{ required: true, message: "域名不能为空", trigger: "blur" }],
        name: [{ required: true, message: "类目不能为空", trigger: "blur" }],
        nametxt: [
          { required: true, message: "类目名称不能为空", trigger: "blur" }
        ],
        asname: [
          { required: true, message: "别名类目不能为空", trigger: "blur" }
        ],
        asnametxt: [
          { required: true, message: "别名类目名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ok() {
      // this.$Message.info("Clicked ok");
      this.loading = true;
      this.modal1 = false;
      util.delete("/wzconfig", { _id: this.formValidate._id }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          // this.$rout;
          this.$Message.success({ content: res.data.message });
          this.$router.push({
            name: "wzconfig_index"
          });
        } else {
          this.$Message.error({ content: res.data.message });
        }
      });
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
      this.modal1 = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          util.put("/wzconfig", this.formValidate, res => {
            this.loading = false;
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
              this.getdata();
            }
          });
        }
      });
    },
    handleDelete(name) {
      // this.$refs[name].resetFields();
      // console.log("delete");
      this.modal1 = true;
    },
    getdata() {
      // console.log(this.$route.params._id);

      util.get("/wzconfig", { _id: this.$route.params._id }, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.formValidate = res.data.data[0];
          this.mobanarr = res.data.mobanarr;
        } else {
          this.$Message.error({ content: res.data.message });
        }
        this.loading = false;
      });
    }
  },
  created() {
    // this.$Message.loading({content:'数据加载中',})
    // console.log(this.$route.params._id);
    this.getdata();
  }
};
</script>
