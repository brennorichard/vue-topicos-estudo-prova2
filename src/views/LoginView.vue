<template>
    <div class="about">
        <h1>Bem vindo {{ nome }}</h1>
        <label for="nome">Nome: </label>
        <input id="nome" type="text" v-model="nome" />
        <label for="senha">Senha: </label>
        <input id="senha" type="password" v-model="senha" />
        <button @click="login">Login</button>
        <p v-if="store.erro">{{ store.erro }}</p>
        <p v-if="store.token">Token: {{ store.token }}</p>
        <p v-if="store.autorizacao">Token: {{ store.autorizacao }}</p>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/stores/login';

const nome = ref("login");
const senha = ref("senha");
const store = useLoginStore();

function login() {
    store.login(nome.value, senha.value);
}

</script>