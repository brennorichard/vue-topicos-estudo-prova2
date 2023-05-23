import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProvaStore = defineStore('prova', () => {
    const data = ref();
    const erro = ref();

    async function getProvaData() {
        try {
            const res = await axios.get("prova");
            data.value = res.data;
        }
        catch (ex) {
            erro.value = (ex as Error).message;
            console.log(erro);
        }
    }

    return { data, getProvaData, erro }
})