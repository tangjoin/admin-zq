<template>
    <Card>
        <Table @on-selection-change="onSelect" border stripe :loading="loading" height="600" ref="selection" :columns="columns7" :data="listdata"></Table>
        <Poptip
          style="margin-top : 10px;"
          confirm
          title="确定要删除选中项吗?"
          placement="top-start"
          @on-ok="delSelect"
          >
          <Button>删除选中</Button>    
        </Poptip>
    </Card>
</template>
<script>
import util from "../../libs/util";
// import domainedit from "./edit.vue";
export default {
  // components: { domainedit },
  data() {
    return {
      loading: true,
      listdomain: [],
      domainData: [],
      selectIds: [],
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "域名",
          key: "domainId",
          sortable: true,

          render: (h, params) => {
            let domainTxt = "";
            this.domainData.map(item => {
              if (item._id == params.row.domainId) {
                domainTxt = item.domain;
                return;
              }
            });
            return h("span", domainTxt);
          },
          filters: [
            
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.domainId == value
            
          }
        },
        {
          title: "url",
          key: "url",
          sortable: true
        },
        {
          title: "文字",
          key: "txt",
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
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
                        name: "waiurl_edit",
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
    delSelect() {
      if (this.selectIds == 0) {
        // this.$Message.error('This is an error tip');
        this.$Message.error("先选中,再删除");
        return;
      }
      this.$Loading.start();
      util.delete("/waiurl", { _id: this.selectIds }, res => {
        if (res.data.code == 0) {
          this.$Loading.finish();
          this.$Message.success("成功删除了" + res.data.data.n + "条数据!");
          this.getdata();
        } else {
          this.$Loading.error();
          this.$Message.error("删除失败!");
        }
      });
    },
    onSelect(selection) {
      this.selectIds = [];
      selection.map(item => {
        this.selectIds.push(item._id);
      });
      // console.log(this.selectIds);
      // this.selectIds = ids;
      // this.loading = true;
    },
    getdata() {
      util.get("/waiurl", {}, res => {
        // console.log(res);
        this.listdata = res.data.data;
        this.domainData = res.data.domainData;
        this.columns7.forEach(item => {
          if (item.key == "domainId") {
            item.filters = [];
            this.domainData.forEach(arrItem => {
              item.filters.push({ label: arrItem.domain,value:arrItem._id });
            });
          }
        });
        this.loading = false;
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style>
</style>

