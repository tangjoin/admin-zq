
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
                
                <FormItem>
                    <Poptip
                        confirm
                        title="确定要修改吗?"
                        @on-ok="saveEditPass('editPasswordForm')"
                        >
                        <Button type="primary">修改</Button>
                    </Poptip>
                    
                </FormItem>
            </Form>
            
            
        </Card>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      editPasswordForm: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },

      passwordValidate: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "请至少输入6个字符", trigger: "blur" },
          { max: 32, message: "最多输入32个字符", trigger: "blur" }
        ],
        rePass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: valideRePassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    saveEditPass(name) {
        console.log('saveEditPass');
        
      this.$refs[name].validate(valid => {
        if (valid) {
            util.put("/admin", this.editPasswordForm, res => {
            //   this.loading = false;
              if (res.data.code == 0) {
                this.$Message.success({ content: res.data.message });
              } else {
                this.$Message.error({ content: res.data.message });
                // this.getdata();
              }
            });
        }
      });
    }
  },
  mounted() {
    // this.init();
  }
};
</script>
