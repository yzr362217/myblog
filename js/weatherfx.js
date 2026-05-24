(() => {
  const root = document.getElementById("web_bg");
  if (!root || root.querySelector(".weather-fx")) return;

  const canvas = document.createElement("canvas");
  canvas.className = "weather-fx";
  canvas.setAttribute(
    "style",
    "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"
  );
  root.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const drops = [];
  const bubbles = [];

  const resize = () => {
    canvas.width = root.clientWidth * window.devicePixelRatio;
    canvas.height = root.clientHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const seed = () => {
    drops.length = 0;
    bubbles.length = 0;
    for (let i = 0; i < 80; i++) {
      drops.push({
        x: Math.random() * root.clientWidth,
        y: Math.random() * root.clientHeight,
        len: 10 + Math.random() * 18,
        speed: 3 + Math.random() * 3,
        alpha: 0.1 + Math.random() * 0.18
      });
    }
    for (let i = 0; i < 18; i++) {
      bubbles.push({
        x: Math.random() * root.clientWidth,
        y: Math.random() * root.clientHeight,
        r: 3 + Math.random() * 8,
        speed: 0.25 + Math.random() * 0.45,
        alpha: 0.08 + Math.random() * 0.12
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, root.clientWidth, root.clientHeight);

    for (const drop of drops) {
      ctx.strokeStyle = `rgba(220, 236, 255, ${drop.alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - 5, drop.y + drop.len);
      ctx.stroke();

      drop.y += drop.speed;
      drop.x -= 0.5;
      if (drop.y > root.clientHeight + 30) {
        drop.y = -20;
        drop.x = Math.random() * root.clientWidth;
      }
    }

    for (const bubble of bubbles) {
      ctx.strokeStyle = `rgba(208, 235, 255, ${bubble.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
      ctx.stroke();

      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.y * 0.01) * 0.18;
      if (bubble.y < -20) {
        bubble.y = root.clientHeight + 20;
        bubble.x = Math.random() * root.clientWidth;
      }
    }

    requestAnimationFrame(draw);
  };

  resize();
  seed();
  window.addEventListener("resize", () => {
    resize();
    seed();
  });
  draw();
})();
