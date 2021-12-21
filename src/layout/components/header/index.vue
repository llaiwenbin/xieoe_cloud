<template>
  <div class="header">
    <div class="header_logo"
         :class="{ closed: !opened }">
      <a href="javascript:;"
         class="header_logo_link"><img src="./logo.png"
             alt="这是良信智能图标！" />{{ opened ? "SH-AIRPORT" : "" }}</a>
    </div>
    <div class="header_navbar">
      <div class="header_navbar_left">
        <div class="header_navbar_left_icon">
          <a-icon class="opened"
                  :class="{ closed: !opened }"
                  @click="toggleSideBar"
                  type="bars" />
        </div>
      </div>
      <ul class="header_navbar_right">
        <li id="domMessage"
            @click="showMessage">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>消息记录</span>
            </template>
            <a-icon class="iconFont"
                    type="bell" />
          </a-tooltip>
        </li>
        <li id="domSetting"
            @click="goToSetting">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>系统管理</span>
            </template>
            <a-icon class="iconFont"
                    type="setting" />
          </a-tooltip>
        </li>
        <li id="domPersonal">
          <a-dropdown v-model="visible"
                      placement="bottomCenter">
            <div class="hnr_avatar">
              <a-avatar class="hnr_avatar_img"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              Allon
            </div>
            <a-menu slot="overlay"
                    overlayClassName="hnr_menu"
                    @click="handleMenuClick">
              <a-menu-item key="home">
                <a-icon type="home" />首页</a-menu-item>
              <a-menu-item key="edit">
                <a-icon type="highlight" />修改名称</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">
                <a-icon type="logout" />登出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MHeader",
  data () {
    return {
      visible: false
    };
  },
  computed: {},
  props: ["opened", "menu", "messageShow"],
  methods: {
    toggleSideBar () {
      this.$emit("toggleSideBar", !this.opened);
    },
    handleMenuClick (e) {
      switch (e.key) {
        case "home":
          this.$route.path !== this.menu[0].path && this.$router.push("/");
          break;
        case "edit":
          this.$route.path !== this.menu[0].path && this.$router.push("/");
          break;
        case "logout":
          this._logout();
          break;
        default:
      }
    },
    _logout () {
      this.$emit("logout");
    },
    showMessage () {
      this.$emit("showMessage");
    },
    goToSetting () {
      this.$router.push("/setting");
    }
  }
};
</script>
