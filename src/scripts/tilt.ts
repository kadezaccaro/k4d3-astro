function initTilt() {
  const cards = document.querySelectorAll<HTMLElement>(".tilt");

  cards.forEach((card) => {
    let frame: number | null = null;

    card.addEventListener("pointermove", (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        card.style.setProperty("--ry", `${x * 12}deg`);
        card.style.setProperty("--rx", `${-y * 12}deg`);
        frame = null;
      });
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

initTilt();

document.addEventListener("astro:page-load", initTilt);
