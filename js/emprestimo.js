// Função para enviar os dados do formulário de cadastro de empréstimo
async function enviaFormularioEmprestimo() {
    // Recupera os valores do formulário e cria o objeto JSON
    const emprestimoDTO = {
        "idAluno": document.querySelectorAll("input")[0].value,
        "idLivro": document.querySelectorAll("input")[1].value,
        "dataEmprestimo": document.querySelectorAll("input")[2].value,
        "dataDevolucao": document.querySelectorAll("input")[3].value
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        alert("Empréstimo cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para recuperar a lista de empréstimos do servidor
async function recuperarListaEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimo");

        if (respostaServidor.ok) {
            const listaEmprestimos = await respostaServidor.json();
            criarTabelaEmprestimos(listaEmprestimos);
        } else {
            throw new Error("Erro ao recuperar a lista de empréstimos.");
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para criar a tabela com a lista de empréstimos
function criarTabelaEmprestimos(emprestimos) {
    try {
        const tBody = document.querySelector("tbody");
        tBody.innerHTML = ""; // Limpa o corpo da tabela antes de renderizar

        emprestimos.forEach(emprestimo => {
            const tr = document.createElement("tr");

            const tdIdAluno = document.createElement("td");
            tdIdAluno.textContent = emprestimo.idAluno;
            tr.appendChild(tdIdAluno);

            const tdIdLivro = document.createElement("td");
            tdIdLivro.textContent = emprestimo.idLivro;
            tr.appendChild(tdIdLivro);

            const tdDataEmprestimo = document.createElement("td");
            tdDataEmprestimo.textContent = emprestimo.dataEmprestimo;
            tr.appendChild(tdDataEmprestimo);

            const tdDataDevolucao = document.createElement("td");
            tdDataDevolucao.textContent = emprestimo.dataDevolucao;
            tr.appendChild(tdDataDevolucao);

            const tdAcoes = document.createElement("td");

            // Botão Editar
            const imgEditar = document.createElement("img");
            imgEditar.src = "./assets/icons/pencil-square.svg";
            imgEditar.alt = "Editar";
            imgEditar.style.cursor = "pointer";
            imgEditar.onclick = () => editarEmprestimo(emprestimo.idEmprestimo);
            tdAcoes.appendChild(imgEditar);

            // Botão Deletar
            const imgDeletar = document.createElement("img");
            imgDeletar.src = "./assets/icons/trash-fill.svg";
            imgDeletar.alt = "Deletar";
            imgDeletar.style.cursor = "pointer";
            imgDeletar.onclick = () => deletarEmprestimo(emprestimo.idEmprestimo);
            tdAcoes.appendChild(imgDeletar);

            tr.appendChild(tdAcoes);

            tBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para editar um empréstimo (exemplo básico)
async function editarEmprestimo(idEmprestimo) {
    alert(`Função de edição para o empréstimo com ID: ${idEmprestimo} (a ser implementada).`);
}

// Função para deletar um empréstimo
async function deletarEmprestimo(idEmprestimo) {
    try {
        const respostaServidor = await fetch(`http://localhost:3333/deletar/emprestimo/${idEmprestimo}`, {
            method: 'DELETE'
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao deletar o empréstimo.");
        }

        alert("Empréstimo deletado com sucesso!");
        recuperarListaEmprestimos(); // Atualiza a tabela
    } catch (error) {
        console.error(error);
        alert(`Erro ao deletar o empréstimo. ${error}`);
    }
}
