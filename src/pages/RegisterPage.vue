<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5 text-center">
      <h2>Register Page</h2>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
        <q-input
          v-model="email"
          label="Correo electronico *"
          type="text"
          :rules="[
            (val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato de correo incorrecto'
          ]"
        />
        <q-input
          v-model="password"
          label="Contraseña *"
          type="password"
          :rules="[
            (val) => (val && val.length > 5) || 'Contraseña minima de 6 cáracteres'
          ]"
        />
        <q-input
          v-model="repassword"
          label="Confirmar contraseña *"
          type="password"
          :rules="[
            (val) => (val && val === password) || 'No coinciden las contraseñas'
          ]"
        />
        <div class="text-center">
          <q-btn label="Crear usuario" type="submit" color="primary"/>
        </div>
      </q-form>
      <br/>
      <q-btn color="dark" to="/login">Ya tengo cuenta</q-btn>
    </div>
  </q-page>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { ref } from "vue";
  import { useUserStore } from "../stores/user-store";
  import { useRouter } from "vue-router";

  const userStore = useUserStore();
  const $q = useQuasar();
  const router = useRouter();

  const email =  ref("");
  const password = ref("");
  const repassword = ref("");

  const showDialog = (title, message) =>{
    $q.dialog({
      title,
      message
    })
  }

  const handleSubmit = async () => {
    try {
      await userStore.register(email.value, password.value, repassword.value)
      router.push('/');
    } catch (error) {
      console.log(error)
      showDialog(error.status, error.msg)
    }
}
</script>
