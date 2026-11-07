// G.Gagandeep Portfolio - Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initMobileDrawer();
  initSkillsFilter();
  initScrollSpy();
});

// ==========================================================================
// Copy Email to Clipboard with Toast
// ==========================================================================

function copyEmailToClipboard() {
  const email = 'gaganmom80199@gmail.com';
  const copyBtnText = document.getElementById('copy-email-text');

  navigator.clipboard.writeText(email).then(() => {
    if (copyBtnText) copyBtnText.textContent = 'Copied!';
    showToast('Email copied: ' + email);

    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copy Email';
    }, 2500);
  }).catch(() => {
    // Fallback for older environments
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    if (copyBtnText) copyBtnText.textContent = 'Copied!';
    showToast('Email copied: ' + email);

    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copy Email';
    }, 2500);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================================================
// Mobile Navigation Drawer
// ==========================================================================

function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-item');

  if (!hamburgerBtn || !drawer) return;

  hamburgerBtn.addEventListener('click', () => {
    drawer.classList.add('open');
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

// ==========================================================================
// Skills Filter
// ==========================================================================

function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.skill-tab');
  const skillBadges = document.querySelectorAll('.skill-badge');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillBadges.forEach(badge => {
        const category = badge.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          badge.style.display = 'flex';
          badge.style.opacity = '1';
        } else {
          badge.style.display = 'none';
          badge.style.opacity = '0';
        }
      });
    });
  });
}

// ==========================================================================
// Contact Form Submission Handler
// ==========================================================================

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const subject = document.getElementById('sender-subject').value.trim();
  const message = document.getElementById('sender-message').value.trim();

  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !message) {
    if (feedback) {
      feedback.textContent = 'Please fill out all required fields.';
      feedback.className = 'form-feedback';
      feedback.style.color = '#f87171';
    }
    return;
  }

  // Construct mailto URL
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
  const mailtoUrl = `mailto:gaganmom80199@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  if (feedback) {
    feedback.textContent = 'Opening your email client to send message to gaganmom80199@gmail.com...';
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';
  }

  showToast('Launching email client...');
  window.location.href = mailtoUrl;
}

// ==========================================================================
// Interactive Constellation Particle Canvas
// ==========================================================================

function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 110) * 0.15})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================================================
// ScrollSpy for Active Nav Links
// ==========================================================================

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

