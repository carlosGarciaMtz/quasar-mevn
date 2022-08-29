import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore('user',()=>{
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      const resp = await api.post("/api/v1/auth/login", { email, password, });
      token.value = resp.data.msg.token
      expiresIn.value = resp.data.msg.expiresIn
      sessionStorage.setItem('store', true);
    } catch (error) {
      resetStore();
      throw (error.response.data)
    }
  }

  const logout = async () => {
    try {
      const resp = await api.get("/api/v1/auth/logout");
      console.log(resp.data)
    } catch (error) {
      console.error("error: ",error)
    } finally {
      resetStore();
    }
  }

  const refreshToken = async () => {
    try {
      const resp = await api.get("/api/v1/auth/refresh")
      console.log(resp.data)
      token.value = resp.data.msg.token
      expiresIn.value = resp.data.msg.expiresIn
      sessionStorage.setItem('store', true);
    } catch (error) {
      resetStore();
    }
  }

  const register = async (email, password, password2) => {
    try {
      const resp = await api.post("api/v1/auth/register",{email, password, password2})
      token.value = resp.data.msg.token
      expiresIn.value = resp.data.msg.expiresIn
    } catch (error) {
      resetStore();
      throw (error.response.data)
    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null
    sessionStorage.clear();
  }


  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register
  };

});
