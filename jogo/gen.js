// Gerar as contas + resultado com base em uma dificuldade


// Operações duplas (2 números) -> 3 + 2
// Operações unas (funções, 1 número) -> 3%, sqrt(3)

var OPERADORES = ["+", "-", "*", "/", "%"];
var OPERADORES_UNOS = ["√"]

var TIPOS_OPERACOES = ["una", "dupla"];




/*
PRIMATA -> +, -
FACIL -> +, -, *
MEDIO -> -, *, /
MASOQUISMO -> +, -, *, /, **, %
*/

function gerar_numero(maximo) {
    // Gera um número aleatório de 0 -> máximo
    return Math.floor(Math.random() * maximo);
}

function roundTo(n, decimalPlaces) {
    return +(+(Math.round((n + 'e+' + decimalPlaces)) + 'e-' + decimalPlaces)).toFixed(decimalPlaces);
}

function escolher(array) {
    // Pega um elemento dum array com um index aleatório
    return array[gerar_numero(array.length)]
}

function resolver_expressao(expressao) {
    let tipo_operacao = expressao[0]
    let num1 = expressao[1]
    let operador = expressao[2]

    if (tipo_operacao === "una") {
        if (operador === "√") {
            return Math.sqrt(num1);
        }
        throw "Invalid expression";
    }

    let num2 = expressao[3]

    if (operador === "+") {
        return num1 + num2;
    } else if (operador === "-") {
        return num1 - num2;
    } else if (operador === "/") {
        return num1 / num2
    } else if (operador === "*") {
        return num1 * num2;
    } else if (operador === "**") {
        return num1 ** num2;
    } else if (operador === "%") {
        return (num1 / 100) * num2;
    }
}
  
function gerar_expressao(dificuldade) {
    // Gera 2 números aleatórios com base na dificuldade
    let num1 = gerar_numero(dificuldade+9);
    
    // Escolhe um operador aleatório
    let operador = escolher(OPERADORES.concat(OPERADORES_UNOS));
    let tipo_operacao = ""
    let expressao = []

    if (operador in OPERADORES) {
        tipo_operacao = "una"
        expressao = [tipo_operacao, num1, operador]
    } else {
        tipo_operacao = "dupla"
        let num2 = gerar_numero(dificuldade+9);
        expressao = [tipo_operacao, num1, operador, num2]
    }

    let resultado = resolver_expressao(expressao)
    
    // Retorna um número, operador, outro número e o resultado da conta.
    return [expressao, resultado];
}