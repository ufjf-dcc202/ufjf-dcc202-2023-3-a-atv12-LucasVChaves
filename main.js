import { getEstoque, limpaEstoque, transacaoNoEstoque } from "./estoque.js";

const olJoao = document.querySelector("#joao");
const olMaria = document.querySelector("#maria");

document.entrada.addEventListener('submit', leForm);

function preencheLista(pessoa, lista){
    lista.innerHTML = "";
    for(let i = 0; i < pessoa.length; i++){
        const frutas = pessoa[i];
        const eLi = document.createElement('li');
        eLi.innerText = `${frutas.tipo}: ${frutas.qtd}`;
        lista.append(eLi); 
    }
}

function update(){
    const estoque = getEstoque();

    preencheLista(estoque['joao'], olJoao);
    preencheLista(estoque['maria'], olMaria);
}

function leForm(event) {
    event.preventDefault();
    
    const fruta = document.entrada.fruta.value;
    const quantidade = document.entrada.quantidade.valueAsNumber;
    const origem = document.entrada.origem.value;
    const destino = document.entrada.destino.value;

    transacaoNoEstoque(origem, destino, quantidade, fruta);
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLimparLista').addEventListener('click', () => {
        limpaEstoque();
        update();
    })
});