const form = document.getElementById("form-add");
const lista = document.getElementById("listaItens");
let ContadorID = 1;
let ContadorLivros = 0;
let ContadorElet = 0;
let ContadorPapel = 0;
let ContadorUtili = 0;


  // EVENTO DE ADICIONAR ITEM A LISTA
form.addEventListener("submit", function (event) {
  event.preventDefault();

    const nome = document.getElementById("item-name").value;
    const categoriaValor = document.getElementById("drop-down").value;
    let categoria = "";

    // Relacionar os Valores do Dropdown para os itens da lista e
    // Copntabiliza os id's individualmente
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

    // Cria um novo item na lista
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td class='fs-2 text-center'>${ContadorID}</td>
    <td class='fs-2 text-center'><strong>${nome}</strong></td>
    <td class='fs-2 text-center'>${categoria}</td>
    <td class="text-center">
        <button class="btn btn-info btn-sm fs-3" style="color: aliceblue;" data-bs-toggle="modal" data-bs-target="#btnEditM">Editar</button>
        <button class="btn btn-danger btn-sm fs-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Remover</button>
    </td>
    `;
  lista.appendChild(novaLinha);


  // adiciona o Id na listagem e faz seu incremento
  document.getElementById("item-id").innerHTML = ContadorID;
  ContadorID++;
  form.reset();

  // Realiza a checagem de qual item da lista foi adicionado
  // de acordo com cada contador individual
  document.getElementById('di1').innerHTML= ContadorLivros
  document.getElementById('di2').innerHTML= ContadorElet
  document.getElementById('di3').innerHTML= ContadorPapel
  document.getElementById('di4').innerHTML= ContadorUtili

});


    // EVENTO DE EDIÇÃO DOS ITENS DA LISTA
  let linhaEditando = null;

  document.getElementById("listaItens").addEventListener("click", function (event) {

    if (event.target.classList.contains("btn-info")) {
      linhaEditando = event.target.closest("tr");

      document.getElementById("recipient-name").value =
        linhaEditando.children[1].innerText.trim();
        document.getElementById("item-id-edit").value = linhaEditando.children[0].innerText.trim();

      // faz a cobferencia se os itens da lista são validos
      const categoriaTexto = linhaEditando.children[2].innerText.trim();
      const select = document.getElementById("drop-down-edit");
      for (let opt of select.options) {
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
      // Realiza a verificação se os itens do dropdown foram alterados
  document .querySelector("#btnEditM .btn-info") .addEventListener("click", function () {
    if (linhaEditando) {

      linhaEditando.children[1].innerText =
        document.getElementById("recipient-name").value;
      const select = document.getElementById("drop-down-edit");
      let categoriaAntiga = linhaEditando.children[2].innerText.trim();
      let categoriaNova = "";
      let mudouCategoria = false;

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

      // Se mudou de categoria, ajusta os contadores
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

      // Atuzaliza conforme a edição foi feita
      document.getElementById('di1').innerHTML = ContadorLivros;
      document.getElementById('di2').innerHTML = ContadorElet;
      document.getElementById('di3').innerHTML = ContadorPapel;
      document.getElementById('di4').innerHTML = ContadorUtili;

      linhaEditando.children[2].innerText = categoriaNova;
      linhaEditando = null;
      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("btnEditM")
      );
      modal.hide();
    }
  });

    // EVENTO DE REMOVER ITEM
  let linhaParaRemover = null;

lista.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-danger")) {
    linhaParaRemover = event.target.closest("tr");
  }
});


document.querySelector('#exampleModal .btn-danger').addEventListener("click", function () {
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
  link.download = "listagem_de_itens.json";
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

      // CORREÇÃO DO ERRO DE IMPORTAÇÃO DE CONTAGEM DOS ITENS

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
            <button class="btn btn-info btn-sm fs-3" style="color: aliceblue;" data-bs-toggle="modal" data-bs-target="#btnEditM">Editar</button>
            <button class="btn btn-danger btn-sm fs-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Remover</button>
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
