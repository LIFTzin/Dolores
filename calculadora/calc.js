//visor.textContent =
var lista = [];
var lista_junta = [];
var lista_numeros = ["0","1","2","3","4","5","6","7","8","9"];
var lista_operadores = ["+","-","*","/"];
function atualizarVisor(lista) {
    var visor = document.getElementById('visor');
    visor.textContent = lista;
}
function mostrar_coisa(string){
    if (string === "="){
        lista_junta = juntar_numeros();
        lista.splice(0, lista.length);
        lista.push(lista_junta);
    }
    else{
        lista.push(string);
    }
}
function mostrar_lista() {
    console.log(lista)
}
function juntar_numeros(){ //varendo a lista para juntar numeros escritos entre operadores
    //["1","0", "+", "7", "*", "9", "9", "9"] inicial
    //["10", "+", "7" "*", "9", "9", "9"] almejado
    //processo
    // i=0 -> lista_de_varrer_inical = ["1"]

    // i=1 -> lista_de_varrer_inical = ["1","0"]
    // i=1 -> concatenar = "10"
    // i=1 -> lista_de_varrer_inicial = [] (apagou)
    // i=1 -> lista_de_varrer_inicial (+= concatenar) = ["10"]

    // i=2 -> lista_de_varrer_final (+=lista_de_varrer_incial) = ["10"]
    // i=2 -> lista_de_varrer_fianl = ["10","+",]
    let lista_de_varrer_final = [];
    let lista_de_varrer_inicial = [];

    for (let i = 0; i < lista.length; i++) {
        if (!lista_operadores.includes(lista[i])){
            if (lista_de_varrer_inicial.length > 0){ 
                lista_de_varrer_final.push(...lista_de_varrer_inicial); //... -> adicionar só os elementos
                lista_de_varrer_inicial.splice(0, lista_de_varrer_inicial.length);
            }
            lista_de_varrer_final.push(lista[i]);
        }
        else{
            lista_de_varrer_inicial.push(lista[i]) 
            if(lista_de_varrer_inicial.length > 1) {
                let concatenar = lista_de_varrer_inicial.join("");
                lista_de_varrer_inicial.splice(0, lista_de_varrer_inicial.length); // apaga a lista
                lista_de_varrer_inicial.push(concatenar);
            }
        }    
    }
    // Trata o caso em que a última parte da expressão não é um operador
    /*if (lista_de_varrer_inicial.length > 0) {
        let concatenar = lista_de_varrer_inicial.join("");
        lista_de_varrer_final.push(concatenar);
    }*/
    lista.splice(0, lista.length);
    lista.push(...lista_de_varrer_final);
    return lista.join("");
}

window.atualizarVisor=atualizarVisor;
window.mostrar_coisa=mostrar_coisa;
window.mostrar_lista=mostrar_lista;
window.juntar_numeros=juntar_numeros;