<template>
    <ul :class="{'sidebar-menu': isRoot,'treeview-menu': !isRoot}">
      <menu-item v-for="(row, index) in menuList.map((item) => {if (!item.url) item.url = item.id; return item;})"
                 :key="index"
                 :menu-data="row"></menu-item>
    </ul>
</template>

<script>
const MenuItem = () => import("./MenuItem");

export default {
  components: { MenuItem },
  props: {
    menuList: {
      type: Array,
      default: []
    },
    isRoot: Boolean
  }
};
</script>

<style lang='scss' scoped>/* stylelint-disable-line */
  .common-scale-enter-active,
.common-scale-leave,
.common-scale-enter-to {
  transform: scale(1);
}

.common-scale-leave-active,
.common-scale-leave-to,
.common-scale-enter {
  transform: scale(0.01);
}
</style>