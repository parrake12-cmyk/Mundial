// quiz.js - Manejo del quiz interactivo
async function fetchQuestions(caseCode) {
  const response = await fetch(`/learning/${encodeURIComponent(caseCode)}`);
  if (!response.ok) throw new Error('No se pudieron cargar las preguntas.');
  return response.json();
}

async function loadQuiz(caseCode) {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = '<p>Cargando preguntas didácticas...</p>';

  try {
    const questions = await fetchQuestions(caseCode);
    if (!questions.length) {
      quizContainer.innerHTML = '<p class="hint">Aún no hay preguntas para este caso.</p>';
      return;
    }

    quizContainer.innerHTML = '<h3>Resolver caso</h3>' + questions.map((question, index) => renderQuestionCard(question, index + 1)).join('');
    questions.forEach((question) => attachQuestionListeners(question));
  } catch (error) {
    quizContainer.innerHTML = `<p class="hint">Error al cargar preguntas: ${escapeHTML(error.message)}</p>`;
  }
}

function renderQuestionCard(question, number) {
  return `
    <div class="question-card" data-case-code="${escapeHTML(question.case_code)}" data-question-id="${escapeHTML(question.id)}">
      <h3>Pregunta ${number}</h3>
      <p>${escapeHTML(question.question)}</p>
      <div class="quiz-options">
        ${['A', 'B', 'C', 'D']
          .map((optionKey) => `
            <button class="option-button" data-option="${optionKey}" data-question-id="${escapeHTML(question.id)}">
              <strong>${optionKey}.</strong> ${escapeHTML(question[`option_${optionKey.toLowerCase()}`])}
            </button>
          `)
          .join('')}
      </div>
      <div class="feedback" id="feedback-${escapeHTML(question.id)}" style="display:none"></div>
    </div>
  `;
}

function attachQuestionListeners(question) {
  const buttons = Array.from(document.querySelectorAll(`button.option-button[data-question-id="${question.id}"]`));
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.getAttribute('data-option');
      const feedback = document.getElementById(`feedback-${question.id}`);
      const correct = question.correct_option;

      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.getAttribute('data-option') === correct) {
          btn.classList.add('correct');
        }
      });

      if (selected === correct) {
        button.classList.add('correct');
        feedback.className = 'feedback correct';
        feedback.textContent = `Correcto. ${question.explanation}`;
      } else {
        button.classList.add('incorrect');
        feedback.className = 'feedback incorrect';
        feedback.textContent = `Incorrecto. ${question.explanation}`;
      }
      feedback.style.display = 'block';
    });
  });
}
