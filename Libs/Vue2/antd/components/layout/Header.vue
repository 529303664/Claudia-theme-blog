<template>
  <header class="main-header"
          id="main-head">
    <a class="logo"
       href="/"><span class="logo-mini">APP</span><span class="logo-lg">运营后台</span></a>
    <nav class="navbar navbar-static-top"
         role="navigation">
      <button class="sidebar-toggle"
              data-toggle="offcanvas"
              role="button"
              id="menu_hide_button"
              @click="clickCollapse"></button>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu notifications-menu"
              :class="{ open: openProfile }">
            <a data-toggle="dropdown"
               aria-expanded="true"
               data-cross-wall="true"
               @click="openProfile = !openProfile"
               @blur="openProfile = false">
              <img :src="require('COMMON/assets/imgs/bigo.gif')"
                   class="user-image"
                   alt="User Image" />
              <span class="hidden-xs text-capitalize">{{ userName }}</span>
            </a>
            <ul class="dropdown-menu"
                style="width: 80px;">
              <li>
                <ul class="menu">
                  <li>
                    <a :href="`//${domain}/`"
                       id="personSet"
                       data-cross-wall="true">
                      <i class="fa fa-user text-aqua"></i> 个人设置
                    </a>
                  </li>
                  <li>
                    <a :href="`//${domain}/login/logout`">
                      <i class="fa fa-sign-out text-red"></i> 退出
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { COMMON_TYPES } from "@constant/vuexType";

export default {
  computed: {
    ...mapState('global', ['isCollapseExpand'])
  },
  data: () => ({
    domain: window.__INITIAL_STATE__.domain,
    openProfile: false,
    userName: window.__INITIAL_STATE__.menusTree.user.name || "developer"
  }),
  methods: {
    clickCollapse() {
      this.$store.commit('global/UPDATE_Expand', !this.isCollapseExpand);
    }
  }
};
</script>

<style lang="scss">
.main-header {
  margin-left: 0 !important;
  border-bottom: none !important;

  .navbar {
    padding: 0;
    // background-color: #a1a1a2 !important;
  }

  .sidebar-toggle {
    border: none;
    padding: 14px 15px;
  }

  .navbar-nav > .user-menu .user-image {
    float: left;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: -2px;
  }

  .navbar-nav > li > a {
    line-height: 20px;
  }

  .nav > li > a {
    position: relative;
    display: block;
    padding: 10px 15px;
  }

  .open {
    .dropdown-menu {
      display: block;
    }
  }

  @media (max-width: 767px) {
    .navbar-nav > .user-menu .user-image {
      float: none;
      margin-right: 0;
      margin-top: -8px;
      line-height: 10px;
    }

    .hidden-xs {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
    .navbar-nav > li > a {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
}
@media (min-width: 992px) {
  #main-head .main-header {
    margin-left: 0 !important;
  }
}
</style>
