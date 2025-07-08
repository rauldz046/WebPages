function alertlogin(valor){
    let cor = "";
    let mensagem = "";
    let content  = document.getElementById("alert")

    // 1- adicionar
    // 2- editar
    // 3- excluir
    // 4- erro

    switch (valor){
        case 1:
            cor = "success";
            mensagem = "Logando .....";
            break;
        case 2:
            cor = "warning";
            mensagem = "Usuario ou senha incorretos";
            break
        default:
            cor = "danger";
            mensagem = "Erro";
            break;
    }


    let alerta = `<div class="alert alert-${cor}" role="alert">
                    ${mensagem}
                </div>`;

    content.innerHTML = alerta

    setTimeout(function(){
        content.innerHTML = "";
    }, 3000);

}


function checagem() {
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;
    let nivel = "";

    if (nome === "Usuario1" && senha === "123") {
        alertlogin(1);
        nivel = "13";
        localStorage.setItem("nivel",nivel)
        localStorage.setItem("nome", nome);
        setTimeout(function() {
            window.location.href = "./index.html";
        }, 3000);

    } else if (nome === "Usuario2" && senha === "111") {
        alertlogin(1);
        nivel = "4";
        localStorage.setItem("nivel",nivel)
        localStorage.setItem("nome", nome);
        setTimeout(function() {
            window.location.href = "./index.html";
        }, 3000);

    } else if (nome === "Anonimo" && senha === "") {
        alertlogin(1);
        nivel = "1";
        localStorage.setItem("nivel",nivel)
        localStorage.setItem("nome", nome);
        setTimeout(function() {
            window.location.href = "./index.html";
        }, 3000);

    } else {
        alertlogin(2);
    }
}
