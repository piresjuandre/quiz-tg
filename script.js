// ==========================================================
// QUIZ DE QUALIFICAÇÃO - JOGO PAGANTE EM ANGOLA (KZ)
// Lógica de Navegação e Validação de Vaga
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Configuração rápida: Altere aqui o link da sua plataforma / canal / WhatsApp
  const CONFIG = {
    destinationUrl: "https://meumaiorjogo.vercel.app/", // Link configurado para a oferta final
  };

  // Referências aos elementos do DOM
  const btnStart = document.getElementById('btnStart');
  const stepIndicator = document.getElementById('stepIndicator');
  const progressBar = document.getElementById('progressBar');
  const quizHeader = document.getElementById('quizHeader');
  const btnCta = document.getElementById('btnCta');

  if (btnCta && CONFIG.destinationUrl) {
    btnCta.href = CONFIG.destinationUrl;
  }

  // Passos
  const stepIntro = document.getElementById('stepIntro');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const stepLoading = document.getElementById('stepLoading');
  const stepResult = document.getElementById('stepResult');

  // Checklist de loading
  const check1 = document.getElementById('check1');
  const check2 = document.getElementById('check2');
  const check3 = document.getElementById('check3');

  // Lista sequencial de passos de perguntas
  const questionSteps = [step1, step2, step3, step4];
  const totalQuestions = questionSteps.length;

  let currentQuestionIndex = -1; // -1 = Intro, 0 = P1, 1 = P2, 2 = P3, 3 = P4
  const userAnswers = {};

  // Inicializa o quiz ao clicar em "Iniciar"
  btnStart.addEventListener('click', () => {
    goToQuestion(0);
  });

  // Configura os botões de opção de cada pergunta
  questionSteps.forEach((stepElement, stepIdx) => {
    const optionButtons = stepElement.querySelectorAll('.option-btn');
    
    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Feedback visual imediato
        optionButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const value = btn.getAttribute('data-value');
        const textStrong = btn.querySelector('strong')?.textContent || '';
        
        userAnswers[stepIdx] = {
          value: value,
          label: textStrong
        };

        // Delay suave de 160ms para o clique ser sentido e avançar automaticamente
        setTimeout(() => {
          if (stepIdx < totalQuestions - 1) {
            goToQuestion(stepIdx + 1);
          } else {
            // Última pergunta respondida -> ir para tela de análise e liberação da vaga
            startLoadingProcess();
          }
        }, 160);
      });
    });
  });

  // Função para exibir a Intro
  function showIntro() {
    currentQuestionIndex = -1;
    hideAllSteps();
    stepIntro.classList.add('active');
    quizHeader.style.display = 'none';
    progressBar.style.width = '0%';
  }

  // Função para ir para uma pergunta específica
  function goToQuestion(index) {
    currentQuestionIndex = index;
    hideAllSteps();

    const targetStep = questionSteps[index];
    targetStep.classList.add('active');

    // Atualiza cabeçalho e progresso
    quizHeader.style.display = 'flex';
    stepIndicator.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;
    const progressPercent = Math.round(((index + 1) / totalQuestions) * 100);
    progressBar.style.width = `${progressPercent}%`;

    // Mantém selecionado se já respondeu
    if (userAnswers[index]) {
      const optionButtons = targetStep.querySelectorAll('.option-btn');
      optionButtons.forEach(btn => {
        if (btn.getAttribute('data-value') === userAnswers[index].value) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
      });
    }

    // Scroll suave para o topo
    quizHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Processo de verificação e liberação (1.8s)
  function startLoadingProcess() {
    hideAllSteps();
    stepLoading.classList.add('active');
    stepIndicator.textContent = 'Verificando vaga...';
    progressBar.style.width = '100%';

    // Animação sequencial rápida do checklist
    setTimeout(() => {
      if (check1) {
        check1.classList.add('done');
        check1.querySelector('.row-icon').textContent = '✓';
      }
    }, 400);

    setTimeout(() => {
      if (check2) {
        check2.classList.add('done');
        check2.querySelector('.row-icon').textContent = '✓';
      }
    }, 900);

    setTimeout(() => {
      if (check3) {
        check3.classList.add('done');
        check3.querySelector('.row-icon').textContent = '✓';
      }
    }, 1400);

    // Exibir resultado final direto com afirmação
    setTimeout(() => {
      showResult();
    }, 1900);
  }

  // Exibir a tela final de afirmação
  function showResult() {
    hideAllSteps();
    stepResult.classList.add('active');
    quizHeader.style.display = 'none';
    progressBar.style.width = '100%';

    stepResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hideAllSteps() {
    const allSteps = document.querySelectorAll('.quiz-step');
    allSteps.forEach(s => s.classList.remove('active'));
  }
});
