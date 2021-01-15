<template>
  <aside class="main-sidebar">
    <section>
      <Menu :menu-list="menuList" :is-root="true" />
    </section>
  </aside>
</template>

<script>
import Menu from '@components/menu';
import { MENU_LIST } from '@constant';

export default {
  components: { Menu },
  data: () => ({
    menuList: []
  }),
  created() {},
  mounted() {
    try {
      window.__INITIAL_STATE__.menusTree.menu.forEach(item => {
        if (item.label === 'LIKE' || item.label === 'Like 运营') {
          item.url = '/nodelive/view/';
          item.items.forEach((iitem, index) => {
            if (!iitem.url) {
              iitem.url = '/nodelive/view/' + index;
            }
          });
        }
      });
      const { menu } = window.__INITIAL_STATE__.menusTree;
      this.menuList = menu || MENU_LIST;

      // TODO
      window.menusTree = window.__INITIAL_STATE__.menusTree.menu = this.menuList;
    } catch (err) {
      this.menuList = MENU_LIST;
    }
  }
};
</script>

<style lang="scss">
.main-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 230px !important;
  height: 100%;
  overflow: auto;
  z-index: 810 !important;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  a {
    color: #b8c7ce;
  }

  .treeview-menu {
    &.menu-open {
      display: block;
    }
  }
}
.sidebar-collapse {
  .main-sidebar {
    margin-left: 0 !important;
    position: absolute;
    top: 0;
    left: 0;
    bottom: auto;
  }
}
</style>
