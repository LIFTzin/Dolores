// partida
import { gerar_expressao, roundTo } from './gen.js';
// TODO: MELHORAR FÓRUMLA DO TEMPO, CONSIDERE A 'DIFICULDADE REAL' DAS EXPRESSÕES
// Porcentagem a ser multiplicada
var AUMENTO_DE_TEMPO = 1.175;
// Em segundos
var TEMPO_MAX_PARTIDA = 120;

const TEMPO_MIN_DIFICULDADE = {
    "primata": 5,
    "facil": 10,
    "medio": 15,
    "dificil": 20,
    "insano": 25,
    "lunático": 30,
    "masoquista": 35,
};

const TEMPO_OPERACOES = {
    "+": -3,
    "-": -2.65,
    "*": -1.7,
    "/": 0.5,
    "**": -2.5,
    "√": 3.4,
    "%": 3,
    "sin": 4,
    "cos": 4,
    "tan": 4.5,
}

const PARTIDAS_DIFICULDADES = {
    "primata": [0, 9],
    "facil": [10, 19],
    "medio": [20, 29],
    "dificil": [30, 39],
    "lunatico": [40, 49],
    "insano": [50, 59],
}

const DIFICULDADES_ACENTOS = {
    "primata": "Primata",
    "facil": "Fácil",
    "medio": "Médio",
    "dificil": "Difícil",
    "insano": "Insano",
    "lunatico": "Lunático",
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

/*

FUNÇÃO ANTIGA
* t(x) = Ax + o
> https://www.desmos.com/calculator/qh9r4zzjdp

FUNÇÃO NOVA
* t(x) = (Ax + m) + O * (x - 2)
>https://www.desmos.com/calculator/sc2sc5yqbw

*/

function tempo(x, m, operador, dificuldade) {
    console.log(operador)
    let O = TEMPO_OPERACOES[operador];
    if (x > 40) {
        x = 50;
    }

    if (dificuldade === "masoquista") {
        O = O * ((x/2) - 2)
    }

    let tempo = (AUMENTO_DE_TEMPO * x + m) + O;

    console.log(tempo);

    // Manter tempo mínimo para as dificuldades primata e fácil.
    if (["primata", "facil"].includes(dificuldade) && tempo > m) {
        return m;
    } else if (tempo > TEMPO_MAX_PARTIDA) {
        return TEMPO_MAX_PARTIDA; // Não ultrapassar do tempo máximo
    }
    // Senão, a fórmula julga.
    return tempo; 
}

function tempo_do_exercicio (dificuldade, numero_da_partida, operador){
    // formula = dificuldade anterior + 75% (arredondamento pra cima)
    return roundTo(tempo(
        numero_da_partida, 
        TEMPO_MIN_DIFICULDADE[dificuldade], 
        operador,
        dificuldade
    ), 2);
}

function gerar_partida (numero_da_partida){ // retorna a dificuldade, expressao, resultado, tempo
    let dificuldade = ver_dificuldade(numero_da_partida);
    let expressao_gerada = gerar_expressao(numero_da_partida, dificuldade);
    let expressao = expressao_gerada[0];
    let resultado = expressao_gerada[1];
    let operador = expressao[2]

    let tempo = tempo_do_exercicio(dificuldade, numero_da_partida, operador);

    return [dificuldade, expressao, resultado, tempo];
}

export {gerar_partida, DIFICULDADES_ACENTOS};
