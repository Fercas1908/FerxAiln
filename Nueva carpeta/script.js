const heartStamp = document.querySelector('.opening-stamp');
if (heartStamp) {
  heartStamp.style.setProperty('--heart-scale', '1');
}


document.querySelectorAll('.photo-input').forEach((input) => {
  input.addEventListener('change', () => {
    const frame = input.closest('.photo-drop');
    const image = frame.querySelector('img');
    const file = input.files[0];
    if (!file) return;
    image.src = URL.createObjectURL(file);
    image.alt = 'Uploaded memory';
    frame.classList.add('has-image');
  });
});

const videoInput = document.querySelector('#video-input');
const videoFrame = document.querySelector('.video-frame');
const videoPlayer = document.querySelector('#video-player');

if (videoInput && videoFrame && videoPlayer) {
  videoInput.addEventListener('change', () => {
    const file = videoInput.files[0];
    if (!file) return;
    videoPlayer.src = URL.createObjectURL(file);
    videoFrame.classList.add('has-video');
  });
}

const carousel = document.querySelector('#memory-carousel');
if (carousel) {
  const cards = [...carousel.querySelectorAll('.polaroid-card')];
  const dots = [...document.querySelectorAll('.carousel-dots span')];
  let activeCard = 0;

  const updateCarousel = () => {
    cards.forEach((card, index) => {
      const offset = index - activeCard;
      const normalized = Math.max(-2, Math.min(2, offset));
      card.dataset.position = String(normalized);
      card.classList.toggle('is-active', index === activeCard);
      card.setAttribute('aria-hidden', index === activeCard ? 'false' : 'true');
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeCard);
    });
  };

  const moveCarousel = (direction) => {
    activeCard = Math.max(0, Math.min(cards.length - 1, activeCard + direction));
    updateCarousel();
  };

  let swipeStartX = 0;
  let swipeStartY = 0;
  carousel.addEventListener('pointerdown', (event) => {
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    carousel.setPointerCapture(event.pointerId);
  });
  carousel.addEventListener('pointerup', (event) => {
    const deltaX = event.clientX - swipeStartX;
    const deltaY = event.clientY - swipeStartY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      moveCarousel(deltaX < 0 ? 1 : -1);
    }
  });

  carousel.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) < 8) return;
    moveCarousel(event.deltaY < 0 ? -1 : 1);
  }, { passive: false });

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== activeCard) {
        activeCard = index;
        updateCarousel();
      }
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activeCard = index;
      updateCarousel();
    });
  });

  updateCarousel();
}

