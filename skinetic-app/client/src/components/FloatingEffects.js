import React, { useEffect } from "react";
import "../App.css";

const FloatingEffect = () => {
  useEffect(() => {
    const container = document.getElementById('floatingElements') || document.createElement('div');
    if (!document.getElementById('floatingElements')) {
      container.className = 'floating-elements';
      container.id = 'floatingElements';
      document.body.appendChild(container);
    }

    function createBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 40 + 20;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDuration = (Math.random() * 4 + 6) + 's';
      container.appendChild(bubble);
      setTimeout(() => bubble.remove(), 10000);
    }

    function createSerumDrop() {
      const drop = document.createElement('div');
      drop.className = 'serum-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 2 + 4) + 's';
      container.appendChild(drop);
      setTimeout(() => drop.remove(), 7000);
    }

    function createProductBottle() {
      const bottle = document.createElement('div');
      bottle.className = 'product-bottle';
      bottle.style.top = Math.random() * 80 + 10 + '%';
      bottle.style.animationDuration = (Math.random() * 5 + 12) + 's';
      container.appendChild(bottle);
      setTimeout(() => bottle.remove(), 18000);
    }

    function createSparkle() {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 3000);
    }

    function createCreamSwirl() {
      const swirl = document.createElement('div');
      swirl.className = 'cream-swirl';
      swirl.style.left = Math.random() * 100 + '%';
      swirl.style.top = Math.random() * 100 + '%';
      swirl.style.animationDelay = Math.random() * 4 + 's';
      container.appendChild(swirl);
      setTimeout(() => swirl.remove(), 4000);
    }

    const bubbleInterval = setInterval(createBubble, 1500);
    const dropInterval = setInterval(createSerumDrop, 800);
    const bottleInterval = setInterval(createProductBottle, 4000);
    const sparkleInterval = setInterval(createSparkle, 600);
    const swirlInterval = setInterval(createCreamSwirl, 2000);

    for (let i = 0; i < 5; i++) {
      setTimeout(createBubble, i * 300);
      setTimeout(createSparkle, i * 200);
    }
    for (let i = 0; i < 3; i++) {
      setTimeout(createSerumDrop, i * 500);
      setTimeout(createCreamSwirl, i * 800);
    }
    setTimeout(createProductBottle, 1000);

    return () => {
      clearInterval(bubbleInterval);
      clearInterval(dropInterval);
      clearInterval(bottleInterval);
      clearInterval(sparkleInterval);
      clearInterval(swirlInterval);
    };
  }, []);

  return null;
};

export default FloatingEffect;