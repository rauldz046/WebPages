// Definido variaveis globais
var idconter = 0;

function adicionar(event) {
    event.preventDefault();

    let tabela = document.getElementById("main-table");
    let item = document.getElementById("tarefa").value.trim();

    if (!item) {
        alert('Adicione um item');
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
            data-bs-target="#Modaldelete">Remover</button>
        </td>
    </tr>`;

    tabela.insertAdjacentHTML("beforeend", linha);

    document.getElementById("tarefa").value = "";
};

function switchch(checkbox) {
    
    let linha = checkbox.closest("tr");
    let tds = linha.querySelectorAll("td"); 
    let botoes = linha.querySelectorAll("button");

    if (checkbox.checked) {
         
        tds.forEach(td => {td.style.backgroundColor = ""; td.style.color = ""}); 
        botoes.forEach(btn => btn.disabled = false);      
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
}


function Remover(botao){

    let linha = botao.closest("tr");
    if (linha) linha.remove();
     
    
    let modal = bootstrap.Modal.getInstance(document.getElementById('Modaldelete'));
    if (modal) modal.hide();

}



