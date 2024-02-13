// partida
import { gerar_expressao, roundTo } from './gen.js';
// TODO: MELHORAR FÓRUMLA DO TEMPO, CONSIDERE A 'DIFICULDADE REAL' DAS EXPRESSÕES
// Porcentagem a ser multiplicada
var AUMENTO_DE_TEMPO = 1.175;

const TEMPO_MIN_DIFICULDADE = {
    "primata": 4,
    "facil": 7,
    "medio": 13,
    "dificil": 22,
    "masoquista": 33,
};

const PARTIDAS_DIFICULDADES = {
    "primata": [0, 10],
    "facil": [11, 20],
    "medio": [21, 30],
    "dificil": [31, 40],
}

const DIFICULDADES_ACENTOS = {
    "primata": "Primata",
    "facil": "Fácil",
    "medio": "Médio",
    "dificil": "Difícil",
    "masoquista": "Masoquista",
}

function ver_dificuldade (numero_da_partida){
    for (const [key, value] of Object.entries(PARTIDAS_DIFICULDADES)) {
        let x = value[0];
        let y = value[1];

        if (x <= numero_da_partida && numero_da_partida <= y) {
            return key;
        }
    }
    return "masoquista";
}

// t(x) = Ax + o
// https://www.desmos.com/calculator/qh9r4zzjdp
function tempo(x, o) {
    if (x > 40) {
        x = 50;
    }
    return x * AUMENTO_DE_TEMPO + o
}

function tempo_do_exercicio (dificuldade, numero_da_partida){
    // formula = dificuldade anterior + 75% (arredondamento pra cima)
    return roundTo(tempo(numero_da_partida, TEMPO_MIN_DIFICULDADE[dificuldade]), 2);
}

function gerar_partida (numero_da_partida){ // retorna a dificuldade, expressao, resultado, tempo
    let dificuldade = ver_dificuldade(numero_da_partida);
    let expressao_gerada = gerar_expressao(numero_da_partida, dificuldade);
    let expressao = expressao_gerada[0];
    let resultado = expressao_gerada[1];
    let tempo = tempo_do_exercicio(dificuldade, numero_da_partida);

    return [dificuldade, expressao, resultado, tempo];
}

export {gerar_partida, DIFICULDADES_ACENTOS};