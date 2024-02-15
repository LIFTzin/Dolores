//visor.textContent =

var lista = []; // Lista atual de caracteres digitados pelo usuário -> ex: ["3", "+", "4", "5"]

var lista_numeros = ["0","1","2","3","4","5","6","7","8","9"];

var lista_operadores = ["+","-","*","/"]; // Operadores aritméticos básicos.

function atualizarVisor(lista) {
    var visor = document.getElementById('visor');
    visor.textContent = lista;
}

// Função chamada quando um botão é apertado na calculadora
function mostrar_coisa(string){
    if (string === "="){        
        // Coloca lista-junta como uma variável local.
        // Tokeniza os elementos da lista: ["3", "-", "3", "3"] -> ["3", "-", "33"]
        let lista_junta = juntar_numeros(lista);

        console.log(lista_junta)

        // Resolução da expressão

        /* Alguma_coisa(lista_junta) */

        // Limpar a lista de caracteres digitados
        // Para que assim, o usuário consiga digitar uma nova expressão

        /* 
        TODO: Depois que resolvida a expressão, a lista de chars ao invés de ser limpada, deve conter apenas o char 
        do resultado da expressão
        */
        lista = [];
    }
    else{
        lista.push(string);
    }
}

function mostrar_lista() {
    console.log(lista)
}

/* 
Essa função tokeniza uma lista digitada, concatenando os números
que estão separados por operadores.
EX: ["4", "-", "5", "3", "+", "3", "2", "1"] -> ["4", "-", "53", "+", "321"]
*/
function juntar_numeros(lista_digitada) { 
    let lista_final = []; // Lista final (a ser retornada)
    let num_atual = []; // Lista contendo os caracteres do número atual, veja o for abaixo:

    // Iterando os elementos da lista
    for (let i=0;i<lista_digitada.length;i++) {
        let char = lista_digitada[i]; // Pega o caractere atual usando o índice
        if (!lista_operadores.includes(char)) { // Se char NÃO for um operador aritmético, adicione-o a num_atual
            num_atual.push(char);
            continue // Isso faz com o que o for pule o código em seguinte.
        }

        // No caso então de char ser um operador...
        lista_final.push(num_atual.join("")); // Adicione o número atual à lista final, e concatene os elementos ["3", "3"] -> "33" 
        lista_final.push(char); // Adicione o operador à lista final
        num_atual = []; // Reseta a lista que guarda o número atual.
    }
    
    // Se houver alguma coisa ainda em num_atual, adicione esse número à lista final
    if (num_atual.length > 0) {
        lista_final.push(num_atual.join(""))
    }

    // Retorne a lista final.
    return lista_final;
}

window.atualizarVisor=atualizarVisor;
window.mostrar_coisa=mostrar_coisa;
window.mostrar_lista=mostrar_lista;
window.juntar_numeros=juntar_numeros;