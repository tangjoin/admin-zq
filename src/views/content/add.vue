<template>
    <Card>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="域名" prop="domainId" >
          <Select v-model="formValidate.domainId" @on-change="selectDomainId" style="width:120px">
            <Option v-for="item in domainList"  :value="item._id" :key="item._id">{{ item.domain }}</Option>
          </Select>
        </FormItem>
        
        <FormItem label="类目" prop="categoryId">
          <Select v-model="formValidate.categoryId" @on-change="selectCategoryId" :disabled="groupList.length == 0" style="width:280px" placeholder="请选择类目">
            
            <Option v-for="item in groupList" :value="item._id" :key="item._id">{{ item.asnametxt +' => '+item.asname }}</Option>
          </Select>
          
        </FormItem>
        <FormItem label="URL" prop="url">
            
          <Row>
            <Col span="12">
              <i-input  v-model="formValidate.url"></i-input>
            </Col>
            <Col span="11" offset="1">
               <p style="color:#495060">* 替换<span style="color:#ed3f14"> [urlname] </span>为你指定的URL名,你也可以默认不修改,后台会自动生成</p>
            </Col>
          </Row>
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
        <FormItem label="作者" prop="author" >
            <i-input  v-model="formValidate.author" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="来源" prop="source" >
            <i-input  v-model="formValidate.source" style="width:200px"></i-input>
        </FormItem>
        <FormItem label="采集时间" prop="time" >
            <i-input  v-model="formValidate.time" style="width:200px"></i-input>
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
                title="确定要添加吗?"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel">
                <Button type="primary">添加</Button>
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
    selectCategoryId(val) {
      if (!val) {
        this.formValidate.url = "";
        return;
      }
      // console.log(key);
      // this.groupList
      for (let index = 0; index < this.groupList.length; index++) {
        this.groupList[index];
        if (val == this.groupList[index]._id) {
          return (this.formValidate.url =
            "/" + this.groupList[index].asname + "/[urlname].html");
        }
      }

      // this.formValidate.url = '/'+val;
    },
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
    cancel() {
      // this.$Message.info("Clicked cancel");
      // this.modal1 = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.formValidate.content = tinymce.activeEditor.getContent();
          // this.formValidate.content='adf'
          this.formValidate.content = this.formValidate.content.replace(
            `<!DOCTYPE html>
<html>
<head>
</head>
<body>`,
            ""
          );
          this.formValidate.content = this.formValidate.content.replace(
            `</body>
</html>`,
            ""
          );
          // console.log(this.formValidate.content);

          util.post("/content", this.formValidate, res => {
            this.loading = false;
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
              // this.getdata();
            }
          });
        }else{
          this.$Message.error({ content: '信息填写不全' });
        }
      });
    },
    getdata() {
      // console.log(this.$route.params._id);

      util.get("/content", {}, res => {
        // console.log(res);
        this.loading = false;
        if (res.data.code == 0) {
          this.domainList = res.data.domainList;
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

    // console.log(tinymce);
    // console.log(fafaf);
    promiseTinymce.then(res => {
      this.getdata();
    });
  },
  destroyed() {
    tinymce.get("articleEditor").destroy();
  }
};
</script>
