import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {path: '/', name: 'Index', component: () => import('./pages/Index.vue'), meta: {title: '古猫移动端'}}
];

const router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta.title) {
    if (typeof to.meta.title == "string") {
      common.setTitle(to.meta.title);
  } else {
      var key = to.meta.title[0];
      if (to.query[key] > 0) {
        common.setTitle(to.meta.title[1]);
      } else {
        common.setTitle(to.meta.title[2]);
      }
    }
}
});

export default router;
