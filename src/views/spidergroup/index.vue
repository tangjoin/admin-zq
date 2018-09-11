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
          title: "蜘蛛名",
          width: 120,
          key: "spiderAsName",
          sortable: true
        },
        {
          title: "蜘蛛特征",
          key: "spiderKey",
          width: 120,
          sortable: true
        },
        {
          title: "IP组",
          sortable: true,
          // width: 120,
          // ellipsis:true,
          key: "spiderIp"
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
                        name: "spidergroup_edit",
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
    delSelect() {
      if (this.selectIds == 0) {
        // this.$Message.error('This is an error tip');
        this.$Message.error("先选中,再删除");
        return;
      }
      this.$Loading.start();
      util.delete("/spidergroup", { _id: this.selectIds }, res => {
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
      util.get("/spidergroup", {}, res => {
        // console.log(res);
        this.listdata = res.data.data;
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

