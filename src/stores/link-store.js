import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkstore = defineStore('link', () => {
  const userStore = useUserStore();

  const createLink = async (uri) => {
    try {
      const resp = await api({
        method: "POST",
        url: 'api/v1/links',
        headers: {
          authorization: "Bearer " + userStore.token
        },
        data: {url:uri}
      })
      token.value = resp.data.msg.token
      expiresIn.value = resp.data.msg.expiresIn
    } catch (error) {
      throw (error.response.data)
    }
  }

  return {
    createLink,
  }
})
