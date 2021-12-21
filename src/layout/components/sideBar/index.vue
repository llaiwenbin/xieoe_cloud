<template>
  <div class="sidebar"
       :class="{ collapsed: !opened }"
       id="domSideBar">
    <a-menu :selectedKeys="[activeMenu]"
            :defaultOpenKeys="defaultOpenKey"
            mode="inline"
            theme="dark"
            @click="jumpRouter"
            :inlineCollapsed="!opened">
      <template v-for="item in menu">
        <a-menu-item v-if="item.sub.length === 0"
                     :key="item.path"
                     :title="item.title">
          <div class="iconfont"
               :class="item.icon">
            <span class="sidebar_title">{{ opened ? item.title : "" }}</span>
          </div>
        </a-menu-item>
        <sub-menu v-else
                  :opened="opened"
                  :menu-info="item"
                  :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./subMenu";
import { objHasKey } from "@/utils/utils";
export default {
  name: "SideBar",
  data () {
    return {
      defaultOpenKey: []
    };
  },
  props: ["opened", "menu"],
  created () {
    // 不放在mound中，不然刷新后，下拉菜单会延迟展开
    const defaultSub = this.menu.find(
      item =>
        item.sub.length > 0 && this.$route.path.indexOf(`${item.path}/`) >= 0
    );
    defaultSub && this.defaultOpenKey.push(defaultSub.path);
  },
  mounted () { },
  methods: {
    jumpRouter (e) {
      if (objHasKey(e, "key") && this.activeMenu !== e.key) {
        this.$router.push(e.key);
      } else {
        return false;
      }
    }
  },
  components: {
    SubMenu
  },
  computed: {
    activeMenu () {
      return this.$route.path;
    }
  }
};
</script>
