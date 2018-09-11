<template>
    <Card>
        <Row style="margin-bottom: 10px" :gutter="16">
          <Col span="8">
          <i-input v-model="form.urlwhere" style="">
              <span slot="prepend">跳转条件:</span>
          </i-input>
          </Col>
          <Col span="8">
          <i-input v-model="form.url" style="">
              <span slot="prepend">跳转的URL:</span>
          </i-input>
          </Col>
          <Col span="8">
          <i-input v-model="form.toJump">
              <span slot="prepend">跳转出的URL:</span>
          </i-input>
          </Col>
        </Row>
        <Row style="margin-bottom: 10px" :gutter="16">
           <Col span="4">
          <i-input v-model="form.ip">
              <span slot="prepend">IP:</span>
          </i-input>
          </Col>
          <Col span="4">
          <i-input v-model="form.Country">
              <span slot="prepend">IP地区:</span>
          </i-input>
          </Col>
          <Col span="16">
          <DatePicker v-model="form.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" style="width: 150px"></DatePicker>
          <DatePicker v-model="form.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" style="width: 150px"></DatePicker>
          
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
          </Col>
          
        </Row>
        <Table :height="tableHeight" @on-selection-change="selectAll" border stripe  :loading="loading"  ref="selection" :columns="columns7" :data="listdata"></Table>
        <Row type="flex" justify="start" style="margin-top: 10px;">
          <Col span="6">
            <Poptip
              confirm
              title="确定要删除选中项吗?"
              placement="top-start"
              @on-ok="delSelect"
              >
              <Button>删除选中</Button>
            </Poptip>
            <Poptip
                style="margin-left:60px;"
                confirm
                title="确定要清空此数据吗!"
                placement="top-start"
                @on-ok="delAll"
                >
                <Button type="error">清空数据</Button>
            </Poptip>
          </Col>
          <Col span="18">
            <Page
            placement="top"
            :page-size-opts="pageNumSize"
            :page-size="page.pageSize" :current="page.current"  @on-change="pushPage" @on-page-size-change="pageNum" :total="page.total" show-elevator show-elevator show-sizer show-total>
            </Page>
          </Col>
          
        </Row>
        
    </Card>
</template>
<script>
import util from "../../libs/util";
// import domainedit from "./edit.vue";
export default {
  // components: { domainedit },
  data() {
    return {
      pageNumSize: [10, 20, 40, 80, 160, 320],
      tableHeight: 0,
      selectIds: [],
      form: {
        urlwhere: "",
        url: "",
        toJump: "",
        ip: "",
        Country:'',
        startTime: "",
        endTime: ""
      },
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: true,
      columns7: [
        {
          type: "index",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "跳转条件",
          width: 260,
          key: "urlwhere",
          sortable: true,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.urlwhere,
                  target: "_blank"
                }
              },
              params.row.urlwhere ? params.row.urlwhere : ""
            );
          }
        },
        {
          title: "跳转的页面",
          key: "url",
          sortable: true,
          width: 260,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.url,
                  target: "_blank"
                }
              },
              params.row.url ? params.row.url : ""
            );
          }
        },
        {
          title: "跳转出的RUL",
          width: 200,
          sortable: true,
          key: "toJump",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.toJump,
                  target: "_blank"
                }
              },
              params.row.toJump ? params.row.toJump : ""
            );
          }
        },
        {
          title: "IP",
          width: 100,
          sortable: true,
          key: "ip"
        },
        {
          title: "ip地区",
          sortable: true,
          render: (h, params) => {
            return h(
              "span",
              params.row.ipInfo.Country ? params.row.ipInfo.Country  : ""
            );
          }
        },
        {
          title: "日期",
          width: 100,
          sortable: true,
          key: "date"
        }
        
      ],
      listdata: []
    };
  },
  methods: {
    delAll() {
      // this.$Message.info("删除完成");
      this.loading = true;
      util.delete("/jumplog", { del: "all" }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          this.$Message.success("成功清空了" + res.data.data.n + "条数据!");
          this.getPageData();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    delSelect() {
      // console.log(this.selectIds);
      if (this.selectIds.length == 0) {
        // this.$Message.error('This is an error tip');
        this.$Message.error("先选中,再删除");
        return;
      }
      this.loading = true;
      util.delete("/jumplog", { _id: this.selectIds }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          this.$Message.success("成功删除了" + res.data.data.n + "条数据!");
          this.getPageData();
        } else {
          this.$Message.error("删除失败!");
        }
      });
    },
    selectAll(val) {
      // console.log(val);
      this.selectIds = [];
      val.forEach(item => {
        this.selectIds.push(item._id);
      });
    },
    handleSearch() {
      this.page.current = 1;
      this.getPageData();
    },
    pushPage(val) {
      this.page.current = val;
      this.getPageData();
    },
    pageNum(val) {
      val > 10 ? (this.tableHeight = 570) : (this.tableHeight = 0);

      this.page.pageSize = val;
      this.getPageData();
    },
    getPageData() {
      var places = JSON.parse(
        (JSON.stringify(this.page) + JSON.stringify(this.form)).replace(
          /}{/,
          ","
        )
      );
      this.loading = true;
      this.getdata(places);
    },
    getdata(where = {}) {
      util.get("/jumplog", where, res => {
        this.loading = false;
        this.page.total = res.data.total;
        this.listdata = res.data.data;
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style>
.asdf {
  margin-bottom: 10px;
}
</style>

