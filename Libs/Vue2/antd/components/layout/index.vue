

<template>
  <div class="wrapper">
    <Header />
    <SideBar />
    <div class="content-wrapper">
      <div class="content_page--wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import routes from '@router/routes';
import Header from './Header';
import SideBar from './SideBar';

export default {
  created() {
    const { path } = this.$route;
    if (path && path !== '/' && !routes.find(r => r.path === path)) {
       const { domain } = window.__INITIAL_STATE__;
        window.location.href = `//${domain}/error/forbidden`;
    }
  },
  components: { Header, SideBar }
};
</script>

<style lang="scss">
.wrapper {
  // overflow: auto;
  // TODO:
  // height: 100vh;
}

.content-wrapper {
  padding: 15px;
  // height: 100%;
  background: #fff;
  overflow: auto;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: auto;
}

@media (max-width: 767px) {
  .content-wrapper {
    top: 104px;
  }
}

.content_page--wrap {
  padding: 15px;
  min-height: 100%;
  background: #FFF;
  border: 1px solid #DCDFE6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>
