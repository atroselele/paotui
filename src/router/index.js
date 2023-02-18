import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Index.vue"),
      redirect: "/pages/home/index",
      children: [
        {
          name: "home",
          path: "/pages/home/index",
          component: () => import("@/pages/view/Home.vue"),
          meta: {
            title: "首页"
          },
          props($route) {
            return {
              localCampus: $route.query.campusName,
            }
          }
        },
        {
          path: "/pages/errands/index",
          component: () => import("@/pages/view/pond/Errands.vue"),
          meta: {
            title: "跑腿池"
          }
        },
        {
          path: "/pages/order/index",
          component: () => import("@/pages/view/order/Order.vue"),
          meta: {
            title: "跑单/订单"
          }
        },
        {
          path: "/pages/my/index",
          component: () => import("@/pages/view/User.vue"),
          meta: {
            title: "我的"
          }
        }
      ]
    },
    {
      path: "/pages/public/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/pages/index/selectCampus",
      name: "school",
      component: () => import("@/pages/School.vue"),
      meta: {
        title: "学校列表"
      }
    }, {
      path: "/pages/task/search",
      name: "taskSearch",
      component: () => import("@/pages/TaskSearch.vue"),
      meta: {
        title: "搜索"
      }
    },
    {
      path: "/pages/task/tasklist",
      name: "taskList",
      component: () => import("@/pages/classify/Task.vue"),
      props(router) {
        return {
          searchValue: router.query.searchValue,
          classifyId: router.query.classifyId,
          title: router.query.title,
          type: "directSearch"
        }
      }
    }
  ]
})

/* 挂载路由导航 */
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title ? to.meta.title : to.query.title;
})

export default router;