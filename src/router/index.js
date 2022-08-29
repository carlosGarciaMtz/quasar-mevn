import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {useUserStore} from "../stores/user-store"

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) =>{
    const auth = to.meta.auth
    const user = useUserStore();

    if(user.token){
      return next();
    }

    if(auth || sessionStorage.getItem("store")) {
      await user.refreshToken();
      if(!user.token){
        return next("/login");
      }
    }

    next();
  });

  return Router
})
