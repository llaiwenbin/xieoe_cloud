<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <div class="iconfont"
           :class="props.menuInfo.icon">
        <span class="sidebar_title">{{ props.opened === false ? "" : props.menuInfo.title }}
        </span>
      </div>
    </span>
    <template v-for="item in props.menuInfo.sub">
      <a-menu-item v-if="item.sub.length === 0"
                   :key="item.path">
        <div class="iconfont"
             :class="item.icon">
          <span class="submenu_title">{{ item.title }}</span>
        </div>
      </a-menu-item>
      <sub-menu v-else
                :key="item.path"
                :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo", "opened"]
};
</script>
