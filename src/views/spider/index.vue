<template>
    <Card>
        <Row style="margin-bottom: 10px">
          <Input v-model="form.searchTxt" placeholder="请输入搜索内容" style="width: 150px" />
          <Select v-model="form.category" style="width:100px">
            <Option value="">全部</Option>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="form.spidergroupId" style="width:100px">
            <Option value="">全部</Option>
            <Option v-for="item in spiderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker v-model="form.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" style="width: 150px"></DatePicker>
          <DatePicker v-model="form.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" style="width: 150px"></DatePicker>
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
          <Poptip
              style="margin-left:30px;"
              confirm
              title="确定要删除选中项吗?"
              placement="bottom-end"
              @on-ok="delSelect"
              >
              <Button>删除选中</Button>
          </Poptip>
          <Poptip
              style="margin-left:10px;"
              confirm
              title="确定要清空此数据吗!"
              placement="bottom-end"
              @on-ok="delAll"
              >
              <Button type="error">清空数据</Button>
          </Poptip>
        </Row>
        <Table :height="tableHeight" @on-selection-change="selectAll" border stripe  :loading="loading"  ref="selection" :columns="columns7" :data="listdata"></Table>
        <Page
          placement="top"
          :page-size-opts="pageNumSize"
          style="margin-top: 10px;" :page-size="page.pageSize" :current="page.current"  @on-change="pushPage" @on-page-size-change="pageNum" :total="page.total" show-elevator show-elevator show-sizer show-total></Page>
        <a href="http://"></a>
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
        spidergroupId:'',
        searchTxt: "",
        category: "",
        startTime: "",
        endTime: ""
      },
      cityList: [
        { label: "域名", value: "domain" },
        { label: "URL", value: "url" },
        { label: "USERAGENT", value: "useragent" },
        { label: "IP", value: "spiderIp" },
        { label: "别名类目", value: "categoryAsName" }
      ],
      spiderList: [
        
      ],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: true,
      listdomain: [],
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
          title: "域名",
          width: 160,
          key: "domain",
          // fixed: 'left',
          sortable: true,
          filterMultiple: false,
          filters: [],
          filterRemote(value, row) {
            // console.log(this);
            // console.log(value);
            this.$parent.form.searchTxt = value[0];
            this.$parent.form.category = "domain";
            this.$parent.getPageData();

            // return row.domain.indexOf(value) > -1;
          }
        },
        {
          title: "url",
          key: "url",
          sortable: true,
          width: 180,
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
          title: "分类",
          width: 100,
          sortable: true,
          key: "category",
          render: (h, params) => {
            return h(
              "div",
              params.row.category
                ? params.row.category + " as " + params.row.categoryAsName
                : ""
            );
          }
        },
        {
          title: "日期",
          width: 100,
          sortable: true,
          key: "date"
        },
        {
          title: "ip信息",
          width: 200,
          sortable: true,
          key: "spiderIp",
          render(h, params) {
            return h(
              "div",
              params.row.spiderIp
                ? params.row.spiderIp + " - " + params.row.spiderInfo
                : ""
            );
          }
        },
        {
          title: "标题",
          width: 200,
          sortable: true,
          key: "webTitle"
        },
        {
          title: "useragent",
          width: 400,
          sortable: true,
          key: "useragent"
        }
      ],
      listdata: []
    };
  },
  methods: {
    delAll() {
      // this.$Message.info("删除完成");
      this.loading = true;
      util.delete("/spider", { del: 'all' }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          this.$Message.success('成功清空了'+res.data.data.n+'条数据!')
          this.getPageData()
        }else{
          this.$Message.error(res.data.message)
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
      util.delete("/spider", { _id: this.selectIds }, res => {
        this.loading = false;
        if (res.data.code == 0) {
          this.$Message.success('成功删除了'+res.data.data.n+'条数据!')
          this.getPageData()
        }else{
          this.$Message.error('删除失败!')
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
      val > 10 ? (this.tableHeight = 600) : (this.tableHeight = 0);

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
      // console.log(where);

      util.get("/spider", where, res => {
        this.loading = false;
        // console.log(res);
        this.page.total = res.data.total;
        this.listdata = res.data.data;

        // console.log(res.data.domainList);
        this.spiderList = []
        res.data.spiderList.map(item=>{
          this.spiderList.push({label:item.spiderAsName,value:item._id})
        })
        let filtersarr = [];
        res.data.domainList.forEach(item => {
          // console.log(item);
          filtersarr.push({ label: item.domain, value: item.domain });
        });
        this.columns7.forEach(item => {
          if (item.key == "domain") {
            item.filters = filtersarr;
            // console.log(item.filters);
          }
        });
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
</style>

