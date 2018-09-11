<template>
    <Card>
        <Table border stripe :loading="loading" height="600" ref="selection" :columns="columns7" :data="listdata"></Table>
        
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
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "域名",
          // width: 160,
          key: "domain",
          sortable: true,
          filters: [],
          filterMethod(value, row) {
            return row.domain.indexOf(value) > -1;
          }
        },
        {
          title: "类目",
          key: "name",
          sortable: true
        },
        {
          title: "类目名称",
          sortable: true,
          width: 120,
          key: "nametxt"
        },
        {
          title: "类目别名",
          sortable: true,
          width: 150,
          key: "asname"
        },
        {
          title: "类目别名名称",
          sortable: true,
          width: 150,
          key: "asnametxt"
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
                        name: "list_edit",
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
    show(index) {
      this.$Modal.info({
        title: "站点信息",
        content: `域名：${this.listdata[index].domain}<br>
                    标题：${this.listdata[index].title}<br>
                    关键字：${this.listdata[index].keyword}<br>
                    描述：${this.listdata[index].describe}<br>
                    文章数量：${this.listdata[index].contentNum}<br>
                    蜘蛛数量：${this.listdata[index].spiderNum}<br>
                    创建日期：${this.listdata[index].date}`
      });
    },
    edit() {
      this.$Modal.confirm({
        render: h => {
          return h("domainedit", {
            props: {
              model: formInline,
              rules: ruleInline
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    remove(index) {
      this.listdata.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    getdata() {
      util.get("/list", {}, res => {
        // console.log(res);
        this.listdata = res.data.data;
        this.loading = false;
        let arrtmp = [] ,arrlisttmp = []
        this.listdata.forEach(item => {
          arrlisttmp.push(item.domain);
          //{label: item.domain,value: item.domain}
        });
        
        arrlisttmp = util.arrunique(arrlisttmp);
        
        arrlisttmp.forEach(item => {
          arrtmp.push({ label: item, value: item });
        });
        // this.listdomain = arrtmp;
        // console.log(this.listdomain);
        this.columns7.forEach(item=>{
          item.key
          if (item.key == 'domain') {
            item.filters =arrtmp
          }
        })
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
