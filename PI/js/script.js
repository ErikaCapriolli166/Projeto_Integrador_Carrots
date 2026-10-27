// Menu para telas pequenas
const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", function () {
        menuPrincipal.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menuPrincipal.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    });
        });
    });
}

// Carrossel das fotos do produto
const fotos = document.querySelectorAll(".foto-carrossel");
const indicadores = document.querySelectorAll(".indicador");
const botaoAnterior = document.getElementById("foto-anterior");
const botaoProxima = document.getElementById("proxima-foto");
let fotoAtual = 0;

function mostrarFoto(numero) {
    if (fotos.length === 0) {
        return;
    }

    fotos[fotoAtual].classList.remove("ativa");
    if (indicadores[fotoAtual]) {
        indicadores[fotoAtual].classList.remove("ativo");
    }

    fotoAtual = numero;

    if (fotoAtual >= fotos.length) {
        fotoAtual = 0;
    }
    if (fotoAtual < 0) {
        fotoAtual = fotos.length - 1;
    }

    fotos[fotoAtual].classList.add("ativa");
    if (indicadores[fotoAtual]) {
        indicadores[fotoAtual].classList.add("ativo");
    }
}

if (fotos.length > 0 && botaoAnterior && botaoProxima) {
    botaoAnterior.addEventListener("click", function () {
        mostrarFoto(fotoAtual - 1);
    });

    botaoProxima.addEventListener("click", function () {
        mostrarFoto(fotoAtual + 1);
    });

    for (let i = 0; i < indicadores.length; i++) {
        indicadores[i].addEventListener("click", function () {
            mostrarFoto(i);
        });
    }
}

// Validação do formulário de contato e envio pelo WhatsApp
const formularioContato = document.getElementById("form-contato");
const mensagemContatoStatus = document.getElementById("mensagem-contato-status");
const telefoneWhatsApp = "5511999999999"; // Trocar pelo número oficial, com código do país e DDD.

if (formularioContato) {
    formularioContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioContato.checkValidity()) {
            formularioContato.reportValidity();
            return;
        }

        const nome = document.getElementById("nome-contato").value.trim();
        const email = document.getElementById("email-contato").value.trim();
        const assunto = document.getElementById("assunto-contato").value;
        const mensagem = document.getElementById("mensagem-contato").value.trim();

        if (nome.length < 2 || mensagem.length < 10) {
            mensagemContatoStatus.textContent = "Confira o nome e escreva uma mensagem com pelo menos 10 caracteres.";
            return;
        }

        const texto = "Olá! Meu nome é " + nome + ".\nE-mail: " + email + "\nAssunto: " + assunto + "\nMensagem: " + mensagem;
        const linkWhatsApp = "https://wa.me/" + telefoneWhatsApp + "?text=" + encodeURIComponent(texto);
        mensagemContatoStatus.textContent = "Abrindo o WhatsApp para você revisar e enviar a mensagem.";
        window.open(linkWhatsApp, "_blank");
    });
}

// Comentários e avaliações. Os dados ficam salvos neste navegador.
const formularioAvaliacao = document.getElementById("form-avaliacao");
const listaAvaliacoes = document.getElementById("lista-avaliacoes");
const semAvaliacoes = document.getElementById("sem-avaliacoes");
const chaveAvaliacoes = "carrots-avaliacoes";

function carregarAvaliacoes() {
    if (!listaAvaliacoes) {
        return;
    }

    const avaliacoesSalvas = JSON.parse(localStorage.getItem(chaveAvaliacoes) || "[]");
    listaAvaliacoes.innerHTML = "";

    if (avaliacoesSalvas.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "sem-avaliacoes";
        aviso.textContent = "Ainda não há avaliações. Seja a primeira pessoa a comentar!";
        listaAvaliacoes.appendChild(aviso);
        return;
    }

    for (let i = 0; i < avaliacoesSalvas.length; i++) {
        const avaliacao = avaliacoesSalvas[i];
        const cartao = document.createElement("article");
        cartao.className = "card-avaliacao";

        const nome = document.createElement("h3");
        nome.textContent = avaliacao.nome;
        const estrelas = document.createElement("p");
        estrelas.className = "estrelas";
        estrelas.textContent = "★".repeat(Number(avaliacao.nota)) + "☆".repeat(5 - Number(avaliacao.nota));
        const comentario = document.createElement("p");
        comentario.textContent = avaliacao.comentario;

        cartao.appendChild(nome);
        cartao.appendChild(estrelas);
        cartao.appendChild(comentario);
        listaAvaliacoes.appendChild(cartao);
    }
}

if (formularioAvaliacao) {
    carregarAvaliacoes();

    formularioAvaliacao.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioAvaliacao.checkValidity()) {
            formularioAvaliacao.reportValidity();
            return;
        }

        const nome = document.getElementById("nome-avaliacao").value.trim();
        const nota = document.getElementById("nota-avaliacao").value;
        const comentario = document.getElementById("comentario-avaliacao").value.trim();

        if (nome === "" || nota === "" || comentario.length < 5) {
            document.getElementById("mensagem-avaliacao").textContent = "Preencha todos os campos para enviar sua avaliação.";
            return;
        }

        const avaliacoesSalvas = JSON.parse(localStorage.getItem(chaveAvaliacoes) || "[]");
        avaliacoesSalvas.unshift({ nome: nome, nota: nota, comentario: comentario });
        localStorage.setItem(chaveAvaliacoes, JSON.stringify(avaliacoesSalvas));

        document.getElementById("mensagem-avaliacao").textContent = "Avaliação adicionada com sucesso neste navegador!";
        formularioAvaliacao.reset();
        carregarAvaliacoes();
    });
}