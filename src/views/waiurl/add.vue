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
      spinShow: false,
      listArr: [],
      domainlist: [],
      form: {
        domainId: "",
        url: "",
        txt: ""
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
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Message.loading({ content: "加载中", duration: 0 });
          util.post("/waiurl", this.form, res => {
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
      util.get("/waiurl", {}, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.domainlist = res.data.domainData;
          // console.log(this.domainlist);
          
        }
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
