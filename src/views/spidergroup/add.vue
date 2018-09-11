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
    
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Message.loading({ content: "加载中", duration: 0 });
          util.post("/spidergroup", this.form, res => {
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
      util.get("/spidergroup", {}, res => {
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
