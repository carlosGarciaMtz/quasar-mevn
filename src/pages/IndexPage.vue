<template>
  <q-page padding>
    <q-btn @click="createLink">Crear Link</q-btn>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useLinkstore } from "../stores/link-store"

const linkStore = useLinkstore();

const url = ref('holis')

const createLink = async () => {
  try {
    linkStore.createLink(url.value)
  } catch (error) {
    console.table(error)
  }
}
</script>
