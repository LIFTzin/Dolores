

function login(event) {
    console.log('Hello World!');
}

function mostrar_esconder(event) {
    event.preventDefault();
    var pass_input = document.getElementById("password-input");

    var label = document.getElementById("show-hide-label")

    if (pass_input.type === "password") {
        label.innerText = "Hide password";
        pass_input.type = "text";
    } else {
        label.innerText = "Show password";
        pass_input.type = "password";
    }
}
