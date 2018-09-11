<template>
    <Card>
    <Form ref="loginForm" :model="form" :label-width="100"  :rules="rules">
       
        <FormItem label="蜘蛛名" prop="spiderAsName">
            <i-input v-model="form.spiderAsName" placeholder="蜘蛛名 如:百度"></i-input>
        </FormItem>
        
        <FormItem label="蜘蛛特征" prop="spiderKey">
            <i-input v-model="form.spiderKey" placeholder="蜘蛛特征 如:baiduspider"></i-input>
        </FormItem>
        <FormItem label="IP组" prop="spiderIp">
            <i-input v-model="form.spiderIp"  placeholder="IP组 如:129.231,231.100使用,分开"></i-input>
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
        spiderAsName: [{ required: true, message: "蜘蛛名不能为空", trigger: "blur" }],
        spiderKey: [{ required: true, message: "特征不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          util.put("/spidergroup", this.form, res => {
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

      util.get("/spidergroup", { _id: this.$route.params._id }, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.form = res.data.data[0];
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
