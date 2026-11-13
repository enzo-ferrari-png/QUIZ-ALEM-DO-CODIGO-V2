const perguntas = [
  {
    texto: "O que significa Machine Learning?",
    alternativas: [
      { texto: "Um tipo de programação que usa apenas regras fixas escritas por humanos", pontos: { Tecnica: 1 } },
      { texto: "A capacidade de computadores aprenderem padrões a partir de dados, sem serem explicitamente programados para cada caso", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Um software que gera imagens e textos automaticamente", pontos: { Criatividade: 1 } },
      { texto: "Um método de organizar arquivos em pastas", pontos: {} }
    ]
  },
  {
    texto: "O que caracteriza a IA generativa?",
    alternativas: [
      { texto: "Ela apenas classifica ou prevê resultados a partir de dados existentes", pontos: { Analise: 1 } },
      { texto: "Ela cria novos conteúdos (texto, imagem, código, áudio) a partir do que aprendeu", pontos: { Criatividade: 3, Tecnica: 2 } },
      { texto: "Ela só funciona com dados numéricos", pontos: { Tecnica: 1 } },
      { texto: "Ela substitui completamente a necessidade de programadores", pontos: { Estrategia: 1 } }
    ]
  },
  {
    texto: "Para que serve um conjunto de dados de treino?",
    alternativas: [
      { texto: "Para testar a velocidade da internet", pontos: {} },
      { texto: "Para o modelo aprender padrões e relações a partir de exemplos", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Apenas para armazenar backups", pontos: { Tecnica: 1 } },
      { texto: "Para gerar relatórios finais sem intervenção humana", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "O que é viés em um modelo de IA?",
    alternativas: [
      { texto: "Quando o modelo é muito rápido", pontos: {} },
      { texto: "Quando o modelo favorece ou prejudica certos grupos de forma sistemática por causa dos dados ou do treinamento", pontos: { Analise: 3, Estrategia: 2 } },
      { texto: "Quando o modelo usa muita memória", pontos: { Tecnica: 1 } },
      { texto: "Quando o modelo gera respostas criativas", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Qual destas é uma aplicação típica de IA na saúde?",
    alternativas: [
      { texto: "Criar jogos educativos sobre anatomia", pontos: { Criatividade: 1 } },
      { texto: "Ajudar na detecção precoce de doenças em exames de imagem", pontos: { Tecnica: 3, Analise: 2 } },
      { texto: "Substituir completamente os médicos", pontos: { Estrategia: 1 } },
      { texto: "Organizar a agenda de consultas manualmente", pontos: {} }
    ]
  },
  {
    texto: "O que um modelo de IA não faz bem por conta própria?",
    alternativas: [
      { texto: "Reconhecer padrões em grandes volumes de dados", pontos: { Analise: 1 } },
      { texto: "Tomar decisões éticas e considerar contexto social e moral", pontos: { Estrategia: 3, Colaboracao: 1 } },
      { texto: "Gerar texto fluente", pontos: { Criatividade: 1 } },
      { texto: "Classificar imagens", pontos: { Tecnica: 1 } }
    ]
  },
  {
    texto: "Você está desenvolvendo um sistema e percebe que os usuários têm dificuldade para usá-lo. O que você faria primeiro?",
    alternativas: [
      { texto: "Mudar a interface imediatamente com base no que acho melhor", pontos: { Criatividade: 1 } },
      { texto: "Observar e conversar com os usuários para entender exatamente onde está a dificuldade", pontos: { Analise: 3, Colaboracao: 2 } },
      { texto: "Ignorar, pois o sistema funciona tecnicamente", pontos: { Tecnica: 1 } },
      { texto: "Adicionar mais funcionalidades para compensar", pontos: { Estrategia: 1 } }
    ]
  },
  {
    texto: "O sistema fica lento apenas quando muitas pessoas acessam ao mesmo tempo. Qual é o seu primeiro passo?",
    alternativas: [
      { texto: "Reescrever todo o código do zero", pontos: { Tecnica: 1 } },
      { texto: "Investigar métricas, logs e identificar o gargalo de desempenho", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Pedir para as pessoas usarem menos o sistema", pontos: {} },
      { texto: "Adicionar animações para distrair o usuário enquanto carrega", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Um erro aparece em produção e você ainda não sabe a causa. Como você age?",
    alternativas: [
      { texto: "Espero alguém reclamar mais para ter certeza", pontos: {} },
      { texto: "Reúno logs, reproduzo o problema e investigo de forma estruturada", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Mudo várias coisas ao mesmo tempo para ver se resolve", pontos: { Criatividade: 1 } },
      { texto: "Culpo a última pessoa que alterou o código", pontos: {} }
    ]
  },
  {
    texto: "Você recebe uma tarefa com requisitos incompletos. O que você faz?",
    alternativas: [
      { texto: "Começo a programar do jeito que imagino e ajusto depois", pontos: { Criatividade: 1 } },
      { texto: "Faço perguntas, esclareço dúvidas e alinhamos o escopo antes de avançar", pontos: { Estrategia: 3, Colaboracao: 2 } },
      { texto: "Entrego exatamente o que está escrito, mesmo que incompleto", pontos: { Tecnica: 1 } },
      { texto: "Ignoro a tarefa até terem tudo definido", pontos: {} }
    ]
  },
  {
    texto: "Há dois problemas abertos: um causa erro grave em poucos usuários e outro é apenas estético mas afeta todos. Qual você prioriza?",
    alternativas: [
      { texto: "O estético, porque afeta mais pessoas", pontos: { Criatividade: 1 } },
      { texto: "O erro grave, porque o impacto de um bug crítico é maior mesmo em poucos usuários", pontos: { Estrategia: 3, Analise: 2 } },
      { texto: "Resolvo os dois ao mesmo tempo de qualquer jeito", pontos: { Tecnica: 1 } },
      { texto: "Deixo os dois para depois", pontos: {} }
    ]
  },
  {
    texto: "Uma solução pronta encontrada na internet resolve o problema, mas você não entende como ela funciona. O que você faz?",
    alternativas: [
      { texto: "Copio e uso sem questionar", pontos: {} },
      { texto: "Estudo o código, entendo a lógica e só então adapto com segurança", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Descarto e faço tudo do zero mesmo demorando mais", pontos: { Tecnica: 1 } },
      { texto: "Peço para a IA explicar e confio cegamente", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Você cometeu um erro que afetou o trabalho da equipe. O que você faz?",
    alternativas: [
      { texto: "Escondo e espero que ninguém perceba", pontos: {} },
      { texto: "Assumo o erro, comunico rapidamente e ajudo a corrigir", pontos: { Colaboracao: 3, Estrategia: 1 } },
      { texto: "Culpo uma ferramenta ou outra pessoa", pontos: {} },
      { texto: "Só corrijo em silêncio sem avisar ninguém", pontos: { Tecnica: 1 } }
    ]
  },
  {
    texto: "Você precisa dividir as tarefas de um projeto em grupo. Como você faria?",
    alternativas: [
      { texto: "Faço quase tudo sozinho para garantir qualidade", pontos: { Tecnica: 1 } },
      { texto: "Distribuo considerando as forças de cada um e alinhamos responsabilidades juntos", pontos: { Colaboracao: 3, Estrategia: 2 } },
      { texto: "Sorteio as tarefas aleatoriamente", pontos: {} },
      { texto: "Deixo cada um escolher o que quiser sem coordenação", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Você precisa explicar um conceito técnico para alguém de outra área. Como você faria?",
    alternativas: [
      { texto: "Uso os termos técnicos completos para ser preciso", pontos: { Tecnica: 1 } },
      { texto: "Uso analogias, exemplos do dia a dia e linguagem acessível", pontos: { Colaboracao: 3, Criatividade: 1 } },
      { texto: "Envio um artigo longo e peço para a pessoa ler", pontos: { Analise: 1 } },
      { texto: "Digo que é complicado demais para explicar", pontos: {} }
    ]
  },
  {
    texto: "Um colega entrega um trabalho com problemas. Como você dá esse retorno a ele?",
    alternativas: [
      { texto: "Critico na frente de todo mundo para que aprendam", pontos: {} },
      { texto: "Converso em particular, aponto os pontos específicos e ofereço ajuda", pontos: { Colaboracao: 3, Estrategia: 1 } },
      { texto: "Não falo nada e corrijo eu mesmo", pontos: { Tecnica: 1 } },
      { texto: "Mando uma mensagem seca listando todos os erros", pontos: {} }
    ]
  },
  {
    texto: "Em um trabalho em equipe uma pessoa não cumpre a parte dela. O que você faz?",
    alternativas: [
      { texto: "Faço a parte dela em silêncio", pontos: { Tecnica: 1 } },
      { texto: "Converso com a pessoa, entendo o que aconteceu e realinhamos prazos e responsabilidades", pontos: { Colaboracao: 3, Estrategia: 2 } },
      { texto: "Reclamo com o professor/gestor imediatamente", pontos: {} },
      { texto: "Ignoro e deixo o projeto atrasar", pontos: {} }
    ]
  },
  {
    texto: "Você precisa apresentar um projeto para uma plateia que não é técnica. Como você prepara a apresentação?",
    alternativas: [
      { texto: "Mostro muito código e detalhes de implementação", pontos: { Tecnica: 1 } },
      { texto: "Foco no problema, no valor gerado e uso linguagem simples com exemplos visuais", pontos: { Colaboracao: 3, Criatividade: 2 } },
      { texto: "Leio os slides palavra por palavra", pontos: {} },
      { texto: "Improviso na hora", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "O projeto precisa ser entregue funcionando com metade do tempo esperado. Qual é a sua estratégia?",
    alternativas: [
      { texto: "Trabalho sem parar e entrego tudo incompleto", pontos: {} },
      { texto: "Defino o mínimo viável (MVP), priorizo o essencial e comunico claramente o que ficará de fora", pontos: { Estrategia: 3, Analise: 1 } },
      { texto: "Desisto e digo que é impossível", pontos: {} },
      { texto: "Peço para a equipe trabalhar o dobro sem planejar", pontos: { Colaboracao: 1 } }
    ]
  },
  {
    texto: "Você tem muitas ideias para um projeto mas só consegue executar algumas. Como decide?",
    alternativas: [
      { texto: "Escolho a ideia mais divertida", pontos: { Criatividade: 2 } },
      { texto: "Avalio impacto, esforço e alinhamento com o objetivo antes de decidir", pontos: { Estrategia: 3, Analise: 2 } },
      { texto: "Tento fazer todas ao mesmo tempo", pontos: {} },
      { texto: "Peço para outra pessoa decidir por mim", pontos: { Colaboracao: 1 } }
    ]
  },
  {
    texto: "No meio do projeto o cliente muda um requisito importante. Como você reage?",
    alternativas: [
      { texto: "Fico irritado e resisto à mudança", pontos: {} },
      { texto: "Avalio o impacto, comunico os trade-offs e ajustamos o plano juntos", pontos: { Estrategia: 3, Colaboracao: 2 } },
      { texto: "Aceito tudo sem questionar e trabalho a mais em silêncio", pontos: { Tecnica: 1 } },
      { texto: "Ignoro a mudança e entrego o original", pontos: {} }
    ]
  },
  {
    texto: "Como você costuma encontrar ideias para um projeto novo?",
    alternativas: [
      { texto: "Só faço o que me pedem, sem buscar novidades", pontos: {} },
      { texto: "Observo problemas reais, combino referências de diferentes áreas e experimento", pontos: { Criatividade: 3, Analise: 1 } },
      { texto: "Copio projetos prontos da internet", pontos: { Tecnica: 1 } },
      { texto: "Espero alguém trazer a ideia pronta", pontos: {} }
    ]
  },
  {
    texto: "Você precisa escolher entre duas soluções diferentes para o mesmo problema. Como decide?",
    alternativas: [
      { texto: "Escolho a que parece mais moderna", pontos: { Criatividade: 1 } },
      { texto: "Comparo prós, contras, riscos, esforço e alinhamento com os objetivos", pontos: { Estrategia: 3, Analise: 2 } },
      { texto: "Escolho a que eu já sei fazer", pontos: { Tecnica: 1 } },
      { texto: "Peço para a maioria votar sem analisar", pontos: { Colaboracao: 1 } }
    ]
  },
  {
    texto: "Um experimento que você fez deu errado mas trouxe informação nova. O que você faz com isso?",
    alternativas: [
      { texto: "Descarto tudo e finjo que não aconteceu", pontos: {} },
      { texto: "Documento o aprendizado e uso a informação para melhorar a próxima tentativa", pontos: { Criatividade: 3, Analise: 2 } },
      { texto: "Fico frustrado e paro de experimentar", pontos: {} },
      { texto: "Culpo as ferramentas usadas", pontos: {} }
    ]
  },
  {
    texto: "Uma IA gera uma solução de código rapidamente mas você não entendeu completamente o que ela produziu. O que você faz?",
    alternativas: [
      { texto: "Uso o código direto em produção", pontos: {} },
      { texto: "Estudo, testo e só incorporo depois de entender e validar", pontos: { Analise: 3, Tecnica: 2 } },
      { texto: "Descarto qualquer código gerado por IA", pontos: {} },
      { texto: "Peço para a IA gerar de novo até gostar do resultado visual", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Como você imagina que a IA vai mudar o trabalho de quem programa?",
    alternativas: [
      { texto: "Vai eliminar completamente a necessidade de programadores", pontos: {} },
      { texto: "Vai automatizar tarefas repetitivas e exigir mais capacidade de pensar, validar e decidir", pontos: { Estrategia: 3, Analise: 1 } },
      { texto: "Não vai mudar quase nada", pontos: { Tecnica: 1 } },
      { texto: "Só vai servir para gerar imagens e textos", pontos: { Criatividade: 1 } }
    ]
  },
  {
    texto: "Você precisa analisar dados sensíveis de pessoas, mas a ferramenta de IA disponível está fora da escola. O que você faz?",
    alternativas: [
      { texto: "Envio os dados mesmo assim, pois é mais prático", pontos: {} },
      { texto: "Priorizo a privacidade: anonimizo, uso ferramentas autorizadas ou peço orientação", pontos: { Estrategia: 3, Analise: 1 } },
      { texto: "Desisto da análise", pontos: {} },
      { texto: "Peço para um amigo usar a ferramenta por mim", pontos: {} }
    ]
  },
  {
    texto: "Uma ferramenta de IA já faz parte do seu trabalho. Qual é o seu papel quando ela assume tarefas repetitivas?",
    alternativas: [
      { texto: "Só aprovo tudo o que ela gera sem questionar", pontos: {} },
      { texto: "Foco em definir objetivos, validar resultados, tratar exceções e tomar decisões", pontos: { Estrategia: 3, Colaboracao: 1 } },
      { texto: "Paro de aprender coisas novas", pontos: {} },
      { texto: "Competir para ser mais rápido que a IA", pontos: { Tecnica: 1 } }
    ]
  },
  {
    texto: "Um colega confia nos resultados de uma IA e você percebe que há uma distorção nos dados. Como você age?",
    alternativas: [
      { texto: "Fico quieto para não criar conflito", pontos: {} },
      { texto: "Apresento evidências com calma e proponho validar juntos", pontos: { Analise: 3, Colaboracao: 2 } },
      { texto: "Critico a pessoa publicamente", pontos: {} },
      { texto: "Assumo que a IA está sempre certa", pontos: {} }
    ]
  },
  {
    texto: "Pensando no seu futuro profissional, o que você considera mais importante aprender primeiro?",
    alternativas: [
      { texto: "Apenas a linguagem de programação da moda", pontos: { Tecnica: 1 } },
      { texto: "Fundamentos sólidos + capacidade de aprender rápido e se adaptar", pontos: { Tecnica: 3, Estrategia: 2 } },
      { texto: "Só ferramentas de IA generativa", pontos: { Criatividade: 1 } },
      { texto: "Como evitar trabalhar em equipe", pontos: {} }
    ]
  }
];

let indiceAtual = 0;
let respostas = [];
let pontuacao = { Analise: 0, Tecnica: 0, Criatividade: 0, Estrategia: 0, Colaboracao: 0 };

const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");
const botaoIniciar = document.getElementById("iniciar");
const botaoProxima = document.getElementById("proxima");
const botaoReiniciar = document.getElementById("reiniciar");
const numeroPergunta = document.getElementById("numero-pergunta");
const progresso = document.getElementById("progresso");
const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const mensagemQuiz = document.getElementById("mensagem-quiz");
const resultadoFinal = document.getElementById("resultado-final");
const detalhesResultado = document.getElementById("detalhes-resultado");

function iniciarQuiz() {
  indiceAtual = 0;
  respostas = [];
  pontuacao = { Analise: 0, Tecnica: 0, Criatividade: 0, Estrategia: 0, Colaboracao: 0 };
  telaInicial.hidden = true;
  telaResultado.hidden = true;
  telaQuiz.hidden = false;
  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[indiceAtual];
  numeroPergunta.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  progresso.value = indiceAtual;
  progresso.max = perguntas.length;
  perguntaEl.textContent = pergunta.texto;
  mensagemQuiz.textContent = "";
  botaoProxima.disabled = true;
  botaoProxima.textContent = indiceAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
  alternativasEl.innerHTML = "";
  pergunta.alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "alternativa";
    btn.textContent = alt.texto;
    if (respostas[indiceAtual] === i) {
      btn.classList.add("selecionada");
      botaoProxima.disabled = false;
    }
    btn.addEventListener("click", () => selecionarAlternativa(i));
    alternativasEl.appendChild(btn);
  });
}

function selecionarAlternativa(indice) {
  respostas[indiceAtual] = indice;
  const botoes = alternativasEl.querySelectorAll(".alternativa");
  botoes.forEach((btn, i) => btn.classList.toggle("selecionada", i === indice));
  botaoProxima.disabled = false;
  mensagemQuiz.textContent = "";
}

function proximaPergunta() {
  if (respostas[indiceAtual] === undefined) {
    mensagemQuiz.textContent = "Selecione uma alternativa para continuar.";
    return;
  }
  const altEscolhida = perguntas[indiceAtual].alternativas[respostas[indiceAtual]];
  for (const cat in altEscolhida.pontos) {
    pontuacao[cat] += altEscolhida.pontos[cat];
  }
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  telaQuiz.hidden = true;
  telaResultado.hidden = false;
  const ranking = Object.entries(pontuacao).sort((a, b) => b[1] - a[1]);
  const [maisForte, segundo] = ranking;
  const nomes = { Analise: "Análise", Tecnica: "Técnica", Criatividade: "Criatividade", Estrategia: "Estratégia", Colaboracao: "Colaboração" };
  const descricoes = {
    Analise: "Você demonstra forte capacidade de investigar, entender problemas e tomar decisões baseadas em evidências.",
    Tecnica: "Você tem afinidade com a construção, implementação e domínio de ferramentas e tecnologias.",
    Criatividade: "Você se destaca na geração de ideias, experimentação e na busca de soluções originais.",
    Estrategia: "Você pensa de forma sistêmica, prioriza bem e considera impacto e consequências.",
    Colaboracao: "Você valoriza comunicação, trabalho em equipe e a capacidade de alinhar pessoas."
  };
  const sugestoes = {
    Analise: ["Ciência de Dados e Análise de Dados", "Engenharia de Machine Learning (foco em validação e métricas)", "Pesquisa e desenvolvimento (R&D)", "Observabilidade e performance de sistemas"],
    Tecnica: ["Desenvolvimento de software (backend/frontend)", "Engenharia de Machine Learning / MLOps", "Infraestrutura e Cloud", "Segurança e qualidade de código"],
    Criatividade: ["IA Generativa aplicada a produtos", "Design de experiência + tecnologia", "Prototipagem rápida e inovação", "Conteúdo e ferramentas criativas com IA"],
    Estrategia: ["Product Management em tecnologia", "Arquitetura de soluções", "Liderança técnica e tomada de decisão", "Ética e governança de IA"],
    Colaboracao: ["Facilitação de times ágeis", "Developer Experience e cultura de engenharia", "Educação e evangelização técnica", "Trabalho em produtos multidisciplinares"]
  };
  let htmlBarras = ranking.map(([cat, pts]) => {
    const porcentagem = Math.min(100, Math.round((pts / 90) * 100));
    return `<div class="barra-categoria"><div class="label"><span>${nomes[cat]}</span><span>${pts} pts</span></div><div class="barra"><div class="barra-preenchida" style="width: ${porcentagem}%"></div></div></div>`;
  }).join("");
  resultadoFinal.innerHTML = `<div class="perfil-destaque"><h2>Seu perfil mais forte: ${nomes[maisForte[0]]}</h2><p>${descricoes[maisForte[0]]}</p></div>${htmlBarras}`;
  detalhesResultado.innerHTML = `
    <h3>O que isso sugere para você</h3>
    <p>Com base nas suas respostas, você tende a se identificar mais com atividades que envolvem <strong>${nomes[maisForte[0]].toLowerCase()}</strong>${segundo[1] > 0 ? ` e também <strong>${nomes[segundo[0]].toLowerCase()}</strong>` : ""}.</p>
    <h3>Áreas e tendências que combinam com você</h3>
    <ul>${sugestoes[maisForte[0]].map(s => `<li>${s}</li>`).join("")}</ul>
    ${segundo[1] > 5 ? `<h3>Também vale explorar</h3><ul>${sugestoes[segundo[0]].slice(0, 2).map(s => `<li>${s}</li>`).join("")}</ul>` : ""}
    <p style="margin-top: 20px; color: #94a3b8; font-size: 14px;">Lembre-se: este quiz é um ponto de partida para reflexão. O mais importante é continuar experimentando e aprendendo.</p>
  `;
}

function reiniciarQuiz() {
  telaResultado.hidden = true;
  telaInicial.hidden = false;
}

botaoIniciar.addEventListener("click", iniciarQuiz);
botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);
