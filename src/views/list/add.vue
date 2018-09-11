<template>
    <Card>

    <Form ref="loginForm" :model="form" :label-width="100"  :rules="rules">
        <FormItem label="网站主域名" prop="domainId">
            <Select @on-change="selectDomain" v-model="form.domainId" style="width:300px">
                <Option v-for="item in domainlist" :value="item._id" :key="item._id">{{ item.domain }}</Option>
            </Select>
            <!-- <i-input v-model="form.domain" placeholder="不带www的主域名"></i-input> -->
        </FormItem>
        <FormItem v-if="listArr.length > 0" label="当前已有类目" prop="asdfagads">
          <Tag v-for="item in listArr" @click.native="listclick(item)" color="blue">{{item.asname+' '+item.asnametxt}}</Tag>
        </FormItem>
        <FormItem label="类目" prop="name">
            <i-input v-model="form.name" placeholder="类目 如:gn"></i-input>
        </FormItem>
        
        <FormItem label="类目名称" prop="nametxt">
            <i-input v-model="form.nametxt" placeholder="类目名称 如:国内"></i-input>
        </FormItem>
        <FormItem label="别名类目" prop="asname">
            <i-input v-model="form.asname"  placeholder="别名类目 如:guonei"></i-input>
        </FormItem>
        <FormItem label="别名类目名称" prop="asnametxt">
            <i-input v-model="form.asnametxt"  placeholder="别名类目名称 如:国内新闻"></i-input>
        </FormItem>
        <FormItem label="类目标题" prop="title">
            <i-input v-model="form.title"  placeholder="类目标题"></i-input>
        </FormItem>
        <FormItem label="类目标题关键字" prop="keyword">
            <i-input v-model="form.keyword"  placeholder="类目标题关键字"></i-input>
        </FormItem>
        <FormItem label="类目描述" prop="describe">
            <i-input v-model="form.describe"  placeholder="类目描述"></i-input>
        </FormItem>
        
        
        <FormItem>
            <Button @click="handleSubmit" type="primary">添加</Button>
            <!-- <Button @click="handleSubmit" type="primary" long>登录</Button> -->
        </FormItem>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Form>
    </Card>
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      spinShow:false,
      listArr: [],
      domainlist: [],
      form: {
        domainId: "",
        name: "",
        nametxt: "",
        asname: "",
        asnametxt: "",
        title: "",
        keyword: "",
        describe: ""
      },
      rules: {
        domainId: [
          { required: true, message: "域名不能为空", trigger: "blur" }
        ],
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
    listclick(val){
      // console.log(val);
      // let letOb = val


      delete val._id
      this.form = Object.assign({},val)
    },
    selectDomain(val) {
      // console.log(val);
      this.spinShow = !this.spinShow
      util.get("/listdomainid", { domainId: val }, res => {
        this.spinShow = !this.spinShow
        if (res.data.code == 0) {
          this.listArr = res.data.data
        }else{
          this.listArr = []
        }
        

      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Message.loading({ content: "加载中", duration: 0 });
          util.post("/list", this.form, res => {
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
          this.domainlist = res.data.data;
        }
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
