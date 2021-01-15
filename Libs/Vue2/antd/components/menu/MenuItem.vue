<template>
  <li :class="{ active: active }">
    <a href="javascript:void(0);"
       :data-href="menuData.url"
       @click="clickRoute">
      <i :class="menuData.icon"></i>
      <span>{{ menuData.label }}</span>
      <i v-if="!isEdge"
         class="fa fa-angle-left pull-right"></i>
    </a>
    <Menu v-if="!isEdge"
          v-show="showChild"
          :menu-list="menuData.items"
          :is-root="false" />
  </li>
</template>
<script>
import { BASE_ROUTE_NAME, BASE_FLAG } from "@constant";
import { frontRoute } from "@utils/router";
import Menu from "./index";

export default {
  components: { Menu },
  props: {
    menuData: Object
  },
  data: () => ({
    active: false,
    showChild: false
  }),
  computed: {
    isEdge() {
      return !this.menuData.items || !this.menuData.items.length;
    }
  },
  mounted() {
    this.$nextTick(this.init);
  },
  methods: {
    init() {
      const path = this.getFullPath();
      const { menu } = window.__INITIAL_STATE__.menusTree;
      const { url } = this.menuData;
      let pUrls = [];

      this.getParentUrl(window.location.pathname, menu, pUrls);

      pUrls = pUrls.filter(x => !!x);
      if (pUrls.includes(url)) {
        this.active = true;
      }

      pUrls.map(s => {
        const oA = $(`a[data-href="${s}"]`);
        if (s && oA) {
          const oUl = this.getNextUlNode(oA.get(0));
          oUl && oUl.slideDown(1);
        }
      });
    },
    clickRoute(evt) {
      this.active = true;
      let dom = this.getNextUlNode(evt.target);
      if (dom && dom.length) {
        return dom.slideToggle("fast", () => {
          this.active = !this.active;
        });
      }

      const { url } = this.menuData;
      if (!url || url === "#") return false;

      // 旧路由，重定向
      if (url.indexOf(BASE_FLAG) === -1) {
        const { domain } = window.__INITIAL_STATE__;
        window.location.href = `//${domain + url}`;
        return true;
      }

      if (url !== this.getFullPath()) {
        this.$router.push(frontRoute(url));
      }
      return true;
    },
    getFullPath() {
      const { path } = this.$route;
      return path && path.indexOf(BASE_FLAG) > -1
        ? path
        : BASE_ROUTE_NAME + path;
    },
    getParentUrl(targetPath, options, urls) {
      if (!options || !options.length) return false;

      return options.some(op => {
        if (op.url === targetPath) {
          urls.push(op.url);
          return true;
        }

        const flag = this.getParentUrl(targetPath, op && op.items, urls);
        if (flag) {
          urls.push(op.url);
          return true;
        }
      });
    },
    getNextUlNode(node) {
      try {
        const tagName = node.tagName;
        node = tagName === "A" ? node : $(node).offsetParent();
        return $(node)
          .next("ul")
          .eq(0);
      } catch (err) {
        return null;
      }
    }
  }
};
</script>
