// Função para enviar os dados do formulário de cadastro de aluno
async function enviaFormularioAluno() {
    // Recupera os valores do formulário e cria o objeto JSON
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "dataNascimento": document.querySelectorAll("input")[1].value,
        "endereco": document.querySelectorAll("input")[2].value,
        "email": document.querySelectorAll("input")[3].value
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para recuperar a lista de alunos do servidor
async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos");

        if (respostaServidor.ok) {
            const listaAlunos = await respostaServidor.json();
            criarTabelaAlunos(listaAlunos);
        } else {
            throw new Error("Erro ao recuperar a lista de alunos.");
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para criar a tabela com a lista de alunos
function criarTabelaAlunos(alunos) {
    try {
        const tBody = document.querySelector("tbody");
        tBody.innerHTML = ""; // Limpa o corpo da tabela antes de renderizar

        alunos.forEach(aluno => {
            const tr = document.createElement("tr");

            const tdNome = document.createElement("td");
            tdNome.textContent = aluno.nome;
            tr.appendChild(tdNome);

            const tdDataNascimento = document.createElement("td");
            tdDataNascimento.textContent = aluno.dataNascimento;
            tr.appendChild(tdDataNascimento);

            const tdEndereco = document.createElement("td");
            tdEndereco.textContent = aluno.endereco;
            tr.appendChild(tdEndereco);

            const tdEmail = document.createElement("td");
            tdEmail.textContent = aluno.email;
            tr.appendChild(tdEmail);

            const tdAcoes = document.createElement("td");

            // Botão Editar
            const imgEditar = document.createElement("img");
            imgEditar.src = "./assets/icons/pencil-square.svg";
            imgEditar.alt = "Editar";
            imgEditar.style.cursor = "pointer";
            imgEditar.onclick = () => editarAluno(aluno.idAluno);
            tdAcoes.appendChild(imgEditar);

            // Botão Deletar
            const imgDeletar = document.createElement("img");
            imgDeletar.src = "./assets/icons/trash-fill.svg";
            imgDeletar.alt = "Deletar";
            imgDeletar.style.cursor = "pointer";
            imgDeletar.onclick = () => deletarAluno(aluno.idAluno);
            tdAcoes.appendChild(imgDeletar);

            tr.appendChild(tdAcoes);

            tBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para editar um aluno (exemplo básico)
async function editarAluno(idAluno) {
    alert(`Função de edição para o aluno com ID: ${idAluno} (a ser implementada).`);
}

// Função para deletar um aluno
async function deletarAluno(idAluno) {
    try {
        const respostaServidor = await fetch(`http://localhost:3333/deletar/aluno/${idAluno}`, {
            method: 'DELETE'
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao deletar o aluno.");
        }

        alert("Aluno deletado com sucesso!");
        recuperarListaAlunos(); // Atualiza a tabela
    } catch (error) {
        console.error(error);
        alert(`Erro ao deletar o aluno. ${error}`);
    }
}


