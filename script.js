const SUPABASE_URL = "https://qxlctwcgivnsdsbvnmql.supabase.co";
const SUPABASE_KEY = "sb_publishable_-Tu9ALcIjSArYUVHuOG81w_S8ciwoc_";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const nomes = {
    Analise: "Análise",
    Tecnica: "Técnica",
    Criatividade: "Criatividade",
    Estrategia: "Estratégia",
    Colaboracao: "Colaboração"
};

const descricoes = {
    Analise: "Você gosta de investigar, entender o porquê das coisas e decidir com base em evidências.",
    Tecnica: "Você se sente em casa construindo, implementando e dominando ferramentas e tecnologias.",
    Criatividade: "Você brilha quando precisa gerar ideias, experimentar e achar caminhos originais.",
    Estrategia: "Você enxerga o quadro geral, sabe priorizar e pensa nas consequências de cada escolha.",
    Colaboracao: "Você valoriza conversar, trabalhar em equipe e ajudar as pessoas a caminharem juntas."
};

const sugestoes = {
    Analise: ["Ciência de Dados e Análise de Dados", "Engenharia de Machine Learning (foco em validação e métricas)", "Pesquisa e desenvolvimento (R&D)", "Observabilidade e performance de sistemas"],
    Tecnica: ["Desenvolvimento de software (backend/frontend)", "Engenharia de Machine Learning / MLOps", "Infraestrutura e Cloud", "Segurança e qualidade de código"],
    Criatividade: ["IA Generativa aplicada a produtos", "Design de experiência + tecnologia", "Prototipagem rápida e inovação", "Conteúdo e ferramentas criativas com IA"],
    Estrategia: ["Product Management em tecnologia", "Arquitetura de soluções", "Liderança técnica e tomada de decisão", "Ética e governança de IA"],
    Colaboracao: ["Facilitação de times ágeis", "Developer Experience e cultura de engenharia", "Educação e evangelização técnica", "Trabalho em produtos multidisciplinares"]
};

let usuarioAtual = null;
let modoCadastro = false;
let perguntas = [];
let indiceAtual = 0;
let respostas = [];
let pontuacao = criarPontuacaoZerada();
let pontosAtuais = criarPontuacaoZerada();
let categoriaAtiva = null;

function criarPontuacaoZerada() {
    return { Analise: 0, Tecnica: 0, Criatividade: 0, Estrategia: 0, Colaboracao: 0 };
}

const telaAuth = document.getElementById("tela-auth");
const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");
const todasAsTelas = [telaAuth, telaInicial, telaQuiz, telaResultado];

const abaLogin = document.getElementById("aba-login");
const abaCadastro = document.getElementById("aba-cadastro");
const formAuth = document.getElementById("form-auth");
const campoNome = document.getElementById("campo-nome");
const campoEmail = document.getElementById("campo-email");
const campoSenha = document.getElementById("campo-senha");
const botaoAuth = document.getElementById("botao-auth");
const mensagemAuth = document.getElementById("mensagem-auth");

const saudacao = document.getElementById("saudacao");
const botaoSair = document.getElementById("sair");
const botaoIniciar = document.getElementById("iniciar");
const historico = document.getElementById("historico");
const listaHistorico = document.getElementById("lista-historico");

const numeroPergunta = document.getElementById("numero-pergunta");
const porcentagemQuiz = document.getElementById("porcentagem-quiz");
const progresso = document.getElementById("progresso");
const containerPergunta = document.getElementById("pergunta-container");
const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const mensagemQuiz = document.getElementById("mensagem-quiz");
const botaoVoltar = document.getElementById("voltar");
const botaoProxima = document.getElementById("proxima");

const tituloResultado = document.getElementById("titulo-resultado");
const resultadoFinal = document.getElementById("resultado-final");
const detalhesResultado = document.getElementById("detalhes-resultado");
const statusSalvo = document.getElementById("status-salvo");
const botaoRefazer = document.getElementById("refazer");
const botaoReiniciar = document.getElementById("reiniciar");

function mostrarTela(tela) {
    todasAsTelas.forEach(t => { t.hidden = (t !== tela); });
    window.scrollTo(0, 0);
}

function formatarDataHora(dataISO) {
    return new Date(dataISO).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function reanimar(elemento) {
    elemento.classList.remove("entrando");
    void elemento.offsetWidth;
    elemento.classList.add("entrando");
}

function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function rankingDe(pontos) {
    return Object.entries(pontos).sort((a, b) => b[1] - a[1]);
}

function definirModo(cadastro) {
    modoCadastro = cadastro;

    abaLogin.classList.toggle("ativa", !cadastro);
    abaCadastro.classList.toggle("ativa", cadastro);

    campoNome.hidden = !cadastro;
    campoNome.required = cadastro;
    campoSenha.autocomplete = cadastro ? "new-password" : "current-password";
    botaoAuth.textContent = cadastro ? "Criar minha conta" : "Entrar";

    mensagemAuth.textContent = "";
    mensagemAuth.classList.remove("sucesso");
}

function traduzirErro(mensagem) {
    if (!mensagem) return "Algo deu errado por aqui. Tenta de novo?";
    if (mensagem.includes("Invalid login credentials")) return "Opa, e-mail ou senha não conferem. Dá uma olhadinha e tenta de novo?";
    if (mensagem.includes("already registered")) return "Esse e-mail já tem cadastro. Que tal entrar com ele?";
    if (mensagem.includes("Email not confirmed")) return "Falta confirmar seu e-mail. Dá uma olhada na sua caixa de entrada.";
    if (mensagem.includes("at least 6")) return "A senha precisa ter pelo menos 6 caracteres.";
    if (mensagem.includes("rate limit")) return "Foram muitas tentativas seguidas. Espera um pouquinho e tenta de novo.";
    return mensagem;
}

async function enviarFormAuth(evento) {
    evento.preventDefault();

    mensagemAuth.classList.remove("sucesso");
    mensagemAuth.textContent = "";
    botaoAuth.disabled = true;

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (modoCadastro) {
        const nome = campoNome.value.trim();
        const { data, error } = await db.auth.signUp({
            email,
            password: senha,
            options: { data: { nome } }
        });

        if (error) {
            mensagemAuth.textContent = traduzirErro(error.message);
        } else if (!data.session) {
            definirModo(false);
            mensagemAuth.classList.add("sucesso");
            mensagemAuth.textContent = "Conta criada! Confirme seu e-mail e depois é só entrar.";
        }
    } else {
        const { error } = await db.auth.signInWithPassword({ email, password: senha });
        if (error) {
            mensagemAuth.textContent = traduzirErro(error.message);
        }
    }

    botaoAuth.disabled = false;
}

async function sair() {
    await db.auth.signOut();
}

db.auth.onAuthStateChange((evento, sessao) => {
    const novoUsuario = sessao ? sessao.user : null;
    const mesmaPessoa = novoUsuario && usuarioAtual && novoUsuario.id === usuarioAtual.id;

    usuarioAtual = novoUsuario;

    if (mesmaPessoa) return;

    setTimeout(() => {
        if (usuarioAtual) {
            const nomeCompleto = (usuarioAtual.user_metadata && usuarioAtual.user_metadata.nome) || "";
            const primeiroNome = nomeCompleto.split(" ")[0] || usuarioAtual.email;
            saudacao.textContent = `Oi, ${primeiroNome}! 👋`;
            mostrarTela(telaInicial);
            carregarHistorico();
        } else {
            formAuth.reset();
            definirModo(false);
            mostrarTela(telaAuth);
        }
    }, 0);
});

async function carregarHistorico() {
    const { data, error } = await db
        .from("resultados")
        .select("id, perfil, pontuacao, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

    listaHistorico.innerHTML = "";

    if (error || !data || data.length === 0) {
        historico.hidden = true;
        return;
    }

    data.forEach(registro => {
        const total = Object.values(registro.pontuacao || {}).reduce((soma, v) => soma + v, 0);

        const item = document.createElement("li");
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "item-historico";

        const esquerda = document.createElement("span");
        esquerda.className = "item-perfil";
        esquerda.textContent = `Perfil ${nomes[registro.perfil] || registro.perfil}`;

        const direita = document.createElement("span");
        direita.className = "item-data";
        direita.textContent = `${formatarDataHora(registro.created_at)} · ${total} pts`;

        botao.append(esquerda, direita);
        botao.addEventListener("click", () => abrirResultadoSalvo(registro));

        item.appendChild(botao);
        listaHistorico.appendChild(item);
    });

    historico.hidden = false;
}

async function salvarResultado(perfil) {
    statusSalvo.classList.remove("erro");
    statusSalvo.textContent = "Guardando seu resultado...";

    const { error } = await db.from("resultados").insert({ perfil, pontuacao });

    if (error) {
        statusSalvo.classList.add("erro");
        statusSalvo.textContent = "Não consegui guardar seu resultado agora: " + error.message;
    } else {
        statusSalvo.textContent = "Pronto! Seu resultado ficou guardado na sua conta ✓";
    }
}

function abrirResultadoSalvo(registro) {
    mostrarTela(telaResultado);
    tituloResultado.textContent = "Resultado de " + formatarDataHora(registro.created_at);
    statusSalvo.textContent = "";
    desenharResultado({ ...criarPontuacaoZerada(), ...registro.pontuacao });
}

async function carregarPerguntas() {
    const { data, error } = await db
        .from("perguntas")
        .select(`
            id,
            texto,
            ordem,
            alternativas (
                texto,
                pontos,
                ordem
            )
        `)
        .order("ordem");

    if (error) return { erro: error.message };
    if (!data || data.length === 0) return { erro: "Ainda não há perguntas cadastradas." };

    const lista = data.map(p => ({
        texto: p.texto,
        alternativas: (p.alternativas || [])
            .slice()
            .sort((a, b) => a.ordem - b.ordem)
            .map(a => ({ texto: a.texto, pontos: a.pontos || {} }))
    }));

    return { lista };
}

async function iniciarQuiz() {
    botaoIniciar.disabled = true;
    botaoRefazer.disabled = true;
    const { erro, lista } = await carregarPerguntas();
    botaoIniciar.disabled = false;
    botaoRefazer.disabled = false;

    if (erro) {
        alert("Não consegui carregar as perguntas: " + erro);
        return;
    }

    perguntas = embaralhar(lista);
    indiceAtual = 0;
    respostas = [];

    mostrarTela(telaQuiz);
    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[indiceAtual];
    const total = perguntas.length;
    const ehUltima = indiceAtual === total - 1;

    numeroPergunta.textContent = `Pergunta ${indiceAtual + 1} de ${total}`;
    porcentagemQuiz.textContent = `${Math.round((indiceAtual / total) * 100)}%`;
    progresso.max = total;
    progresso.value = indiceAtual;
    perguntaEl.textContent = pergunta.texto;
    mensagemQuiz.textContent = "";

    botaoVoltar.disabled = indiceAtual === 0;
    botaoProxima.disabled = respostas[indiceAtual] === undefined;
    botaoProxima.textContent = ehUltima ? "Ver meu resultado" : "Próxima pergunta";

    alternativasEl.innerHTML = "";
    pergunta.alternativas.forEach((alternativa, i) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "alternativa";

        const tecla = document.createElement("span");
        tecla.className = "tecla";
        tecla.textContent = i + 1;

        const texto = document.createElement("span");
        texto.textContent = alternativa.texto;

        botao.append(tecla, texto);

        if (respostas[indiceAtual] === i) botao.classList.add("selecionada");

        botao.addEventListener("click", () => selecionarAlternativa(i));
        alternativasEl.appendChild(botao);
    });

    reanimar(containerPergunta);
}

function selecionarAlternativa(indice) {
    respostas[indiceAtual] = indice;

    alternativasEl.querySelectorAll(".alternativa").forEach((botao, i) => {
        botao.classList.toggle("selecionada", i === indice);
    });

    botaoProxima.disabled = false;
    botaoProxima.focus({ preventScroll: true });
    mensagemQuiz.textContent = "";
}

function voltarPergunta() {
    if (indiceAtual === 0) return;
    indiceAtual--;
    mostrarPergunta();
}

function proximaPergunta() {
    if (respostas[indiceAtual] === undefined) {
        mensagemQuiz.textContent = "Escolha uma alternativa para continuar.";
        return;
    }

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        progresso.value = perguntas.length;
        mostrarResultadoNovo();
    }
}

function calcularPontuacao() {
    const total = criarPontuacaoZerada();

    perguntas.forEach((pergunta, i) => {
        const escolhida = pergunta.alternativas[respostas[i]];
        if (!escolhida) return;

        for (const categoria in escolhida.pontos) {
            if (categoria in total) {
                total[categoria] += Number(escolhida.pontos[categoria]) || 0;
            }
        }
    });

    return total;
}

function mostrarResultadoNovo() {
    pontuacao = calcularPontuacao();

    mostrarTela(telaResultado);
    tituloResultado.textContent = "Seu resultado";

    desenharResultado(pontuacao);
    salvarResultado(rankingDe(pontuacao)[0][0]);
}

function desenharResultado(pontos) {
    pontosAtuais = pontos;
    categoriaAtiva = null;

    const ranking = rankingDe(pontos);
    const [maisForte, segundo] = ranking;
    const maiorNota = Math.max(...Object.values(pontos), 1);
    const fracao = (categoria) => pontos[categoria] / maiorNota;

    const itensGrafico = Object.keys(nomes).map(chave => ({
        chave,
        rotulo: nomes[chave],
        pontos: pontos[chave],
        fator: fracao(chave)
    }));

    const chips = Object.keys(nomes)
        .map(chave => `<button class="chip" type="button" data-categoria="${chave}">${nomes[chave]}</button>`)
        .join("");

    const barras = ranking.map(([categoria, pts]) => `
        <div class="barra-categoria">
            <div class="label">
                <span>${nomes[categoria]}</span>
                <span><span class="contador" data-alvo="${pts}">0</span> pts</span>
            </div>
            <div class="barra">
                <div class="barra-preenchida" data-largura="${Math.round(fracao(categoria) * 100)}"></div>
            </div>
        </div>`).join("");

    resultadoFinal.innerHTML = `
        <div class="perfil-destaque">
            <h2>Seu lado mais forte: ${nomes[maisForte[0]]}</h2>
            <p>${descricoes[maisForte[0]]}</p>
        </div>

        <h3 class="titulo-secao">Seu mapa de interesses</h3>
        <p class="dica-grafico">Passe o mouse ou toque em uma categoria para ver os detalhes.</p>
        <div class="grafico-radar">${criarRadar(itensGrafico)}</div>

        <div class="chips">${chips}</div>
        <div class="explorador" id="explorador" aria-live="polite"></div>

        <h3 class="titulo-secao">Pontuação por categoria</h3>
        <p class="dica-grafico">O gráfico e as barras comparam suas categorias entre si: a sua maior nota chega até a borda.</p>
        ${barras}`;

    const segundoTexto = segundo[1] > 0
        ? ` e também com <strong>${nomes[segundo[0]].toLowerCase()}</strong>`
        : "";

    detalhesResultado.innerHTML = `
        <h3>O que isso diz sobre você</h3>
        <p>Pelas suas respostas, você parece se identificar mais com atividades ligadas a <strong>${nomes[maisForte[0]].toLowerCase()}</strong>${segundoTexto}.</p>
        <p class="aviso-final">Use este resultado como ponto de partida para pensar, não como veredito. O mais importante é continuar experimentando e aprendendo.</p>`;

    selecionarCategoria(maisForte[0]);
    animarBarras();
    animarContadores();
}

function selecionarCategoria(categoria) {
    if (categoria === categoriaAtiva) return;
    categoriaAtiva = categoria;

    resultadoFinal.querySelectorAll("[data-categoria]").forEach(elemento => {
        elemento.classList.toggle("ativo", elemento.getAttribute("data-categoria") === categoria);
    });

    const painel = document.getElementById("explorador");
    if (!painel) return;

    const ranking = rankingDe(pontosAtuais);
    const lugar = ranking.findIndex(([chave]) => chave === categoria) + 1;
    const selo = lugar === 1 ? "Seu lado mais forte" : `${lugar}º lugar no seu perfil`;

    painel.innerHTML = `
        <div class="explorador-topo">
            <h3>${nomes[categoria]} · ${pontosAtuais[categoria]} pts</h3>
            <span class="selo">${selo}</span>
        </div>
        <p>${descricoes[categoria]}</p>
        <h4>Caminhos que combinam</h4>
        <ul>${sugestoes[categoria].map(s => `<li>${s}</li>`).join("")}</ul>`;

    reanimar(painel);
}

function animarBarras() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
        resultadoFinal.querySelectorAll(".barra-preenchida").forEach(barra => {
            barra.style.width = barra.dataset.largura + "%";
        });
    }));
}

function animarContadores() {
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resultadoFinal.querySelectorAll(".contador").forEach(elemento => {
        const alvo = Number(elemento.dataset.alvo);

        if (reduzirMovimento || alvo === 0) {
            elemento.textContent = alvo;
            return;
        }

        const duracao = 900;
        const inicio = performance.now();

        const passo = (agora) => {
            const progressoTempo = Math.min(1, (agora - inicio) / duracao);
            const suavizado = 1 - Math.pow(1 - progressoTempo, 3);
            elemento.textContent = Math.round(alvo * suavizado);
            if (progressoTempo < 1) requestAnimationFrame(passo);
        };

        requestAnimationFrame(passo);
    });
}

function criarRadar(itens) {
    const largura = 420;
    const altura = 340;
    const centroX = largura / 2;
    const centroY = 190;
    const raio = 115;
    const lados = itens.length;

    const angulo = (i) => -Math.PI / 2 + (2 * Math.PI * i) / lados;

    const posicao = (i, fator) => [
        centroX + raio * fator * Math.cos(angulo(i)),
        centroY + raio * fator * Math.sin(angulo(i))
    ];

    const comoPontos = (fator) =>
        itens.map((_, i) => posicao(i, fator).map(n => n.toFixed(1)).join(",")).join(" ");

    const aneis = [0.25, 0.5, 0.75, 1]
        .map(f => `<polygon class="radar-anel" points="${comoPontos(f)}"/>`)
        .join("");

    const eixos = itens.map((_, i) => {
        const [x, y] = posicao(i, 1);
        return `<line class="radar-eixo" x1="${centroX}" y1="${centroY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
    }).join("");

    const fatorVisivel = (item) => Math.max(item.fator, 0.06);

    const pontosArea = itens
        .map((item, i) => posicao(i, fatorVisivel(item)).map(n => n.toFixed(1)).join(","))
        .join(" ");

    const nos = itens.map((item, i) => {
        const cos = Math.cos(angulo(i));
        const sen = Math.sin(angulo(i));

        const [pontoX, pontoY] = posicao(i, fatorVisivel(item));
        const [alvoX, alvoY] = posicao(i, 1.1);
        const [rotuloX, rotuloY] = posicao(i, 1.2);

        const ancora = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const yBase = sen < -0.5 ? rotuloY - 12 : sen > 0.5 ? rotuloY + 6 : rotuloY - 2;

        return `
            <g class="radar-no" data-categoria="${item.chave}" tabindex="0" role="button"
               aria-label="${item.rotulo}: ${item.pontos} pontos">
                <circle class="radar-alvo" cx="${alvoX.toFixed(1)}" cy="${alvoY.toFixed(1)}" r="30"/>
                <circle class="radar-ponto" cx="${pontoX.toFixed(1)}" cy="${pontoY.toFixed(1)}" r="5"/>
                <text class="radar-rotulo" x="${rotuloX.toFixed(1)}" y="${yBase.toFixed(1)}" text-anchor="${ancora}">
                    ${item.rotulo}
                    <tspan class="radar-valor" x="${rotuloX.toFixed(1)}" dy="15">${item.pontos} pts</tspan>
                </text>
            </g>`;
    }).join("");

    const descricao = "Gráfico de radar: " + itens.map(i => `${i.rotulo} ${i.pontos} pontos`).join(", ");

    return `
        <svg class="radar" viewBox="0 0 ${largura} ${altura}" role="group" aria-label="${descricao}">
            ${aneis}
            ${eixos}
            <polygon class="radar-area" points="${pontosArea}"/>
            ${nos}
        </svg>`;
}

function voltarAoInicio() {
    mostrarTela(telaInicial);
    carregarHistorico();
}

abaLogin.addEventListener("click", () => definirModo(false));
abaCadastro.addEventListener("click", () => definirModo(true));
formAuth.addEventListener("submit", enviarFormAuth);
botaoSair.addEventListener("click", sair);

botaoIniciar.addEventListener("click", iniciarQuiz);
botaoRefazer.addEventListener("click", iniciarQuiz);
botaoVoltar.addEventListener("click", voltarPergunta);
botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", voltarAoInicio);

resultadoFinal.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-categoria]");
    if (alvo) selecionarCategoria(alvo.getAttribute("data-categoria"));
});

resultadoFinal.addEventListener("mouseover", (evento) => {
    const alvo = evento.target.closest(".radar-no");
    if (alvo) selecionarCategoria(alvo.getAttribute("data-categoria"));
});

resultadoFinal.addEventListener("focusin", (evento) => {
    const alvo = evento.target.closest(".radar-no");
    if (alvo) selecionarCategoria(alvo.getAttribute("data-categoria"));
});

resultadoFinal.addEventListener("keydown", (evento) => {
    if (evento.key !== "Enter" && evento.key !== " ") return;
    const alvo = evento.target.closest(".radar-no");
    if (!alvo) return;
    evento.preventDefault();
    selecionarCategoria(alvo.getAttribute("data-categoria"));
});

document.addEventListener("keydown", (evento) => {
    if (telaQuiz.hidden) return;
    if (evento.ctrlKey || evento.metaKey || evento.altKey) return;
    if (evento.target.matches("input, textarea")) return;

    const numero = Number(evento.key);
    const quantidade = perguntas[indiceAtual] ? perguntas[indiceAtual].alternativas.length : 0;

    if (numero >= 1 && numero <= quantidade) {
        selecionarAlternativa(numero - 1);
    } else if (evento.key === "ArrowLeft") {
        voltarPergunta();
    }
});
