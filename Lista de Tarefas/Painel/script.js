const form = document.getElementById("form-add");
const lista = document.getElementById("listaItens");
let ContadorID = 1;
let ContadorLivros = 0;
let ContadorElet = 0;
let ContadorPapel = 0;
let ContadorUtili = 0;



form.addEventListener("submit", function (event) {
  event.preventDefault(); // impede o recarregamento

  const nome = document.getElementById("item-name").value;
  const categoriaValor = document.getElementById("drop-down").value;
  let categoria = "";


  switch (categoriaValor) {
    case "L":
      categoria = "Livros";
      ContadorLivros++;
      break;
    case "E":
      categoria = "Eletrônicos";
      ContadorElet++;
      break;
    case "P":
      categoria = "Papelaria";
      ContadorPapel++;
      break;
    case "U":
      categoria = "Utilidades";
      ContadorUtili++;
      break;
    default:
      categoria = "Desconhecido";
  }

  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td class='fs-2 text-center'>${ContadorID}</td>
    <td class='fs-2 text-center'><strong>${nome}</strong></td>
    <td class='fs-2 text-center'>${categoria}</td>
    <td class="text-center">
        <button class="btn btn-info btn-sm fs-4" style="color: aliceblue;" data-bs-toggle="modal" data-bs-target="#btnEditM"
        data-bs-toggle="tooltip" title="Edita o Item"><i class="bi bi-pen"></i></button>
        <button class="btn btn-danger btn-sm fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal"
        data-bs-toggle="tooltip" title="Excluir o Item"><i class="bi bi-trash-fill"></i></button>
    </td>
    `;
  lista.appendChild(novaLinha);

  document.getElementById("item-id").innerHTML = ContadorID;
  ContadorID++;
  form.reset();

  document.getElementById('di1').innerHTML= ContadorLivros
  document.getElementById('di2').innerHTML= ContadorElet
  document.getElementById('di3').innerHTML= ContadorPapel
  document.getElementById('di4').innerHTML= ContadorUtili
  addAlert(1);

});

let linhaEditando = null;

// Ao clicar no botão de editar na tabela
lista.addEventListener("click", function (event) {
  // Verifica se clicou no botão de editar (ícone de lápis)
  if (
    event.target.closest("button") &&
    event.target.closest("button").classList.contains("btn-info")
  ) {
    linhaEditando = event.target.closest("tr");
    // Preenche o modal com os dados da linha
    document.getElementById("item-id-edit").value = linhaEditando.children[0].innerText.trim();
    document.getElementById("recipient-name").value = linhaEditando.children[1].innerText.trim();
    // Seleciona a categoria correta
    const categoriaTexto = linhaEditando.children[2].innerText.trim();
    let select = document.getElementById("drop-down-edit");
    for (let opt of select.options) {
      opt.selected = false;
      if (
        (categoriaTexto === "Livros" && opt.value === "L") ||
        (categoriaTexto === "Eletrônicos" && opt.value === "E") ||
        (categoriaTexto === "Papelaria" && opt.value === "P") ||
        (categoriaTexto === "Utilidades" && opt.value === "U")
      ) {
        opt.selected = true;
      }
    }
  }
});

// Ao clicar no botão "Editar" do modal
document.querySelector('#btnEditM .btn-info').addEventListener("click", function () {
  if (linhaEditando) {
    // Atualiza o nome
    linhaEditando.children[1].innerText = document.getElementById("recipient-name").value;
    // Atualiza a categoria e os contadores
    const select = document.getElementById("drop-down-edit");
    let categoriaAntiga = linhaEditando.children[2].innerText.trim();
    let categoriaNova = "";
    switch (select.value) {
      case "L":
        categoriaNova = "Livros";
        break;
      case "E":
        categoriaNova = "Eletrônicos";
        break;
      case "P":
        categoriaNova = "Papelaria";
        break;
      case "U":
        categoriaNova = "Utilidades";
        break;
      default:
        categoriaNova = "";
    }

    // Ajusta os contadores se mudou de categoria
    if (categoriaAntiga !== categoriaNova) {
      switch (categoriaAntiga) {
        case "Livros":
          ContadorLivros--;
          break;
        case "Eletrônicos":
          ContadorElet--;
          break;
        case "Papelaria":
          ContadorPapel--;
          break;
        case "Utilidades":
          ContadorUtili--;
          break;
      }
      switch (categoriaNova) {
        case "Livros":
          ContadorLivros++;
          break;
        case "Eletrônicos":
          ContadorElet++;
          break;
        case "Papelaria":
          ContadorPapel++;
          break;
        case "Utilidades":
          ContadorUtili++;
          break;
      }
    }

    document.getElementById('di1').innerHTML = ContadorLivros;
    document.getElementById('di2').innerHTML = ContadorElet;
    document.getElementById('di3').innerHTML = ContadorPapel;
    document.getElementById('di4').innerHTML = ContadorUtili;

    linhaEditando.children[2].innerText = categoriaNova;
    linhaEditando = null;

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("btnEditM"));
    modal.hide();
    addAlert(2);
  }
});


  let linhaParaRemover = null;

// Ao clicar no botão Remover na tabela
lista.addEventListener("click", function (event) {
  const btn = event.target.closest("button.btn-danger");
  if (btn) {
    linhaParaRemover = btn.closest("tr");
  }
});

// Ao clicar no botão "Sim eu tenho certeza" do modal
document.querySelector('#deletconf').addEventListener("click", function () {
  if (linhaParaRemover) {
    const categoria = linhaParaRemover.children[2].innerText.trim();
    switch (categoria) {
      case "Livros":
        ContadorLivros--;
        break;
      case "Eletrônicos":
        ContadorElet--;
        break;
      case "Papelaria":
        ContadorPapel--;
        break;
      case "Utilidades":
        ContadorUtili--;
        break;
    }
    document.getElementById('di1').innerHTML = ContadorLivros;
    document.getElementById('di2').innerHTML = ContadorElet;
    document.getElementById('di3').innerHTML = ContadorPapel;
    document.getElementById('di4').innerHTML = ContadorUtili;

    linhaParaRemover.remove();
    addAlert(3);
    linhaParaRemover = null;
  }
});

// Ao abrir o modal de adicionar, mostrar o próximo ID
document.querySelector('[data-bs-target="#btnAddM"]').addEventListener('click', function () {
  document.getElementById("item-id").value = ContadorID;
  // Limpa os outros campos se necessário
  document.getElementById("item-name").value = "";
  document.getElementById("drop-down").value = "";
});

// Exportar e importar

document.getElementById("exportar").addEventListener("click", function () {
  const itens = [];

  /* lista.querySelectorAll('li').forEach(li => {
    const nome = li.querySelector('strong')?.textContent;
    const categoria = li.querySelector('em')?.textContent.replace(/[()]/g, ''); */

  lista.querySelectorAll("tr").forEach((linha) => {
    const id = linha.children[0]?.textContent.trim();
    const nome = linha.children[1]?.textContent.trim();
    const categoria = linha.children[2]?.textContent.trim();

    itens.push({id, nome, categoria });
  });

  const json = JSON.stringify(itens, null, 2); // transforma em JSON formatado
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "catalogo.json";
  link.click();
});

document.getElementById("botaoImportar").addEventListener("click", function () {
  document.getElementById("inputImportar").click(); // força o clique no input invisível
});

document
  .getElementById("inputImportar")
  .addEventListener("change", function (event) {
    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function (e) {
      const conteudo = e.target.result;
      try {
        const dados = JSON.parse(conteudo);

        lista.innerHTML = ""; // limpa a lista atual

        /* dados.forEach(item => {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = `
          <strong>${item.nome}</strong> <em>(${item.categoria})</em>
          <button class="editar">Editar</button>
          <button class="remover">Remover</button>
        `;
        lista.appendChild(novoItem);
      });
 */

      lista.innerHTML = ""; // limpa a lista atual

      // Zera os contadores antes de somar os importados
      ContadorLivros = 0;
      ContadorElet = 0;
      ContadorPapel = 0;
      ContadorUtili = 0;

      // Soma os contadores conforme as categorias importadas
      dados.forEach((item) => {
        switch (item.categoria) {
          case "Livros":
            ContadorLivros++;
            break;
          case "Eletrônicos":
            ContadorElet++;
            break;
          case "Papelaria":
            ContadorPapel++;
            break;
          case "Utilidades":
            ContadorUtili++;
            break;
        }
      });

      // Atualiza os valores na tela
      document.getElementById("di1").innerHTML = ContadorLivros;
      document.getElementById("di2").innerHTML = ContadorElet;
      document.getElementById("di3").innerHTML = ContadorPapel;
      document.getElementById("di4").innerHTML = ContadorUtili;


        dados.forEach((item) => {

          const novaLinha = document.createElement("tr");
          novaLinha.innerHTML = `
          <td>${item.id}</td>
          <td><strong>${item.nome}</strong></td>
          <td><em>${item.categoria}</em></td>
          <td>
            <button class="btn btn-info btn-sm fs-4" style="color: aliceblue;" data-bs-toggle="tootip" data-bs-target="#btnEditM"
             title="Editar o Item"><i class="bi bi-pen"></i></button>
            <button class="btn btn-danger btn-sm fs-4" data-bs-toggle="tooltip" data-bs-target="#exampleModal"
             title="Excluir o Item"><i class="bi bi-trash-fill"></i></button>
          </td>
        `;
          lista.appendChild(novaLinha);
        });
      } catch (erro) {
        alert("Erro ao ler o arquivo JSON.");
      }
    };

    leitor.readAsText(arquivo);
  });


  function Filter() {
    let filtro = document.getElementById("filter").value;
    let linhas = document.querySelectorAll("#listaItens tr");

    linhas.forEach((tr) => {
      let categoria = tr.cells[2].innerText.trim();
      tr.style.display = filtro === "" || categoria === filtro ? "" : "none";
    });
  }

  function FilterLivro() {
    let filtro = document.getElementById("filter").value;
    let linhas = document.querySelectorAll("#listaItens tr");

    linhas.forEach((tr) => {
      let categoria = tr.cells[2].innerText.trim();
      tr.style.display = filtro === "" || categoria === "Livros" ? "" : "none";
    });
  }

  function FilterEletro() {
    let filtro = document.getElementById("filter").value;
    let linhas = document.querySelectorAll("#listaItens tr");

    linhas.forEach((tr) => {
      let categoria = tr.cells[2].innerText.trim();
      tr.style.display =
        filtro === "" || categoria === "Eletrônicos" ? "" : "none";
    });
  }

  function FilterPapel() {
    let filtro = document.getElementById("filter").value;
    let linhas = document.querySelectorAll("#listaItens tr");

    linhas.forEach((tr) => {
      let categoria = tr.cells[2].innerText.trim();
      tr.style.display =
        filtro === "" || categoria === "Papelaria" ? "" : "none";
    });
  }

  function FilterUtili() {
    let filtro = document.getElementById("filter").value;
    let linhas = document.querySelectorAll("#listaItens tr");

    linhas.forEach((tr) => {
      let categoria = tr.cells[2].innerText.trim();
      tr.style.display =
        filtro === "" || categoria === "Utilidades" ? "" : "none";
    });
  }




  function addAlert(valve){
    var color = "";
    var text = "";
    /*
      1 = Adicionar
      2 = Editar
      3 = Excluir
    */
    switch(valve){
      case 1:
        color = 'success';
        text = 'Item Cadastrado com Sucesso';
        break;
      case 2:
        color = 'info';
        text = 'Edição foi Salva';
        break;
      case 3:
        color = 'danger';
        text = 'O item foi excluido';
        break;
      default:
        break;
    };

    var mensage =`
    <div class="alert alert-${color} p-3 alert-dismissible fade show" role="alert"
    style=" position: fixed; z-index: 5; margin: 0;">
      <h4>${text}</h4>
    </div>`;

    // Adiciona o alerta e pega referência ao elemento criado
    document.getElementById('alert').insertAdjacentHTML('beforeend', mensage);
    var alertas = document.querySelectorAll('#alert .alert');
    var alertaAtual = alertas[alertas.length - 1];

    // Remove o alerta após 3 segundos (3000 ms)
    setTimeout(function() {
      if (alertaAtual) {
        alertaAtual.classList.remove('show');
        alertaAtual.classList.add('hide');
        setTimeout(function() {
          if (alertaAtual.parentNode) {
            alertaAtual.parentNode.removeChild(alertaAtual);
          }
        }, 500); // tempo para animação fade out
      }
    }, 2000);
  }
