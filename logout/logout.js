function confirmar(event) { // event - ver comentário posterior
    event.preventDefault(); // importante colocar issso pra nao ficar piscando! NAO DEIXA ATUALIZAR A PAGINA
    document.getElementById("popup").style.display = "block";
}
function sim(event) {
    event.preventDefault();
    alert("Parabéns, você tomou a desicão correta ❤. Contamos com você!");
    alert("Agora voltemos!");
    document.getElementById("emoji").innerHTML = "😁"; // alterando emoji pro feliz feliz feliz
    document.getElementById("botao_sair").style.display = "none";

    //var container = document.getElementById("container_pra_centralizar");
    //container.style.textAlign = "center";

    document.getElementById("gif_happy").style.display = "block";
    document.getElementById("popup").style.display = "none"; // tirar o popup
    setTimeout(function() {
        document.getElementById("gif_happy").style.display = "none";
        document.getElementById("botao_sair").style.display = "block" // tirando o botao de sair enquanto estiver rodando o gif
        document.getElementById("logoutForm").submit(); // Enviar o formulário após 10 segundos
    }, 10000); 
    setTimeout(function() {
        window.location.href = "../index.html";
    }, 10000); 
}
function nao() {
    let alertas = ["Você clicou em 'Sim'?!","???????????????????","🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡","Eu...", "estou decepicionado", "😃", "😀", "😐", "😑","😥", "😖", "😭", "Ok."];
    for (let i = 0; i<alertas.length;i++) {
        alert(alertas[i]);
    }
    document.getElementById("popup").style.display = "none"; //oculta o popup
    window.location.href = "../index.html"; // NAO ESTA FUNCIONADO - ARRUMAR
}