const form = document.getElementById("quiz-form");
const stepContainer = document.getElementById("step-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const statusMessage = document.getElementById("status-message");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

document.getElementById("quiz-title").textContent = QUIZ_CONFIG.title;
document.getElementById("quiz-description").textContent = QUIZ_CONFIG.description;

let currentStepIndex = 0;
const answers = {};

function renderStep() {
  const step = QUIZ_CONFIG.steps[currentStepIndex];
  stepContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.className = "step-title";
  title.textContent = step.title;
  stepContainer.appendChild(title);

  step.fields.forEach(field => {
    const fieldWrap = document.createElement("div");
    fieldWrap.className = "field";

    const label = document.createElement("label");
    label.textContent = field.label;
    fieldWrap.appendChild(label);

    if (field.type === "text" || field.type === "tel" || field.type === "email") {
      const input = document.createElement("input");
      input.type = field.type;
      input.name = field.name;
      input.placeholder = field.placeholder || "";
      input.value = answers[field.name] || "";
      fieldWrap.appendChild(input);
    }

    if (field.type === "select") {
      const select = document.createElement("select");
      select.name = field.name;

      field.options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.label;
        if ((answers[field.name] || "") === option.value) opt.selected = true;
        select.appendChild(opt);
      });

      fieldWrap.appendChild(select);
    }

    if (field.type === "radio") {
      const grid = document.createElement("div");
      grid.className = "options-grid two-columns";

      field.options.forEach(option => {
        const card = document.createElement("label");
        card.className = "option-card";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = field.name;
        input.value = option.value;

        if (answers[field.name] === option.value) {
          input.checked = true;
          card.classList.add("selected");
        }

        input.addEventListener("change", () => {
          document.querySelectorAll(`input[name="${field.name}"]`).forEach(el => {
            el.parentElement.classList.remove("selected");
          });
          if (input.checked) {
            card.classList.add("selected");
          }
        });

        const span = document.createElement("span");
        span.textContent = option.label;

        card.appendChild(input);
        card.appendChild(span);
        grid.appendChild(card);
      });

      fieldWrap.appendChild(grid);
    }

    const error = document.createElement("div");
    error.className = "error";
    error.dataset.errorFor = field.name;
    fieldWrap.appendChild(error);

    stepContainer.appendChild(fieldWrap);
  });

  updateButtons();
  updateProgress();
}

function updateButtons() {
  prevBtn.style.display = currentStepIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display = currentStepIndex === QUIZ_CONFIG.steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = currentStepIndex === QUIZ_CONFIG.steps.length - 1 ? "inline-block" : "none";
}

function updateProgress() {
  const total = QUIZ_CONFIG.steps.length;
  const current = currentStepIndex + 1;
  const percent = (current / total) * 100;

  progressFill.style.width = `${percent}%`;
  progressText.textContent = `Etapa ${current} de ${total}`;
}

function collectCurrentStepValues() {
  const step = QUIZ_CONFIG.steps[currentStepIndex];
  let valid = true;

  step.fields.forEach(field => {
    let value = "";

    const errorEl = document.querySelector(`[data-error-for="${field.name}"]`);
    errorEl.textContent = "";

    if (field.type === "text" || field.type === "tel" || field.type === "email" || field.type === "select") {
      const input = form.querySelector(`[name="${field.name}"]`);
      value = input ? input.value.trim() : "";
    }

    if (field.type === "radio") {
      const checked = form.querySelector(`[name="${field.name}"]:checked`);
      value = checked ? checked.value : "";
    }

    if (field.required && !value) {
      errorEl.textContent = "Esse campo é obrigatório.";
      valid = false;
    }

    answers[field.name] = value;
  });

  return valid;
}

prevBtn.addEventListener("click", () => {
  currentStepIndex--;
  renderStep();
});

nextBtn.addEventListener("click", () => {
  const valid = collectCurrentStepValues();
  if (!valid) return;

  currentStepIndex++;
  renderStep();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valid = collectCurrentStepValues();
  if (!valid) return;

  statusMessage.textContent = "Enviando...";

  const payload = {
    data_envio: new Date().toISOString(),
    ...answers
  };

  try {
    const response = await fetch(QUIZ_CONFIG.submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.ok) {
      statusMessage.textContent = "Não foi possível enviar agora.";
      return;
    }

    statusMessage.textContent = "Enviado com sucesso.";

    const estilo = answers.estilo;
    const redirect = QUIZ_CONFIG.redirectMap?.[estilo];

    if (redirect) {
      window.location.href = redirect;
    }
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Erro de conexão.";
  }
});

renderStep();