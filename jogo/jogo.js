import { gerar_partida } from "./partida.js";

var PONTOS = 0;
var NUMERO_DA_PARTIDA = 0;
var PARTIDA_ATUAL;

var label = document.getElementById("label");
var input_user = document.getElementById("user-input");
var num_romano = document.getElementById("roman-num");

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
        if (operador === "%") {
            mudar_label(num1 + "% de  " + num2);
            return;
        }
        mudar_label(num1 + " " + operador + " " + num2)
    }
}

function atualizar_roman(numero) {
    num_romano.innerText = romanize(numero);
}

function atualizar_partida() {
    NUMERO_DA_PARTIDA ++;
    atualizar_roman(NUMERO_DA_PARTIDA);
    PARTIDA_ATUAL = gerar_partida(NUMERO_DA_PARTIDA);
    input_user.value = "";
    atualizar_label();
}

function get_expressao() {
    return PARTIDA_ATUAL[1]
}

function get_resultado() {
    return PARTIDA_ATUAL[2]
}

atualizar_partida();
console.log(PARTIDA_ATUAL);
console.log(get_expressao()[3])

// RODA QUANDO O USUÁRIO PRESSIONA 'Enviar resposta'
function mandar_dados(event) {
    event.preventDefault();
    let palpite = input_user.value;

    if (palpite == get_resultado()) {
        PONTOS += 1;
        atualizar_partida();
        return;
    } else {
        alert("BURRO, você perdeu!");
        window.location.href = "../index.html";
    }
    
    console.log(input_user.value);
}

window.mandar_dados = mandar_dados;