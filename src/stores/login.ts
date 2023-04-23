import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
    const usuario = ref();
    const token = ref();
    const autorizacao = ref();
    const erro = ref();
    async function login(username: string, password: string) {
        try {
            const res = await axios.post("login",
                {
                    username: username,
                    password: password
                });
            const data = res.data;
            usuario.value = username;
            token.value = data.token;
            autorizacao.value = data.autorizacao;
        }
        catch (ex) {
            erro.value = (ex as Error).message;
        }
    }

    return { usuario, token, autorizacao, erro, login }
})