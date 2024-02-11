// partida
import 'gen.js';

function ver_dificuldade (numero_da_partida){
    if (numero_da_partida === 1 || numero_da_partida === 2 || numero_da_partida === 3) {
        dificuldade = "primata"
        return dificuldade
    }
    else if  (numero_da_partida === 4 || numero_da_partida === 5) {
        dificuldade = "facil"
        return dificuldade
    }
    else if  (numero_da_partida === 6 || numero_da_partida === 7 || numero_da_partida === 8) {
        dificuldade = "medio"
        return dificuldade
    }
    else if  (numero_da_partida === 9 || numero_da_partida === 10) {
        dificuldade = "dificil"
        return dificuldade
    }
    else if  (numero_da_partida >= 10) {
        dificuldade = "masoquista"
        return dificuldade
    }
}
function tempo_do_exercicio (dificuldade){
    if (dificuldade === "primata") {
        return 5
    }
    else if (dificuldade === "facil") {
        return 9 // formula = dificuldade anterior + 75% (arredondamento pra cima)
    }
    else if (dificuldade === "medio") {
        return 16
    }
    else if (dificuldade === "dificil") {
        return 28
    }
    else if (dificuldade === "masoquista") {
        return 49
    }
}
function gerar_partida (numero_da_partida){ // retorna a dificuldade, expressao, resultado, tempo
    let expressao_gerada = gerar_expressao()
    let expressao = expressao_gerada[0]
    let resultado = expressao_gerada[1]
    let dificuldade = ver_dificuldade(numero_da_partida)
    let tempo = tempo_do_exercicio(dificuldade)

    return [dificuldade, expressao, resultado, tempo]
}