<template>
    <Card>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="URL查找条件" prop="url" >
            <i-input v-model="formValidate.url" placeholder="URL查找条件"></i-input>
        </FormItem>
        <FormItem label="是否跳转" prop="isJump">
          <i-switch size="large" v-model="formValidate.isJump">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="跳转到哪" prop="toJump">
            <i-input v-model="formValidate.toJump" placeholder="跳转到哪个URL"></i-input>
        </FormItem>
        <FormItem label="跳转优先级" prop="priority">
          <i-select v-model="formValidate.priority" style="width:180px">
              <i-option v-for="item in priorityList" :value="item.value" :key="item.value">
                  <span :style="item.color">{{item.label}}</span>
                  <span style="float:right;" :style="item.color">{{item.text}}</span>
              </i-option>
          </i-select>
        </FormItem>
        <FormItem>
            <Poptip
                confirm
                title="确定要删除吗?"
                @on-ok="handleSubmit('formValidate')"
                >
                <Button type="primary">修改</Button>
            </Poptip>
            
        </FormItem>
    </Form>
    <Spin size="large" fix v-if="loading"></Spin>
    
    </Card>
    
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      loading: true,
      formValidate: {},
      priorityList: [
        { value: 1, label: "低", color: "color:blue", text: "用于域名跳转" },
        {
          value: 2,
          label: "中",
          color: "color:green",
          text: "用于域名+类目跳转"
        },
        { value: 3, label: "高", color: "color:red", text: "用于内容页面跳转" }
      ],
      ruleValidate: {
        url: [{ required: true, message: "URL条件不能为空", trigger: "blur" }],
        isJump: [
          {
            type: "boolean",
            required: true,
            message: "是否跳转不能为空",
            trigger: "blur"
          }
        ],
        toJump: [
          { required: true, message: "跳转的URL不能为空", trigger: "blur" }
        ],
        priority: [
          {
            type: "number",
            required: true,
            message: "优先级不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      // this.$refs[name].validate(valid => {
      // console.log(this.formValidate);

      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          util.put("/jump", this.formValidate, res => {
            this.loading = false;
            if (res.data.code == 0) {
              this.$Message.success({ content: res.data.message });
            } else {
              this.$Message.error({ content: res.data.message });
              this.getdata();
            }
          });
        }
      });
    },
    getdata() {
      util.get("/jump", { _id: this.$route.params._id }, res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.formValidate = res.data.data[0];
          // this.mobanarr = res.data.mobanarr;
        } else {
          this.$Message.error({ content: res.data.message });
        }
        this.loading = false;
      });
    }
  },
  mounted() {
    // this.priorityList = []
    this.getdata();
  }
};
</script>
