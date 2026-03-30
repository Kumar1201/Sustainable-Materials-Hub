(function() {
  const getStartedBtn = document.getElementById('getStarted');
  const learnMoreBtn = document.getElementById('learnMore');

  // Smooth transition to main app or features
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      // Animate button
      getStartedBtn.style.transform = 'scale(0.98)';
      setTimeout(() => {
        getStartedBtn.style.transform = '';
        // Navigate to main app view
        window.location.href = 'app.html';
      }, 200);
    });
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      // Animate button
      learnMoreBtn.style.transform = 'scale(0.98)';
      setTimeout(() => {
        learnMoreBtn.style.transform = '';
        // Navigate to features page
        window.location.href = 'features.html';
      }, 200);
    });
  }

  // Add subtle animation to feature icons
  document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    setTimeout(() => {
      feature.style.transition = 'all 0.6s ease-out';
      feature.style.opacity = '1';
      feature.style.transform = 'translateY(0)';
    }, 300 + index * 100);
  });
})();