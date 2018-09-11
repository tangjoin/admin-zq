<template>
    <Card>
      <Row>
        <Col span="12">
            <DatePicker v-model="dateVal" type="date" placeholder="选择日志日期" style="width: 200px"></DatePicker>
            <Button type="ghost" @click="logClick" shape="circle" icon="ios-search">搜索日志</Button>
        </Col>
      </Row>
      
        <pre style="margin-top: 10px;">
{{logdata}}

        </pre>
        <Page style="margin-top: 10px;"
          :total="page.total"
          placement="top" :page-size="page.pageSize" :page-size-opts="pageNumSize" @on-page-size-change="pageNum" @on-change="pushPage" show-sizer show-total show-elevator></Page>
    </Card>
</template>

<script>
import util from "../../libs/util";
// var codePrettify = require('code-prettify');
// codePrettify()
// import domainedit from "./edit.vue";
export default {
  // components: { domainedit },
  data() {
    return {
      pageNumSize: [30, 40, 80, 160, 320],
      // loading: true,
      logdata: "",
      dateVal: "",
      page: {
        current: 1,
        pageSize: 30,
        total: 0
      }
    };
  },
  methods: {
    logClick() {
      // console.log(this.dateVal);
      this.getpagedata()
    },
    pushPage(val) {
      // console.log(val);
      this.page.current = val;
      this.getpagedata();
    },
    pageNum(val) {
      // console.log(val);
      this.page.pageSize = val;
      this.getpagedata();
    },
    getpagedata() {
      this.$Loading.start();
      util.get(
        "/syslog",
        {
          current: this.page.current,
          pagesize: this.page.pageSize,
          dateVal: this.dateVal
        },
        res => {
          this.$Loading.finish();
          if (res.data.code == 0) {
            this.logdata = res.data.data;
            this.page.total = res.data.total;
            // this.$Message.success(res.data.message);
            // this.$Message.success(config)
          } else {
            this.$Message.error(res.data.message);
            this.logdata = '没有日志文件';
            this.page.total = 0;
          }
        }
      );
    },
    getdata(where = {}) {
      // console.log(where);
      this.$Loading.start();
      util.get("/syslog", {}, res => {
        this.$Loading.finish();
        if (res.data.code == 0) {
          this.logdata = res.data.data;
          this.page.total = res.data.total;
          // this.$Message.success(res.data.message);
          // this.$Message.success(config)
        } else {
          this.$Message.error(res.data.message);
          this.logdata = '没有日志文件';
          this.page.total = 0;
        }
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>
<style>
.asdf {
  margin-bottom: 10px;
}
pre {
  font-size: 11px;
  padding: 0;
  margin: 0;
  background: #f0f0f0;
  border: 1px #ccc solid;
  border-radius: 5px;
  line-height: 20px; /* 行距 */
  height: 600px;
  overflow: auto; /* 超出宽度出现滑动条 */
  /* overflow-Y:hidden; 作用是隐藏IE的右侧滑动条 */
}
</style>

