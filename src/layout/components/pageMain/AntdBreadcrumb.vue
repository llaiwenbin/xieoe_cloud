<template>
  <div class="breadcrumb is-shadow">
    <a-breadcrumb class="breadcrumb_top">
      <a-breadcrumb-item>
        <router-link to="/">
          <a-icon type="home"></a-icon>
          首页
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item :key="item.title"
                         v-for="item in pathArr">
        {{ item }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="breadcrumb_bottom">
      {{ this.title }}
    </div>
  </div>
</template>
<script>
export default {
  name: "AntdBreadcrumb",
  data () {
    return {
      title: "",
      pathArr: []
    };
  },
  computed: {},
  watch: {
    $route: {
      handler: function (to, from) {
        // step1：首页直接指向根目录
        // step2：判断当前页面是否为首页
        // step3: 如果为首页就判断是否有父路由，如果没有父路由说明只有一级，如果有父路由那么判断其个数为几，如果超过一那么需要添加这俩路由。如果为1那么就不添加进路由中
        // step4：如果不是首页那么就在后面添加
        this.title = to.meta.title;
        let arr = [];
        let routerList = to.matched;
        routerList[0].path === "" && routerList.shift();

        routerList.forEach(res => {
          if (res.path.indexOf("/index") === -1) {
            arr.push(res.meta.title);
          } else {
            arr[arr.length - 1] = res.meta.title;
          }
        });
        this.pathArr = arr;
      },
      immediate: true
    }
  },
  mounted () { }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  height: 80px;
}
</style>
