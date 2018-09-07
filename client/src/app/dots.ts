'use strict';

function create(canvasEl, numDots, numEmpties, fps, centerDot=false) {

  // Push dots to array
  let empties = 0,
      dots = [],
      ctx = canvasEl.getContext('2d');
  for (var i = 0; i < numDots; i++) {

    let dot = {
      x: (Math.random() * canvasEl.width - 30) + 30,
      y: (Math.random() * (canvasEl.height - 30)) + 30,
      radius: Math.random() * 3 + 5,
      vx: Math.floor(Math.random() * 50) - 30,
      vy: Math.floor(Math.random() * 50) + 30,
      fill: null
    };

    dot.fill = (empties < numEmpties) ? '#fff' : '#0000ff';
    dots.push(dot);
    empties++;
  }
  
  // Randomize array
  if(!centerDot)
    dots.sort(() => Math.random() - 0.5);
  
  // Draw the scene
  var draw = function() {

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = dots.length; i < x; i++) {
      var s = dots[i];

      ctx.fillStyle = s.fill;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#0000ff';
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.fillStyle = '#0000ff';
      ctx.stroke();

      if(centerDot) {

        ctx.beginPath();
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(dots[0].x, dots[0].y);

        ctx.lineWidth = 0.6;
        ctx.strokeStyle = 'black';
        ctx.stroke();

      }

    }

    if(centerDot)
      return;

    ctx.beginPath();

    for (var j = 0, x = dots.length; j < x; j++) {

      var starII = dots[j];
      ctx.lineTo(starII.x, starII.y);

    }

    ctx.lineWidth = 0.6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

  };

  // Update dot locations
  var update = function() {

    for (var i = 0, x = dots.length; i < x; i++) {
      var s = dots[i];

      if(centerDot && i === 0) {
        s.x += s.vx / (fps + 300);
        s.y += s.vy / (fps + 300);
      } else {
        s.x += s.vx / fps;
        s.y += s.vy / fps;
      }

      if (s.x < 30 || s.x > canvasEl.width - 30) s.vx = -s.vx;
      if (s.y < 30 || s.y > canvasEl.height - 30) s.vy = -s.vy;
    }

  };

  // Update and draw
  var tick = function() {
    draw();
    update();
    requestAnimationFrame(tick);
  };

  tick();

}

export {create};