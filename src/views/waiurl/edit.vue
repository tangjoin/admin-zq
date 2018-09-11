<template>
    <Card>
    <Form ref="loginForm" :model="form" :label-width="100"  :rules="rules">
       
        <FormItem label="域名" prop="domainId">
            <Select v-model="form.domainId" style="width:200px">
                <Option v-for="item in domainlist" :value="item._id" :key="item._id">{{ item.domain }}</Option>
            </Select>
        </FormItem>
        
        <FormItem label="url" prop="url">
            <i-input v-model="form.url" placeholder="不带http://"></i-input>
        </FormItem>
        <FormItem label="文字" prop="txt">
            <i-input v-model="form.txt"  placeholder="链接的文字"></i-input>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit('loginForm')" type="primary">修改</Button>
            <!-- <Button @click="handleSubmit" type="primary" long>登录</Button> -->
        </FormItem>
        <Spin size="large" fix v-if="spinShow"></Spin>
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
      loading:true,
      spinShow:false,
      listArr: [],
      domainlist: [],
      form: {
        spiderAsName: "",
        spiderKey: "",
        spiderIp: ""
      },
      rules: {
        domainId: [
          { required: true, message: "域名不能为空", trigger: "blur" }
        ],
        url: [{ required: true, message: "url不能为空", trigger: "blur" }],
        txt: [{ required: true, message: "链接文字不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          util.put("/waiurl", this.form, res => {
            this.loading = false;
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
              this.getdata()
            }
          });
        }
      });
    },
    getdata() {
      // console.log(this.$route.params._id);

      util.get("/waiurl", { _id: this.$route.params._id }, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.form = res.data.data[0];
          this.domainlist = res.data.domainData;
          // console.log(this.form);
          
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
