// Definido variaveis globais
var idconter = 0;
var tarefasTotaisId = 0;
var tarefasConcluidasId = 0;
var tarefasPendetesId = 0;
let linharemove = null;
let dark = false;
const tabela = document.getElementById("main-table")


 // Cofigurações globais
let total = document.getElementById("cont")
total.innerHTML= tarefasTotaisId;

let conlcuidas = document.getElementById("done");
conlcuidas.innerHTML = tarefasConcluidasId;

let pendentes = document.getElementById("open");
pendentes .innerHTML = tarefasPendetesId;

loginconfig()

tabela.addEventListener('input', cachetable);
window.addEventListener('DOMContentLoaded', loadtable);


 // Funçoes Principais
function adicionar(event) {
    event.preventDefault();

    let total = document.getElementById("cont");
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
                <input class="form-check-input" type="checkbox"
                checked onchange="switchch(this)">
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

    tarefasTotaisId++;
    total.innerHTML= tarefasTotaisId;
    localStorage.setItem("total",tarefasTotaisId);

    tarefasPendetesId++;
    pendentes.innerHTML = tarefasPendetesId;
    localStorage.setItem("pendentes",tarefasPendetesId)
    alertadd(1)

};

function switchch(checkbox) {

    let linha = checkbox.closest("tr");
    let tds = linha.querySelectorAll("td");
    let botoes = linha.querySelectorAll("button");

    if (checkbox.checked) {
        //Tarefa Ativa
        tds.forEach(td => {td.style.backgroundColor = "";
            td.style.color = ""});
        botoes.forEach(btn => btn.disabled = false);

        tarefasConcluidasId--;
        if(tarefasConcluidasId < 0) tarefasConcluidasId = 0;

        tarefasPendetesId++;
    }

         //Tarefa Concluida
    else {
        tds.forEach(td =>{ td.style.backgroundColor = "#505050";
        td.style.color = "#888"});
        botoes.forEach(btn => btn.disabled = true);

        tarefasConcluidasId++;


        tarefasPendetesId--;
        if(tarefasPendetesId < 0) tarefasPendetesId = 0;
    }

    conlcuidas.innerHTML = tarefasConcluidasId
    localStorage.setItem("concluidas",tarefasConcluidasId);

    pendentes.innerHTML = tarefasPendetesId;
    localStorage.setItem("pendentes",tarefasPendetesId);
    cachetable();

}

function abrirModal(botao) {

    let linha = botao.closest("tr");
    document.querySelectorAll("tr.editando").forEach
    (tr => tr.classList.remove("editando"));
    linha.classList.add("editando");

    var item = linha.querySelectorAll("td")[2]
    .textContent.trim();
    document.getElementById("nomeedit").value = item;
}

function SalvaEdit() {
    let novoValor = document.getElementById("nomeedit")
    .value.trim();

    let linha = document.querySelector("tr.editando");

    if (linha && novoValor) {
        linha.querySelectorAll("td")[2].textContent = novoValor;
        linha.classList.remove("editando");
    }

    let modal = bootstrap.Modal.getInstance
    (document.getElementById('Modaledit'));
    if (modal) modal.hide();

    // Reatribuir foco
    document.getElementById("tarefa").focus();

    alertadd(2);
}

function Remover(botao) {
    linharemove = botao.closest("tr");
    console.log(linharemove);
    return linharemove;
}

function confremover() {
    let total = document.getElementById("cont")
    let modal = bootstrap.Modal.getInstance
    (document.getElementById('Modaldelete'));

    if (modal) modal.hide();

    if (linharemove) {
        linharemove.remove();
        linharemove = null;
        cachetable();
    }


    tarefasTotaisId--;
    if(tarefasTotaisId < 0) tarefasTotaisId = 0;
    total.innerHTML= tarefasTotaisId;
    localStorage.setItem("total",tarefasTotaisId)

    tarefasPendetesId--;
    if(tarefasPendetesId < 0) tarefasPendetesId = 0;
    pendentes.innerHTML = tarefasPendetesId;
    localStorage.setItem("pendentes",tarefasPendetesId);

    cachetable();

    document.getElementById("tarefa").focus();
    alertadd(3);
}

// Funçoes para salvar a tabela no localStorage

function cachetable(){
      localStorage.setItem("loadtable", tabela.innerHTML);
      localStorage.setItem("idtable", idconter);
      localStorage.setItem("check",switchch);
      localStorage.setItem("total",tarefasTotaisId);
      localStorage.setItem("concluidas",tarefasConcluidasId);
      localStorage.setItem("pendentes",tarefasPendetesId);

       const checkboxStates = [];
        document.querySelectorAll
        ('input.form-check-input[type="checkbox"]').forEach(cb => {
        checkboxStates.push(cb.checked);
    });
    localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}

function loadtable() {
    const newtable = localStorage.getItem("loadtable");
    const newidcontr = localStorage.getItem("idtable");
    const newtotal = localStorage.getItem("total");
    const newconcluidas = localStorage.getItem("concluidas");
    const newpendentes = localStorage.getItem("pendentes");
    const checkboxStates = JSON.parse(localStorage.getItem("checkboxStates") || "[]");

    document.getElementById("tarefa").focus();

    if (newtable) {
        tabela.innerHTML = newtable;
        reatribuirEventos();

        // Aplicar estados dos checkboxes
        const checkboxes = document.querySelectorAll
        ('input.form-check-input[type="checkbox"]');
            checkboxes.forEach((cb, index) => {
                if (typeof checkboxStates[index] !== "undefined") {
                cb.checked = checkboxStates[index];
                aplicarEstiloCheckbox(cb); // <- só estilo
            }
            });
    }

    if (newidcontr) {
        idconter = parseInt(newidcontr);
    }

    if (newtotal) {
        tarefasTotaisId = parseInt(newtotal);
        total.innerHTML = tarefasTotaisId;
    }

    if (newconcluidas) {
        tarefasConcluidasId = parseInt(newconcluidas);
        conlcuidas.innerHTML = tarefasConcluidasId;
    }

    if (newpendentes) {
        tarefasPendetesId = parseInt(newpendentes);
        pendentes.innerHTML = tarefasPendetesId;
    }
}

function reatribuirEventos() {
    // Botão de deletar
    document.querySelectorAll
    ('button[data-bs-target="#Modaldelete"]').forEach
    (btn => { btn.onclick = function () { Remover(this); };

    });

    // Reconecta os checkboxes
    document.querySelectorAll
    ('input.form-check-input[type="checkbox"]').forEach
    (input => { input.onchange = function () { switchch(this);};
    });

}

function aplicarEstiloCheckbox(cb) {
    let linha = cb.closest("tr");
    let tds = linha.querySelectorAll("td");
    let botoes = linha.querySelectorAll("button");

    if (cb.checked) {
        tds.forEach(td => {
            td.style.backgroundColor = "";
            td.style.color = "";
        });
        botoes.forEach(btn => btn.disabled = false);
    } else {
        tds.forEach(td => {
            td.style.backgroundColor = "#505050";
            td.style.color = "#888";
        });
        botoes.forEach(btn => btn.disabled = true);
    }
}

 // Alertas
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

 // Configuração de Tema
function darkmode(){

let emoji = document.getElementById("emoji");
emoji.innerHTML = "☀️";

// Body
let body = document.getElementsByClassName("body");
for (let i = 0; i < body.length; i++) {
     body[i].className = "body-dark";
}

// Sidebar
let sidebar = document.getElementsByClassName("side-bar");
for (let i = 0; i < sidebar.length; i++) {
     sidebar[i].className = "sidebar-dark";
}

 // User profile
 let user = document.getElementsByClassName("user-perfile");
 for (let i = 0; i < user.length; i++) {
    user[i].className = "user-perfile-dark";
}

 // Input container
 let input = document.getElementsByClassName("inner-content");
 for (let i = 0; i < input.length; i++) {
    input[i].className = "inner-content-dark";
}

 // Tabela
 let tabela = document.getElementsByClassName
 ("table table-striped mt-5");

 for (let i = 0; i < tabela.length; i++) {
    tabela[i].className = "table-dark table table-striped mt-5";
 }
}

function lightmode(){
let emoji = document.getElementById("emoji");
emoji.innerHTML = "🌕";

// Body
let body = document.getElementsByClassName("body-dark");
for (let i = 0; i < body.length; i++) {
    body[i].className = "body";
}

// Sidebar
let sidebar = document.getElementsByClassName("sidebar-dark");
for (let i = 0; i < sidebar.length; i++) {
    sidebar[i].className = "side-bar";
}

// User profile
let user = document.getElementsByClassName("user-perfile-dark");
for (let i = 0; i < user.length; i++) {
   user[i].className = "user-perfile";
}

// Input container
let input = document.getElementsByClassName("inner-content-dark");
for (let i = 0; i < input.length; i++) {
    input[i].className = "inner-content";
}

// Tabela
let tabela = document.getElementsByClassName
("table-dark table table-striped mt-5");

for (let i = 0; i < tabela.length; i++) {
    tabela[i].className = "table table-striped mt-5";
 }
}

function toggleMode() {
    if (dark) {
        lightmode();
    } else {
        darkmode();
    }
    dark = !dark;
    localStorage.setItem("darkmode", dark ? "1" : "0");
}

window.addEventListener('DOMContentLoaded', function() {
    loadtable();
    // Restaura o modo escuro se estava ativo
    if (localStorage.getItem("darkmode") === "1") {
        dark = false; // Para garantir que toggleMode ative o darkmode
        toggleMode();
    }
});

//Configuração de Login
function loginconfig(){
let nome = localStorage.getItem("nome");
let nivel= localStorage.getItem("nivel");
let outnome = document.getElementById("username");
let outnivel= document.getElementById("lv");

outnome.innerHTML= nome;
outnivel.innerHTML= nivel;


}
