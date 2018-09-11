<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="url">
                            <i-input v-model="form.url" placeholder="请输入网址,不加http://,默认为当前域名">
                                <span slot="prepend">
                                    <Icon :size="16" type="ionic"></Icon>
                                </span>
                            </i-input>
                        </FormItem>
                        <FormItem prop="userName">
                            <i-input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </i-input>
                        </FormItem>
                        <FormItem prop="password">
                            <i-input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </i-input>
                            
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import util from "../libs/util";


export default {
  data() {
    return {
      form: {
        url: "",
        userName: "",
        password: ""
      },
      rules: {
        
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.url) {
        Cookies.set('baseurl', 'http://' + this.form.url + '/adminzqcms')
      }else{
        Cookies.set('baseurl', 'http://' + document.domain + '/adminzqcms')
      }
      
      // console.log();
      
      util.ajax.defaults.baseURL = Cookies.get('baseurl')
      // console.log(util,util.ajax.defaults.baseURL);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.$store.commit(
          //   "setAvator",
          //   "../images/googlelogo_color_272x92dp.png"
          // );
          
          
          
          this.$Message.loading({ content: "加载中", duration: 0 });
          util.getlogin("/login", this.form, res => {
            this.$Message.destroy();
            // console.log(res);
            if (res.data.code == -1) {
              this.$Message.error({
                content: res.data.message,
                closable: true
              });
            } else {
              this.$Message.success({ content: res.data.message });
              // alert(res.data.message)
              Cookies.set('user', this.form.userName);
              Cookies.set('password', 'password');
              Cookies.set('access', 0);
              this.$router.push({
                name: "home_index"
              });
            }
          });

          // Cookies.set('user', this.form.userName);
          // Cookies.set('password', this.form.password);
          // this.$store.commit('setAvator', '/src/images/googlelogo_color_272x92dp.png');
          // if (this.form.userName === 'iview_admin') {
          //     Cookies.set('access', 0);
          // } else {
          //     Cookies.set('access', 1);
          // }
          // this.$router.push({
          //     name: 'home_index'
          // });
        }
      });
    }
  }
};
</script>

<style>

</style>
