<template>
  <div class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal text-center">iNVENTORY</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="Digite seu usuario" v-model="username" required>
        <label for="floatingInput">Usuario</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Digite sua senha" v-model="password" required>
        <label for="floatingPassword">Password</label>
      </div>

      <div class="w-100 mb-3 text-center link_novo_usuario">
        <a @click="Registrar">Registrar novo usuário</a>
      </div>

      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div> -->
      <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
      <p class="mt-2 mb-3 text-muted text-center">&copy; 2023 - Guilherme Vesentini</p>
    </form>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const submit = async () => {
      const req = await fetch(`http://localhost:3001/users?username=${username.value}&password=${password.value}`);
      const response = await req.json();
      console.log(response);

      const token = response[0].token;
      localStorage.setItem('token', token);

      if (req.ok) {
        router.replace('/dashboard');
      } else {
        alert('Usuário não encontrado.')
      }
    };


    return { username, password, submit };
  },
  methods:{
    Registrar(){
      router.push({ path: `/NovoUsuario` });
    }
  }
});
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 10% auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating {
  margin: 15px 0;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.link_novo_usuario:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>