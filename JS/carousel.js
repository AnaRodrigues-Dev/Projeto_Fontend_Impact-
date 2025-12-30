    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const wrapper = document.getElementById('carouselWrapper');
    const indicatorsContainer = document.getElementById('indicators');
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Cria os indicadores
    function createIndicators() {
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
      }
    }

    // Atualiza os indicadores
    function updateIndicators() {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    // Mudar slide
    function changeSlide(direction) {
      currentSlide += direction;

      if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
      } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
      }

      updateCarousel();
      resetAutoPlay();
    }

    // Ir para slide específico
    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
      resetAutoPlay();
    }

    // Atualizar carrossel
    function updateCarousel() {
      const offset = -currentSlide * 100;
      wrapper.style.transform = `translateX(${offset}%)`;
      updateIndicators();
    }

    // Auto play
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        changeSlide(1);
      }, 10000); // 10 segundos
    }

    // Resetar auto play
    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Inicializar
    createIndicators();
    startAutoPlay();

    // Pausar ao passar mouse
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
      startAutoPlay();
    });

    // Suporte para toque (mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        changeSlide(1); // Swipe left
      }
      if (touchEndX - touchStartX > 50) {
        changeSlide(-1); // Swipe right
      }
    }