<template>
    <Card>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="域名" prop="domain" >
            <i-input v-model="formValidate.domain" disabled placeholder=""></i-input>
        </FormItem>
        <FormItem label="类目" prop="name">
            <i-input v-model="formValidate.name" placeholder=""></i-input>
        </FormItem>
        <FormItem label="类目名称" prop="nametxt">
            <i-input v-model="formValidate.nametxt" placeholder=""></i-input>
        </FormItem>
        <FormItem label="类目别名" prop="asname">
            <i-input v-model="formValidate.asname" placeholder=""></i-input>
        </FormItem>
        <FormItem label="类目别名名称" prop="asnametxt">
            <i-input v-model="formValidate.asnametxt" placeholder=""></i-input>
        </FormItem>
        <FormItem label="类目标题" prop="title">
            <i-input v-model="formValidate.title"  placeholder="类目标题"></i-input>
        </FormItem>
        <FormItem label="类目标题关键字" prop="keyword">
            <i-input v-model="formValidate.keyword"  placeholder="类目标题关键字"></i-input>
        </FormItem>
        <FormItem label="类目描述" prop="describe">
            <i-input v-model="formValidate.describe"  placeholder="类目描述"></i-input>
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
            <Button type="error" @click="handleDelete()" style="margin-left: 18px">删除</Button>
        </FormItem>
    </Form>
    <Spin size="large" fix v-if="loading"></Spin>
    <Modal
        v-model="modal1"
        title="信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确定要删除吗</p>
    </Modal>
    </Card>
    
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      modal1: false,
      loading: true,
      formValidate: {},
      ruleValidate: {
        domain: [{ required: true, message: "域名不能为空", trigger: "blur" }],
        name: [{ required: true, message: "类目不能为空", trigger: "blur" }],
        nametxt: [
          { required: true, message: "类目名称不能为空", trigger: "blur" }
        ],
        asname: [{ required: true, message: "别名类目不能为空", trigger: "blur" }],
        asnametxt: [{ required: true, message: "别名类目名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    ok() {
      // this.$Message.info("Clicked ok");
      this.loading = true;
      this.modal1 = false;
      util.delete("/list", { _id: this.formValidate._id }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          // this.$rout;
          this.$Message.success({ content: res.data.message });
          this.$router.push({
            name: "list_index"
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
          util.put("/list", this.formValidate, res => {
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
    handleDelete(name) {
      // this.$refs[name].resetFields();
      // console.log("delete");
      this.modal1 = true;
    },
    getdata() {
      // console.log(this.$route.params._id);

      util.get("/list", { _id: this.$route.params._id }, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.formValidate = res.data.data[0];
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
