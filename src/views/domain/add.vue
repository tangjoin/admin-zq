<template>
    <Card>

    <Form ref="loginForm" :model="form" :label-width="80"  :rules="rules">
        <FormItem label="网站主域名" prop="domain">
            <i-input v-model="form.domain" placeholder="不带www的主域名"></i-input>
        </FormItem>
        <FormItem label="标题" prop="title">
            <i-input v-model="form.title" placeholder="标题"></i-input>
        </FormItem>
        
        <FormItem label="关键字" prop="keyword">
            <i-input v-model="form.keyword" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="关键字"></i-input>
        </FormItem>
        <FormItem label="描述" prop="describe">
            <i-input v-model="form.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述"></i-input>
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
      form: {
        //     domain: "",
        //     title: "",
        //     keyword: "",
        //     describe: ""
      },
      rules: {
        domain: [{ required: true, message: "域名不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        keyword: [
          { required: true, message: "关键字不能为空", trigger: "blur" }
        ],
        describe: [{ required: true, message: "描述不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
            this.$Message.loading({ content: "加载中", duration: 0 });
            util.post('/domain',this.form,res => {
                this.$Message.destroy()
                if (res.data.code == 0) {
                    this.$Message.success({content:res.data.message})
                }else{
                    this.$Message.error({content:res.data.message})
                }
            })
        }
      })
    }
  }
};
</script>
