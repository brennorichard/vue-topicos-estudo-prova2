<template>
  <div class="about">
    <h1>Bem vindo {{ nome }}</h1>
    <p><input type="text" v-model="nome"/></p>
    <p><input type="password" v-model="senha"/></p>
    <button @click="cadastrar">Cadastrar</button>
    <p v-if="nome.length > 5">Nome longo</p>
    <p v-else>Nome curto</p>
    <p>{{ contador }} <button @click="incrementar">Incrementar</button></p>
    <button @click="atualizar">Atualizar</button>
    <p v-if="erro">{{ erro }}</p>
    <table>
      <thead>
        <td>Id</td>
        <td>Nome</td>
      </thead>
      <tr v-for="usuario in usuarios" :key="usuario.id">
        <td>{{ usuario.id }}</td>
        <td>{{ usuario.nome }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nome = ref("Nome");
const senha = ref("123");

const contador = ref(1);

const usuarios = ref();

const erro = ref('');

function incrementar() {
  contador.value++;
}

async function atualizar() {
  try {
    usuarios.value = (await axios.get('https://8080-mineda-springtopicos202-wojfos5znh2.ws-us90.gitpod.io/usuario')).data;
    erro.value = '';
  }
  catch(ex) {
    erro.value = (ex as Error).message;
  }
}

async function cadastrar() {
  try {
    await axios.post('https://8080-mineda-springtopicos202-wojfos5znh2.ws-us90.gitpod.io/usuario', 
      {
        nome: nome.value,
        senha: senha.value
      });
    erro.value = '';
    atualizar();
  }
  catch(ex) {
    erro.value = (ex as Error).message;
  }
}

onMounted(() => {
  atualizar();
});

</script>

