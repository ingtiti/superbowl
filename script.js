(() => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const actions = document.getElementById('actions');
  const hint = document.getElementById('hint');

  const playerIdle = document.getElementById('playerIdle');
  const playerCelebrate = document.getElementById('playerCelebrate');

  // Helpers
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function randomizeNoButtonPosition() {
    const pad = 8;

    const a = actions.getBoundingClientRect();
    const b = noBtn.getBoundingClientRect();

    // Coordenadas dentro del contenedor .actions
    const maxX = a.width - b.width - pad;
    const maxY = a.height - b.height - pad;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${clamp(x, pad, maxX)}px`;
    noBtn.style.top  = `${clamp(y, pad, maxY)}px`;
  }

  // “No” escapa cuando el mouse se acerque (proximidad)
  function handleMouseMove(e) {
    const nb = noBtn.getBoundingClientRect();
    const cx = nb.left + nb.width / 2;
    const cy = nb.top + nb.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    // Umbral: entre más pequeño, más “posible” darle click
    if (dist < 120) randomizeNoButtonPosition();
  }

  // En móvil no hay "hover": que se mueva al intentar tocarlo
  function handleTouchStart() {
    randomizeNoButtonPosition();
  }

  // Click Sí: cambia al jugador celebrando
  yesBtn.addEventListener('click', () => {
    playerIdle.classList.add('hidden');
    playerCelebrate.classList.remove('hidden');

    hint.textContent = '¡Perfecto! 😄 (El “No” seguirá intentando huir.)';

    // Un pequeño “boost” visual
    playerCelebrate.animate(
      [{ transform: 'translateY(-6px) scale(1.02)' }, { transform: 'translateY(-12px) scale(1.06)' }, { transform: 'translateY(-6px) scale(1.02)' }],
      { duration: 550, easing: 'ease-out' }
    );
  });

  // “No” nunca debe ser clickeable; por si logran click, igual se mueve
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    randomizeNoButtonPosition();
  });

  // Listeners
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  noBtn.addEventListener('mouseenter', randomizeNoButtonPosition);
  noBtn.addEventListener('touchstart', handleTouchStart, { passive: true });

  // Arranque: coloca "No" en posición inicial semi-aleatoria
  window.addEventListener('load', () => {
    randomizeNoButtonPosition();
  });

  // Si cambias tamaño (rotación móvil), reubica
  window.addEventListener('resize', () => {
    randomizeNoButtonPosition();
  });
})();

