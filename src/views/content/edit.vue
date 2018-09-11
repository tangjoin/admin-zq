<template>
    <Card>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="域名" prop="domainId" >
          <Select v-model="formValidate.domainId" @on-change="selectDomainId" style="width:120px">
            <Option v-for="item in domainList"  :value="item._id" :key="item._id">{{ item.domain }}</Option>
          </Select>
        </FormItem>
        
        <FormItem label="类目" prop="categoryId">
          <Select v-model="formValidate.categoryId" :disabled="selectDisabled" style="width:280px" placeholder="请选择类目">
            
            <Option v-for="item in groupList" :value="item._id" :key="item._id">{{ item.asnametxt +' => '+item.asname }}</Option>
          </Select>
          
        </FormItem>
        <FormItem label="URL" prop="url">
            <i-input readonly v-model="formValidate.url"></i-input>
        </FormItem>
        <FormItem label="标题" prop="title">
            <i-input  v-model="formValidate.title"></i-input>
        </FormItem>
        <FormItem label="关键字" prop="keyword">
            <i-input  v-model="formValidate.keyword"></i-input>
        </FormItem>
        <FormItem label="描述" prop="describe">
            <i-input type="textarea" :rows="4" v-model="formValidate.describe"></i-input>
        </FormItem>
        <FormItem label="作者" prop="author">
            <i-input  v-model="formValidate.author" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="来源" prop="source">
            <i-input  v-model="formValidate.source" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="采集时间" prop="time">
            <i-input  v-model="formValidate.time" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="系统时间" prop="standardTime">
            <i-input readonly v-model="formValidate.standardTime"></i-input>
        </FormItem>
        <FormItem label="图片地址" prop="imgUrl">
            <i-input readonly v-model="formValidate.imgUrl"></i-input>
        </FormItem>
        <FormItem label="爬行数量" prop="spiderNum">
          <InputNumber :max="9999999" :min="0" v-model="formValidate.spiderNum"></InputNumber>
        </FormItem>
        <FormItem label="内容" prop="content">
            <textarea id="articleEditor"></textarea>
        </FormItem>
        
        
        <FormItem>
          <Poptip
                confirm
                title="确定要修改吗?"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel">
                <Button type="primary">修改</Button>
            </Poptip>
            <!-- <Button type="primary" @click="handleSubmit('formValidate')">修改</Button> -->
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
import tinymce from "tinymce";
export default {
  data() {
    return {
      modal1: false,
      loading: true,
      mobanarr: [],
      selectDisabled: false,
      domainList: [],
      groupList: [],
      formValidate: {},
      ruleValidate: {
        domainId: [
          { required: true, message: "域名不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "类目不能为空", trigger: "blur" }
        ],
        url: [{ required: true, message: "链接不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    selectDomainId(val) {
      // console.log(val);
      // val == '' ? return :
      if (!val) {
        this.groupList = [];
        return;
      }
      this.selectDisabled = !this.selectDisabled;
      // listdomainid
      util.get("/listdomainid", { domainId: val }, res => {
        this.selectDisabled = !this.selectDisabled;
        if (res.data.code == 0) {
          this.groupList = res.data.data;
        } else {
          this.groupList = [];
        }
      });
    },
    ok() {
      // this.$Message.info("Clicked ok");
      this.loading = true;
      this.modal1 = false;
      util.delete("/content", { _id: this.formValidate._id }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          // this.$rout;
          this.$Message.success({ content: res.data.message });
          this.$router.push({
            name: "content_index"
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
          //  console.log(tinymce.activeEditor.getContent());
          let htmlStr = tinymce.activeEditor.getContent();
          // console.log(htmlStr);
          
          // this.formValidate.content='adf'
          // 'asdf'.replace()
          htmlStr = htmlStr.replace(
            `<!DOCTYPE html>
<html>
<head>
</head>
<body>`,
            ""
          );
          htmlStr = htmlStr.replace(
            `</body>
</html>`,
            ""
          );
          this.formValidate.content = htmlStr
          // console.log(this.formValidate.content);

          util.put("/content", this.formValidate, res => {
            this.loading = false;
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
              // this.getdata();
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

      util.get("/content", { _id: this.$route.params._id }, res => {
        // console.log(res);
        this.loading = false;
        if (res.data.code == 0) {
          this.formValidate = res.data.data[0];
          this.mobanarr = res.data.mobanarr;
          this.domainList = res.data.domainList;
          tinymce.activeEditor.setContent(this.formValidate.content);
          // console.log(this.formValidate.content);
          
          // tinymce.activeEditor.setContent(this.formValidate.content);
        } else {
          this.$Message.error({ content: res.data.message });
        }
      });
    }
  },
  mounted() {
    // this.$Message.loading({content:'数据加载中',})
    // console.log(this.$route.params._id);

    var promiseTinymce = tinymce.init({
      selector: "#articleEditor",
      branding: false,
      elementpath: false,
      height: 350,
      language: "zh_CN.GB2312",
      menubar: "edit insert view format table tools",
      theme: "modern",
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools",
        "searchreplace visualblocks visualchars code fullscreen fullpage",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons paste textcolor colorpicker textpattern imagetools codesample"
      ],
      toolbar1:
        " newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample",
      autosave_interval: "20s",
      image_advtab: true,
      table_default_styles: {
        width: "100%",
        borderCollapse: "collapse"
      }
    });
    //  console.log(promiseTinymce);
    promiseTinymce.then(res => {
      // console.log(res);
      
      this.getdata();
    });
  },
  destroyed() {
    tinymce.get("articleEditor").destroy();
  }
};
</script>
