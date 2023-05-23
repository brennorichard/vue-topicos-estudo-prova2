<template>
    <div>
      <form @submit.prevent="cadastrar">
        <h2>Provas</h2>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <input type="text" id="descricao"
              class="form-control" required autofocus
              v-model="descricao">
        </div>
        <div class="form-group">
          <label for="dataHora">Data e Hora</label>
          <input type="datetime-local" id="dataHora"
              class="form-control" required
              v-model="dataHora">
        </div>
        <div class="form-group">
          <label for="peso">Peso</label>
          <input type="text" id="peso"
              class="form-control" required
              v-model="peso">
        </div>
        <button class="btn btn-lg btn-primary btn-block" 
          type="submit">Salvar</button>
      </form>
      <br>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data/hora</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prova in provas" :key="prova.id">
            <td>{{ prova.descricao }}</td>
            <td>{{ prova.dataHora }}</td>
            <td>{{ prova.peso }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'prova', //rota
    data() {
      return {
        descricao: '',
        dataHora: '',
        peso: '',
        provas: []
      }
    },

    methods: {
      cadastrar() {
        axios.post('prova', //rota
            {
              descricao: this.descricao,
              dataHora: this.dataHora,
              peso: this.peso
            })
          .then(res => {
            console.log(res);
            this.descricao = '';
            this.dataHora = '';
            this.peso = '';
            this.atualizar();
          })
          .catch(error => console.log(error))
      },
      atualizar () {
        axios.get('prova') //rota
          .then(res => {
            console.log(res)
            this.provas = res.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.atualizar()
    }
  }
  </script>