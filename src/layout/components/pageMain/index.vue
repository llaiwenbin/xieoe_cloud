<template>
  <div class="pageMain"
       :class="{ collapsed: !opened }">
    <antd-breadcrumb></antd-breadcrumb>
    <transition name="fade-page"
                mode="out-in">
      <keep-alive v-if="!$route.meta.noCache">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <a-drawer title="消息记录"
              placement="right"
              :closable="false"
              @close="onDrawerClose"
              :visible="messageShow">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
import AntdBreadcrumb from "./AntdBreadcrumb.vue";
export default {
  name: "PageMain",
  data () {
    return {
      drawerVisible: false
    };
  },
  components: {
    AntdBreadcrumb
  },
  props: ["opened", "messageShow"],
  mounted () { },
  methods: {
    onDrawerClose () {
      this.$emit("hideMessage");
    }
  }
};
</script>
