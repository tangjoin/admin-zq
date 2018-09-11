<template>
    <Card>
        <Row style="margin-bottom: 10px">
          <Input v-model="form.searchTxt" placeholder="请输入搜索内容" style="width: 150px" />
          <Select v-model="form.category" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="form.domainId" clearable @on-change="selectDomainId" style="width:120px" placeholder="请选择域名">
            <!-- <Option value="">选择全部</Option> -->
            <Option v-for="item in domainList"  :value="item._id" :key="item._id">{{ item.domain }}</Option>
          </Select>
          <Select v-model="form.categoryId" clearable :disabled="selectDisabled" style="width:120px" placeholder="请选择类目">
            <!-- <Option value="">选择全部</Option> -->
            <Option v-for="item in groupList" :value="item._id" :key="item._id">{{ item.asnametxt }}</Option>
          </Select>
          <DatePicker v-model="form.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" style="width: 150px"></DatePicker>
          <DatePicker v-model="form.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" style="width: 150px"></DatePicker>
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
          
        </Row>
        <Table :height="tableHeight" @on-selection-change="selectAll" border stripe  :loading="loading"  ref="selection" :columns="columns7" :data="listdata"></Table>
        <Row type="flex" justify="start" style="margin-top: 10px;">
          <Col span="3">
            <Poptip
              confirm
              title="确定要删除选中项吗?"
              placement="top-start"
              @on-ok="delSelect"
              >
              <Button>删除选中</Button>
            </Poptip>
            
          </Col>
          <Col span="16">
            <Page
            placement="top"
            :page-size-opts="pageNumSize"
            :page-size="page.pageSize" :current="page.current"  @on-change="pushPage" @on-page-size-change="pageNum" :total="page.total" show-elevator show-elevator show-sizer show-total>
            </Page>
            
          </Col>
          <Col span="5">
            <Poptip
                confirm
                title="确定要清空此数据吗!"
                placement="top-start"
                @on-ok="delAll"
                >
                <Button type="error">清空数据</Button>
            </Poptip>
            
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
        searchTxt: "",
        category: "",
        startTime: "",
        endTime: ""
      },
      cityList: [
        // { label: "域名", value: "domainId" },
        { label: "标题", value: "title" },
        { label: "URL", value: "url" }
        // { label: "别名类目", value: "categoryId" }
      ],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: true,
      selectDisabled:false,
      listdomain: [],
      domainList: [],
      groupList: [],
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
            // console.log(row);
            this.$parent.form.domainId = value[0];
            // this.$parent.form.category = "domain";
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
                  href: "http://" + params.row.domain + params.row.url,
                  target: "_blank"
                }
              },
              params.row.url ? params.row.url : ""
            );
          }
        },
        {
          title: "标题",
          width: 200,
          sortable: true,
          key: "title"
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
          title: "系统日期",
          width: 120,
          sortable: true,
          key: "standardTime"
        },
        {
          title: "采集日期",
          width: 120,
          sortable: true,
          key: "time"
        },
        {
          title: "爬行数",
          width: 100,
          sortable: true,
          key: "spiderNum"
        },
        {
          title: "图片",
          width: 200,
          sortable: true,
          key: "imgUrl"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "content_edit",
                        params: { _id: params.row._id }
                      });
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      listdata: []
    };
  },
  methods: {
    selectDomainId(val){
      // console.log(val);
      // val == '' ? return :
      if (!val) {
        this.groupList = []
        return;
      }
      this.selectDisabled = !this.selectDisabled 
      // listdomainid
      util.get('/listdomainid',{domainId:val},res=>{
        this.selectDisabled = !this.selectDisabled 
        if (res.data.code == 0) {
          this.groupList = res.data.data
        }else{
          this.groupList = []
        }
      })
      
    },
    delAll() {
      // this.$Message.info("删除完成");
      this.loading = true;
      util.delete("/content", { del: 'all' }, res => {
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
      util.delete("/content", { _id: this.selectIds }, res => {
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

      util.get("/content", where, res => {
        this.loading = false;
        // console.log(res);
        this.page.total = res.data.total;
        this.listdata = res.data.data;
        this.domainList = res.data.domainList;
        // this.groupList = res.data.groupList;
        res.data.data.forEach(item=>{
          res.data.domainList.filter(list=>{
            if (list._id == item.domainId) {
              return item.domain = list.domain
            }
          })
          res.data.groupList.filter(list=>{
            if (list._id == item.categoryId) {
              //params.row.category + " as " + params.row.categoryAsName
              return item.category = list.nametxt,item.categoryAsName = list.asnametxt
            }
          })
        })

        // console.log(res.data.domainList);
        let filtersarr = [];
        res.data.domainList.forEach(item => {
          // console.log(item);
          filtersarr.push({ label: item.domain, value: item._id });
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

