// Função para enviar os dados do formulário
async function enviaFormularioLivro() {
    // Recupera as informações do formulário e cria um objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "isbn": document.querySelectorAll("input")[3].value,
        "statusLivro": document.querySelectorAll("input")[4].value
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para recuperar a lista de livros do servidor
async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/livros");

        if (respostaServidor.ok) {
            const listaLivros = await respostaServidor.json();
            criarTabelaLivros(listaLivros);
        } else {
            throw new Error("Erro ao recuperar a lista de livros.");
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para criar a tabela com a lista de livros
async function criarTabelaLivros(livros) {
    try {
        const tBody = document.querySelector("tbody");
        tBody.innerHTML = ""; // Limpa o corpo da tabela antes de renderizar

        livros.forEach(livro => {
            const tr = document.createElement("tr");

            const tdTitulo = document.createElement("td");
            tdTitulo.textContent = livro.titulo;
            tr.appendChild(tdTitulo);

            const tdAutor = document.createElement("td");
            tdAutor.textContent = livro.autor;
            tr.appendChild(tdAutor);

            const tdEditora = document.createElement("td");
            tdEditora.textContent = livro.editora;
            tr.appendChild(tdEditora);

            const tdIsbn = document.createElement("td");
            tdIsbn.textContent = livro.isbn;
            tr.appendChild(tdIsbn);

            const tdStatus = document.createElement("td");
            tdStatus.textContent = livro.statusLivro;
            tr.appendChild(tdStatus);

            const tdAcoes = document.createElement("td");

            // Botão Editar
            const imgEditar = document.createElement("img");
            imgEditar.src = "./assets/icons/pencil-square.svg";
            imgEditar.alt = "Editar";
            imgEditar.style.cursor = "pointer";
            imgEditar.onclick = () => editarLivro(livro.idLivro);
            tdAcoes.appendChild(imgEditar);

            // Botão Deletar
            const imgDeletar = document.createElement("img");
            imgDeletar.src = "./assets/icons/trash-fill.svg";
            imgDeletar.alt = "Deletar";
            imgDeletar.style.cursor = "pointer";
            imgDeletar.onclick = () => deletarLivro(livro.idLivro);
            tdAcoes.appendChild(imgDeletar);

            tr.appendChild(tdAcoes);

            tBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para editar um livro (exemplo básico)
async function editarLivro(idLivro) {
    alert(`Função de edição para o livro com ID: ${idLivro} (a ser implementada).`);
}

// Função para deletar um livro (exemplo básico)
async function deletarLivro(idLivro) {
    try {
        const respostaServidor = await fetch(`http://localhost:3333/deletar/livro/${idLivro}`, {
            method: 'DELETE'
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao deletar o livro.");
        }

        alert("Livro deletado com sucesso!");
        recuperarListaLivros(); // Atualiza a tabela
    } catch (error) {
        console.error(error);
        alert(`Erro ao deletar o livro. ${error}`);
    }
}
