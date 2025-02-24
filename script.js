// Lista de serviços disponíveis (simulação)
const servicos = [
    { titulo: "Aula de Violão", descricao: "Aulas para iniciantes e intermediários.", categoria: "Música" },
    { titulo: "Corte de Cabelo", descricao: "Cortes modernos e clássicos.", categoria: "Beleza" },
    { titulo: "Conserto de Encanamento", descricao: "Reparos em geral.", categoria: "Reparos" },
    { titulo: "Aula de Inglês", descricao: "Aulas para iniciantes.", categoria: "Educação" },
    { titulo: "Jardinagem", descricao: "Cuidados com plantas e jardins.", categoria: "Serviços Domésticos" },
];

// Função para exibir os serviços na lista
function exibirServicos(servicosFiltrados) {
    const listaServicos = document.getElementById("listaServicos");
    listaServicos.innerHTML = ""; // Limpa a lista antes de exibir

    if (servicosFiltrados.length === 0) {
        listaServicos.innerHTML = "<p>Nenhum serviço encontrado.</p>";
        return;
    }

    servicosFiltrados.forEach(servico => {
        const item = document.createElement("div");
        item.classList.add("servico");
        item.innerHTML = `
            <div>
                <h3>${servico.titulo}</h3>
                <p>${servico.descricao}</p>
                <span><strong>Categoria:</strong> ${servico.categoria}</span>
            </div>
            <button onclick="abrirAgendamento('${servico.titulo}')">Solicitar</button>
        `;
        listaServicos.appendChild(item);
    });
}

// Função para filtrar serviços
function filtrarServicos() {
    const filtro = document.getElementById("filtro").value.toLowerCase();
    const servicosFiltrados = servicos.filter(servico => 
        servico.titulo.toLowerCase().includes(filtro) || 
        servico.descricao.toLowerCase().includes(filtro) ||
        servico.categoria.toLowerCase().includes(filtro)
    );
    exibirServicos(servicosFiltrados);
}

// Função para abrir a tela de agendamento
function abrirAgendamento(titulo) {
    const telaAgendamento = document.getElementById("telaAgendamento");
    telaAgendamento.style.display = "flex"; // Exibe a tela
    document.getElementById("formAgendamento").dataset.servico = titulo; // Armazena o título do serviço
}

// Função para fechar a tela de agendamento
function fecharAgendamento() {
    const telaAgendamento = document.getElementById("telaAgendamento");
    telaAgendamento.style.display = "none"; // Oculta a tela
}

// Função para confirmar o agendamento
document.getElementById("formAgendamento").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const servico = this.dataset.servico; // Recupera o título do serviço

    if (!data || !hora) {
        alert("Por favor, preencha a data e a hora.");
        return;
    }

    alert(`Agendamento confirmado!\nServiço: ${servico}\nData: ${data}\nHora: ${hora}`);
    fecharAgendamento(); // Fecha a tela após o agendamento
});

// Exibe todos os serviços ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const formAgendamento = document.getElementById("formAgendamento");
    
    if (formAgendamento) { // Verifica se o formulário existe
        formAgendamento.addEventListener("submit", function(event) {
            event.preventDefault();
            // Restante do código...
        });
    } else {
        console.error("Formulário 'formAgendamento' não encontrado!");
    }
});

// Busca em tempo real
document.getElementById("filtro").addEventListener("input", () => {
    filtrarServicos();
});

/// Função para validar e salvar o cadastro
function validarCadastro(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const habilidades = document.getElementById('habilidades').value;
    const servicos = document.getElementById('servicos').value;

    // Validação simples
    if (!nome || !email || !habilidades || !servicos) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Cria um objeto com os dados do usuário
    const usuario = {
        nome,
        email,
        telefone,
        endereco,
        habilidades,
        servicos,
        horasAcumuladas: 0, // Inicializa as horas acumuladas
        horasUtilizadas: 0  // Inicializa as horas utilizadas
    };

    // Salva os dados no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redireciona para a página de perfil
    window.location.href = "perfil.html";
}
// Função para carregar os dados do perfil
function carregarPerfil() {
    // Recupera os dados do localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        alert("Nenhum usuário cadastrado.");
        window.location.href = "cadastro.html";
        return;
    }

    // Preenche os campos do perfil
    document.getElementById('nomeUsuario').textContent = usuario.nome;
    document.getElementById('emailUsuario').textContent = usuario.email;
    document.getElementById('telefoneUsuario').textContent = usuario.telefone;
    document.getElementById('enderecoUsuario').textContent = usuario.endereco;
    document.getElementById('habilidadesUsuario').textContent = usuario.habilidades;
    document.getElementById('servicosUsuario').textContent = usuario.servicos;
    document.getElementById('horasAcumuladas').textContent = usuario.horasAcumuladas;
    document.getElementById('horasUtilizadas').textContent = usuario.horasUtilizadas;
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarPerfil);
