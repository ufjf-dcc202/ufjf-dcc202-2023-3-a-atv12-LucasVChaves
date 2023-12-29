const estoque = {
    'joao': [
        {'tipo': 'maca', 'quantidade': 1},
    ],
    'maria': [
        {'tipo': 'maca', 'quantidade': 2},
    ],
};

export function getEstoque(){
    return estoque;
}

export function limpaEstoque() {
    estoque = {};
}

export function transacaoNoEstoque(origem, destino, tipo, quantidade) {
    if (origem === destino || quantidade <= 0) {
        return;
    }

    const criarSeNaoExistir = (local) => {
        if (local !== "pomar" && !estoque[local]) {
            estoque[local] = [];
        }
    };

    criarSeNaoExistir(origem);
    criarSeNaoExistir(destino);

    if (destino === "pomar") {
        const itemEncontrado = estoque[origem].find(item => item.tipo === tipo);

        if (itemEncontrado) {
            itemEncontrado.quantidade = Math.max(0, itemEncontrado.quantidade - quantidade);
        }

        return;
    }

    if (origem === "pomar") {
        const itemEncontrado = estoque[destino].find(item => item.tipo === tipo);

        if (itemEncontrado) {
            itemEncontrado.quantidade += quantidade;
        } else {
            estoque[destino].push({ tipo, quantidade });
        }

        return;
    }

    const itemOrigem = estoque[origem].find(item => item.tipo === tipo);
    const itemDestino = estoque[destino].find(item => item.tipo === tipo);
    if (!itemOrigem) {
        return;
    }

    const quantidadeTransferir = Math.min(quantidade, itemOrigem.quantidade);

    if (itemDestino) {
        itemDestino.quantidade += quantidadeTransferir;
    } else {
        estoque[destino].push({ tipo, quantidade: quantidadeTransferir });
    }

    itemOrigem.quantidade -= quantidadeTransferir;

    if (itemOrigem.quantidade === 0) {
        estoque[origem] = estoque[origem].filter(item => item.tipo !== tipo);
    }
}

function dePomarParaPessoa(destino, quantidade, fruta) {
    const pessoa = estoque[destino];
    let frutas;
    for(let i=0; i < pessoa.length; i++){
        if(pessoa[i].tipo === fruta){
            frutas = pessoa[i];
            break;
        }
    }
    if(!frutas){
        frutas = {tipo: fruta, qtd: 0};
        pessoa.push(frutas);
    }

    frutas.qtd += quantidade;
    return;
}

function dePessoaParaPomar(origem, quantidade, fruta) {
    const pessoa = estoque[origem];
        let frutas;
        for(let i=0; i < pessoa.length; i++){
            if(pessoa[i].tipo === fruta){
                frutas = pessoa[i];
                break;
            }
        }
        if(!frutas){
            return;
        }
        frutas.qtd -= Math.min(quantidade, frutas.qtd);
}