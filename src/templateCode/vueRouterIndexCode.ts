export default 
`// vue-router 中文文档地址 https://router.vuejs.org/zh/
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path:"/",
      component: () => import("@/pages/Home.vue"),
    }
  ]
})

export default router;`