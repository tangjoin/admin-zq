<template>
    <Card>
        <Table border stripe :loading="loading" height="600" ref="selection" :columns="columns7" :data="domaindata"></Table>
        <!-- <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button> -->
    </Card>
</template>
<script>
import util from "../../libs/util";
import domainedit from "./edit.vue";
// import moment from "moment";
// import mode from ''
// var sdf = require('mingsdfs')
export default {
  components: { domainedit },
  data() {
    return {
      loading: true,
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "域名",
          width: 160,
          key: "domain"
        },
        {
          title: "标题",
          key: "title",
          ellipsis: true
        },
        {
          title: "创建日期",
          sortable: true,
          width: 160,
          key: "date"
        },
        {
          title: "文章数量",
          sortable: true,
          width: 100,
          key: "contentNum"
        },
        {
          title: "蜘蛛数量",
          sortable: true,
          width: 100,
          key: "spiderNum"
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
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
                    // click: () => {
                    //   this.edit(params.index);
                    // },
                    click: () => {
                      // console.log(params.row._id);

                      //   let argu = { _id: params.index._id };
                      this.$router.push({
                        name: "domain_edit",
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
      domaindata: []
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "站点信息",
        content: `域名：${this.domaindata[index].domain}<br>
                    标题：${this.domaindata[index].title}<br>
                    关键字：${this.domaindata[index].keyword}<br>
                    描述：${this.domaindata[index].describe}<br>
                    文章数量：${this.domaindata[index].contentNum}<br>
                    蜘蛛数量：${this.domaindata[index].spiderNum}<br>
                    创建日期：${this.domaindata[index].date}`
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
      this.domaindata.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    getdata() {
      util.get("/domain", {}, res => {
        // console.log(res);
        this.domaindata = res.data.data;
        this.loading = false;
      });
    }
  },
  created() {
    this.getdata();
  },
  filters: {
    dateformat: function(value) {
      if (!value) return "";
      // value = value.toString();
      return moment(value).format('YYYY-MM-DD');
    }
  }
};
</script>
