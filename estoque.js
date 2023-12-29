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