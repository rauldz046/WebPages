// Definido variaveis globais
const tabela = document.getElementById("main-table")
var idconter = 0;


function adicionar(event) {
    event.preventDefault();

    let tabela = document.getElementById("main-table");
    let item = document.getElementById("tarefa").value.trim();

    if (!item) {
        alertadd(4);
        return;
    }

    idconter++;
    let linha = `<tr style="text-align: center">
        <td class="fs-4">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" checked onchange="switchch(this)">
            </div>
        </td>
        <td class="fs-4">${idconter}</td>
        <td class="fs-4">${item}</td>
        <td>
            <button type="button" class="btn btn-info col-4 fs-5" data-bs-toggle="modal"
            data-bs-target="#Modaledit" onclick="abrirModal(this)">Editar</button>
            <button type="button" class="btn btn-danger col-6 fs-5" data-bs-toggle="modal"
            data-bs-target="#Modaldelete" onclick="Remover(this)">Remover</button>
        </td>
    </tr>`;

    tabela.insertAdjacentHTML("beforeend", linha);
    document.getElementById("tarefa").value = "";
    document.getElementById("tarefa").focus();
    alertadd(1)
};

function switchch(checkbox) {

    let linha = checkbox.closest("tr");
    let tds = linha.querySelectorAll("td");
    let botoes = linha.querySelectorAll("button");


    if (checkbox.checked) {

        tds.forEach(td => {td.style.backgroundColor = ""; td.style.color = ""});
        botoes.forEach(btn => btn.disabled = false);
        valores.push(tds,botoes)

    } else {
        tds.forEach(td =>{ td.style.backgroundColor = "#b9b5b5"; td.style.color = "#888"});
        botoes.forEach(btn => btn.disabled = true);

    }
}

function abrirModal(botao) {

    let linha = botao.closest("tr");
    document.querySelectorAll("tr.editando").forEach(tr => tr.classList.remove("editando"));
    linha.classList.add("editando");

    var item = linha.querySelectorAll("td")[2].textContent.trim();
    document.getElementById("nomeedit").value = item;
}

function SalvaEdit() {
    let novoValor = document.getElementById("nomeedit").value.trim();

    let linha = document.querySelector("tr.editando");

    if (linha && novoValor) {
        linha.querySelectorAll("td")[2].textContent = novoValor;
        linha.classList.remove("editando");
    }

    let modal = bootstrap.Modal.getInstance(document.getElementById('Modaledit'));
    if (modal) modal.hide();

    // Reatribuir foco
    document.getElementById("tarefa").focus();

    alertadd(2);
}

let linharemove = null;

function Remover(botao) {

    linharemove = botao.closest("tr");
    console.log(linharemove);
    return linharemove;
}

function confremover() {
    let modal = bootstrap.Modal.getInstance(document.getElementById('Modaldelete'));
    if (modal) modal.hide();

    if (linharemove) {
        linharemove.remove();
        linharemove = null;
        cachetable();
    }

    // Reatribuir foco
    document.getElementById("tarefa").focus();
    alertadd(3);
}


// Funçoes para salvar a tabela no localStorage

    function cachetable(){
      localStorage.setItem("loadtable", tabela.innerHTML);
      localStorage.setItem("idtable", idconter)
      localStorage.setItem("check",switchch)
    }

    function loadtable(){
    const newtable = localStorage.getItem("loadtable");
    const newidcontr = localStorage.getItem("idtable");

    document.getElementById("tarefa").focus()

    if(newtable){
        tabela.innerHTML = newtable;
        reatribuirEventos(); // <-- Adicione esta linha
    }
    if(newidcontr){
        idconter = newidcontr;
    }

    }

    tabela.addEventListener('input', cachetable);
;
    window.addEventListener('DOMContentLoaded', loadtable);

    function reatribuirEventos() {
        document.querySelectorAll('button[data-bs-target="#Modaldelete"]').forEach(btn => {
            btn.onclick = function() { Remover(this); };
        });
    }


function alertadd(valor){
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
            mensagem = "Tarefa registrada";
            break;
        case 2:
            cor = "info";
            mensagem = "Tarefa Editada";
            break;
        case 3:
            cor = "danger";
            mensagem = "Tarefa Excluida";
            break;
        case 4:
            cor = "dark";
            mensagem = "Digite um item para cadastrar";
            break;
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
    }, 2000);




}
