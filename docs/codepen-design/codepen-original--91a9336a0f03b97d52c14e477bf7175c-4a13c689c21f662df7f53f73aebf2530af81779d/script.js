document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;
  let isScrolling = false;

  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    if (isScrolling) return;

    currentIndex = index;
    isScrolling = true;

    const card = cards[index];
    const cardWidth = card.offsetWidth;
    const cardLeft = card.offsetLeft;
    const carouselWidth = carousel.offsetWidth;

    // Center the card in the viewport
    const scrollPosition = cardLeft - (carouselWidth / 2) + (cardWidth / 2);

    // Use smoother animation with more steps
    const startPosition = carousel.scrollLeft;
    const distance = scrollPosition - startPosition;
    const duration = 500; // ms
    const steps = 30;
    const delay = duration / steps;

    let currentStep = 0;

    const smoothScroll = setInterval(() => {
      currentStep++;

      if (currentStep > steps) {
        clearInterval(smoothScroll);
        isScrolling = false;
        return;
      }

      // Use easeInOutCubic easing function for smoother animation
      let progress = currentStep / steps;
      progress = progress < 0.5 
        ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentPosition = startPosition + distance * progress;

      carousel.scrollLeft = currentPosition;
    }, delay);
  }

  // Find which card is most visible after scrolling
  function updateCurrentIndex() {
    if (isScrolling) return;

    const scrollPosition = carousel.scrollLeft;
    const viewportMiddle = scrollPosition + (carousel.offsetWidth / 2);

    let closestIndex = 0;
    let closestDistance = Math.abs(cards[0].offsetLeft + (cards[0].offsetWidth / 2) - viewportMiddle);

    cards.forEach((card, index) => {
      const cardMiddle = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(cardMiddle - viewportMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
    }
  }

  // Scroll to initial card (first card)
  setTimeout(() => {
    scrollToCard(0);
  }, 100);

  // Previous button
  prevBtn.addEventListener('click', () => {
    scrollToCard(currentIndex - 1);
  });

  // Next button
  nextBtn.addEventListener('click', () => {
    scrollToCard(currentIndex + 1);
  });

  // Update current index on scroll
  carousel.addEventListener('scroll', () => {
    if (!isScrolling) {
      updateCurrentIndex();
    }
  });

  // Debounce function to limit scroll events
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Use debounced version for scroll end detection
  const handleScrollEnd = debounce(() => {
    isScrolling = false;
    updateCurrentIndex();
  }, 100);

  carousel.addEventListener('scroll', handleScrollEnd);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      scrollToCard(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      scrollToCard(currentIndex + 1);
    }
  });

  // Touch swipe support
  let touchStartX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      scrollToCard(currentIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      scrollToCard(currentIndex - 1);
    }
  });
});