<template>
    <Card>
        <Table @on-selection-change="selectAll" border stripe :loading="loading" height="600" ref="selection" :columns="columns7" :data="listdata"></Table>
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
          
          
        </Row>
    </Card>
</template>
<script>
import util from "../../libs/util";
export default {
  data() {
    return {
      loading: true,
      selectIds:[],
      listdomain: [],
      columns7: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "URL查找条件",
          width: 300,
          sortable: true,
          key: "url",
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
          title: "是否跳转",
          key: "isJump",
          sortable: true,
          width: 120,
          render: (h, params) => {
            return h(
              "i-switch",
              {
                props: {
                  value: params.row.isJump,
                  size: "large"
                },
                on: {
                  "on-change": val => {
                    this.loading = !this.loading;
                    util.put(
                      "/jump",
                      { _id: params.row._id, isJump: val },
                      res => {
                        this.loading = !this.loading;
                        // console.log(res);
                        if (res.data.code == 0) {
                          params.row.isJump = val;
                          this.$Message.success({ content: res.data.message });
                        } else {
                          this.$Message.error({ content: res.data.message });
                        }
                        this.listdata = this.listdata.map(
                          item =>
                            item._id == params.row._id ? params.row : item
                        );
                      }
                    );
                  }
                }
              },
              [
                h("span", { slot: "open" }, "开启"),
                h("span", { slot: "close" }, "关闭")
              ]
            );
          }
        },
        {
          title: "跳到哪里",
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
          title: "跳转次数",
          width: 120,
          sortable: true,
          key: "jumpNum"
        },
        {
          title: "优先级",
          width: 120,
          sortable: true,
          key: "priority",
          render: (h, params) => {
            params.row.color =
              params.row.priority === 1
                ? "blue"
                : params.row.priority === 2 ? "green" : "red";
            params.row.text =
              params.row.priority === 1
                ? "低"
                : params.row.priority === 2 ? "中" : "高";

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.color
                },
                nativeOn: {
                  click: () => {
                    var priority;
                    if (params.row.priority == 3) {
                      priority = 1;
                    } else {
                      priority = params.row.priority + 1;
                    }
                    // console.log(params.row.priority);
                    // console.log(priority);
                    this.loading = !this.loading;

                    util.put(
                      "/jump",
                      { _id: params.row._id, priority: priority },
                      res => {
                        if (res.data.code == 0) {
                          this.loading = !this.loading;
                          this.$Message.success({ content: res.data.message });
                          params.row.priority = priority;
                          params.row.color =
                            params.row.priority === 1
                              ? "blue"
                              : params.row.priority === 2 ? "green" : "red";
                          params.row.text =
                            params.row.priority === 1
                              ? "低"
                              : params.row.priority === 2 ? "中" : "高";
                        } else {
                          this.$Message.error({ content: res.data.message });
                        }
                      }
                    );
                  }
                }
              },
              params.row.text
            );
          }
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
                        name: "jump_edit",
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
    delAll() {
      this.$Loading.start();
      util.delete("/jump", { del: "all" }, res => {
        if (res.data.code == 0) {
          this.$Loading.finish();
          this.$Message.success("成功清空了" + res.data.data.n + "条数据!");
          this.getdata()
        } else {
          this.$Loading.error();
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
      // this.loading = true;
      this.$Loading.start();
      util.delete("/jump", { _id: this.selectIds }, res => {
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
    selectAll(val) {
      // console.log(val);
      this.selectIds = [];
      val.forEach(item => {
        this.selectIds.push(item._id);
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
    getdata() {
      util.get("/jump", {}, res => {
        // console.log(res);
        this.listdata = res.data.data;
        this.loading = false;
        let arrtmp = [],
          arrlisttmp = [];
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
        this.columns7.forEach(item => {
          item.key;
          if (item.key == "domain") {
            item.filters = arrtmp;
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
