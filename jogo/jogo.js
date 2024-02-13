import { roundTo } from "./gen.js";
import { gerar_partida, DIFICULDADES_ACENTOS } from "./partida.js";

var PONTOS = 0;
var NUMERO_DA_PARTIDA = 0;
var PARTIDA_ATUAL;

var label = document.getElementById("label");
var input_user = document.getElementById("user-input");

var num_romano = document.getElementById("roman-num");
var label_dificuldade = document.getElementById("difficulty-label");

var barra_do_tempo = document.getElementById("time");
var label_tempo = document.getElementById("time-label");

// http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
// FUNÇÃO DE NÚMEROS ROMANOS CRÉDITOS ACIMA
function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function mudar_label(texto) {
    label.innerText = texto;
}

function atualizar_label() {
    let expressao = get_expressao();
    let tipo = expressao[0];
    let num1 = expressao[1];
    let operador = expressao[2];
    
    if (tipo === "una") {
        mudar_label(operador + num1);
        return;
    } else {
        let num2 = expressao[3]
        

        if (num2 < 0) {
            num2 = "(" + num2 + ")"
        }

        if (operador === "%") {
            mudar_label(num1 + "% de  " + num2);
            return;
        }
        mudar_label(num1 + " " + operador + " " + num2)
    }
}

function atualizar_roman(numero) {
    num_romano.innerText = romanize(numero);
    label_dificuldade.innerHTML = DIFICULDADES_ACENTOS[get_dificuldade()];
}

function atualizar_partida() {
    NUMERO_DA_PARTIDA ++;
    PARTIDA_ATUAL = gerar_partida(NUMERO_DA_PARTIDA);
    atualizar_roman(NUMERO_DA_PARTIDA);
    input_user.value = "";
    atualizar_label();
    atualizar_tempo(get_max_tempo());

    console.log(PARTIDA_ATUAL);
    console.log(get_expressao()[3])
}

function get_expressao() {
    return PARTIDA_ATUAL[1]
}

function get_resultado() {
    return PARTIDA_ATUAL[2]
}

function get_dificuldade() {
    return PARTIDA_ATUAL[0];
}

function get_max_tempo() {
    return PARTIDA_ATUAL[3];
}

function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let resto = roundTo(segundos % 60, 2);
    if (minutos === 0) {
        return resto + "s";
    }
    return minutos + "m " + resto + "s";
  }
  

function atualizar_tempo(x) {
    let maximo = get_max_tempo();
    barra_do_tempo.max = maximo;
    barra_do_tempo.value = x;

    label_tempo.innerHTML = formatarTempo(x);
}

atualizar_partida();

// RODA QUANDO O USUÁRIO PRESSIONA 'Enviar resposta' ou pressiona ENTER
function mandar_dados(event) {
    if (event) {
        event.preventDefault();
    }
    let palpite = input_user.value;

    // Se o palpite não for um número, retorne.
    if (isNaN(palpite)) {
        return;
    }

    if (palpite == get_resultado()) {
        PONTOS += 1;
        atualizar_partida();
        return;
    } else {
        alert("BURRO, você perdeu!");
        // resetando
        NUMERO_DA_PARTIDA = 0;
        PONTOS = 0;

        window.location.href = "../index.html";
    }
    
    // console.log(input_user.value);
}

// CONFIGURAR ENTRADA DE BOTÃO
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        mandar_dados(event);
    }
})

window.mandar_dados = mandar_dados;