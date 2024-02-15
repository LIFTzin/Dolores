// Gerar as contas + resultado com base em uma dificuldade


// Operações duplas (2 números) -> 3 + 2
// Operações unas (funções, 1 número) -> 3%, sqrt(3)

const OPERADORES = ["+", "-", "*", "/", "%", "**"];
const OPERADORES_UNOS = ["√", "sin", "cos"];

const TIPOS_OPERACOES = ["una", "dupla"];

const OPERADORES_DIFICULDADES = {
    "primata": ["+", "-"],
    "facil": ["+", "-", "*"],
    "medio": ["-", "*", "/"],
    "dificil": ["*", "/", "%", "**"],
    "insano": ["+", "-", "*", "/", "%", "√", "**"],
    "lunatico": ["sin", "cos", "*", "/", "/", "%", "%", "√", "√"],
    "masoquista": ["+", "-", "*", "/", "%", "√", "**","%", "√", "**","%", "√", "√",
                    "sin", "sin", "cos", "cos"],
};


/*
PRIMATA -> +, -
FACIL -> +, -, *
MEDIO -> -, *, /
MASOQUISMO -> +, -, *, /, **, %
*/

function randint(start, end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function roundTo(n, decimalPlaces) {
    return +(+(Math.round((n + 'e+' + decimalPlaces)) + 'e-' + decimalPlaces)).toFixed(decimalPlaces);
}

function escolher(array) {
    // Pega um elemento dum array com um index aleatório
    return array[randint(0, array.length-1)];
}

function resolver_expressao(expressao) {
    let tipo_operacao = expressao[0];
    let num1 = expressao[1];
    let operador = expressao[2];

    if (tipo_operacao === "una") {
        if (operador === "√") {
            return Math.sqrt(num1);
        } else if (operador === "sin") {
            return Math.sin(num1);
        } else if (operador === "cos") {
            return Math.cos(num1);
        }
        throw "Invalid expression";
    }

    let num2 = expressao[3];

    if (operador === "+") {
        return num1 + num2;
    } else if (operador === "-") {
        return num1 - num2;
    } else if (operador === "/") {
        return num1 / num2;
    } else if (operador === "*") {
        return num1 * num2;
    } else if (operador === "**") {
        return num1 ** num2;
    } else if (operador === "%") {
        return (num1 / 100) * num2;
    }
}

function operador_aleatorio(dificuldade) {
    return escolher(OPERADORES_DIFICULDADES[dificuldade]);
}

function gerar_numero_pot(difficuldade) {
    if (difficuldade !== "masoquista") {
        return randint(0, 4)
    }
    return randint(-5, 5);
}

function gerar_numero(numero_da_partida, evitar0=false, negativos=true) {
    let chance_negativos = 0;
    if (numero_da_partida >= 21 && negativos) {
        chance_negativos = 50;
    }

    let min = 0;
    if (evitar0) {
        min = 1;
    }

    let num_gerado = randint(min, (numero_da_partida+4))

    if (randint(0, 100) < chance_negativos) {
        num_gerado = num_gerado * -1;
    }

    return num_gerado;
}

function gerar_expressao(numero_da_partida, dificuldade) {
    // Gera 2 números aleatórios com base na dificuldade
    
    
    // Escolhe um operador aleatório
    let operador = operador_aleatorio(dificuldade);
    let tipo_operacao = "";
    let expressao = [];

    let num1;
    let num2;

    if (OPERADORES_UNOS.includes(operador)) {
        let negativos = true;
        
        if (operador === "√") {
            negativos = false;
        }

        num1 = gerar_numero(numero_da_partida, false, negativos);
        tipo_operacao = "una";
        expressao = [tipo_operacao, num1, operador];
    } else {
        tipo_operacao = "dupla";
        if (operador !== "**") {
            num1 = gerar_numero(numero_da_partida);
            num2 = gerar_numero(numero_da_partida, true);
        } else {
            num1 = gerar_numero_pot(dificuldade);
            num2 = gerar_numero_pot(dificuldade)
        }
        expressao = [tipo_operacao, num1, operador, num2];
    }

    let resultado = resolver_expressao(expressao);
    
    // Retorna um número, operador, outro número e o resultado da conta.
    return [expressao, roundTo(resultado, 2)];
}

export {gerar_expressao, resolver_expressao, randint, roundTo, escolher};