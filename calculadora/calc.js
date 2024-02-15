var lista = []; // Lista atual de caracteres digitados pelo usuário -> ex: ["3", "+", "4", "5"]

var lista_numeros = ["0","1","2","3","4","5","6","7","8","9"];
var lista_operadores = ["+","-","*","/"]; // Operadores aritméticos básicos.
var operadores_primeiro = ["*", "/"];
var operadores_segundo = ["+", "-"];

var visor = document.getElementById('visor')

var resultado_anterior = 0;

function atualizarVisor(lista) {
    var visor = document.getElementById('visor');
    visor.textContent = lista;
}

function mostrar_lista() {
    console.log(lista);
}

// CE
function apagar_tudo() {
    // Apaga a expressão atual e coloca o resultado anterior

    lista = [resultado_anterior];
    atualizarVisor(resultado_anterior);
}

function apagar_caractere() {
    if (lista.length > 0) {
        lista.pop()
    }

    if (lista.length === 0) {
        atualizarVisor(0);
    }   else {
        atualizarVisor(lista.join(""));
    }

}

// C
function apagar_acao() {
    atualizarVisor(0);
    lista = [];
}

function mostrar_coisa(coisa) {

    let lista_string = lista.join("");
    // Apertou no botão de igual
    if (coisa === "=") {
        let resultado = eval(lista_string);
        lista = [resultado];        
        atualizarVisor(resultado);

        resultado_anterior = resultado;

        return;
    }
    // Adiciona a coisa
    lista.push(coisa);

    // Atualiza o visor
    atualizarVisor(lista.join(""));
}

function abrir_opcoes() {
    /* mágica*/
    console.log('Usuário abriu as opções'); // me tira pfv
}

window.mostrar_lista = mostrar_lista;
window.mostrar_coisa = mostrar_coisa;
window.apagar_tudo = apagar_tudo;
window.apagar_acao = apagar_acao;
window.apagar_caractere = apagar_caractere;
window.atualizarVisor = atualizarVisor;
window.abrir_opcoes=abrir_opcoes;