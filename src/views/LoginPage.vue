<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Senha:</label>
          <input id="password" type="password" v-model="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import router from '@/router';
import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const submitForm = () => {
    // aqui você pode fazer a validação do email e senha
    if (email.value === 'usuario@exemplo.com' && password.value === 'senha123') {
      alert('Login realizado com sucesso!');
      // redireciona para a página de dashboard
      router.push('/dashboard');
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  };
  </script>
  