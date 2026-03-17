(() => {
  const root = document.querySelector("[data-quiz]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll("[data-question]"));
  const progressFill = root.querySelector("[data-progress]");
  const progressText = root.querySelector("[data-progress-text]");

  const updateProgress = () => {
    const answered = questions.filter((q) => q.querySelector(".quiz-choice.is-active")).length;
    const pct = Math.round((answered / questions.length) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.textContent = String(pct);
  };

  root.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest(".quiz-choice") : null;
    if (!btn) return;

    const card = btn.closest("[data-question]");
    if (!card) return;

    const all = card.querySelectorAll(".quiz-choice");
    all.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    updateProgress();
  });

  updateProgress();
})();

