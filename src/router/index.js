import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage/HomePage.vue";
import LogIn from "@/pages/SignIn/signin.vue";
import SearchBook from "@/pages/Search/search.vue";
import Contact from "@/pages/Contact/contact.vue";
import InforUser from "@/pages/InforUser/inforuser.vue";
import adminRoutes from "@/router/adminroutes.js";

import {useAccountStore} from "@/store/useStore"

const routes = [
  ...adminRoutes,
  {
    // Trang chủ
    path: "/",
    name: "homepage",
    component: HomePage,
  },
  {
    // Trang đăn nhập
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    // Trang lỗi khi không tìm thấy ID
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    // Trang tìm kiếm sách
    path: "/searchbook",
    name: "searchbook",
    component: SearchBook,
  },
  {
    //Trang liên hệ
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    // Trang thông tin bạn đọc
    path: "/inforuser",
    name: "inforuser",
    component: InforUser,
    children : [
      {
        path: "",
        name :'name',
        component: () => import("@/pages/InforUser/inforname.vue")
      },
      {
        path: "QLPM",
        name :"phieumuon",
        component: () => import("@/pages/InforUser/userphieumuon.vue")
      },
      {
        path: "QLGH",
        name :"giahan",
        component: () => import("@/pages/InforUser/usergiahan.vue")
      },
      {
        path: "detailsPhieuMuon/:id",
        name : "detailsphieumuon",
        component: () => import("@/pages/InforUser/detailsphieumuon.vue"),
        params : true
      }
    ]
  },
];
// console.log(routes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) 
      return savedPosition;
    else 
        return { x: 0, y: 0 };
  },
});

router.beforeEach((to,from,next) => {
  const AccountStore = useAccountStore();
  if(!AccountStore.user && to.name != 'login'){
    next({
      path: '/login',
      replace: true
    })
  }
  next();
}
)
export default router;
