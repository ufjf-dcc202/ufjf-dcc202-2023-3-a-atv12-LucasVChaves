import { getEstoque, limpaEstoque, transacaoNoEstoque } from "./estoque";

const olJoao = document.querySelector("#joao");
const olMaria = document.querySelector("#maria");

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