/**
 * Shashank Chawale — Portfolio Website
 * Main JavaScript: Navigation, Scroll Animations, Form Validation, Interactive Search & Tags
 */

(function () {
  'use strict';

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  const inquiryForm = document.getElementById('inquiryForm');
  const formMessage = document.getElementById('formMessage');
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  const heroTags = document.querySelectorAll('.hero-tag');

  /* ============================================================
     NAVBAR — Scroll Effect
     ============================================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ============================================================
     MOBILE NAVIGATION
     ============================================================ */
  function toggleMobileNav() {
    const isActive = mobileNav.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  /* ============================================================
     ACTIVE NAV LINK — Intersection Observer
     ============================================================ */
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links a');

  const sectionObserverOptions = {
    root: null,
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ============================================================
     SCROLL REVEAL ANIMATIONS
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.05
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ============================================================
     HERO SEARCH & QUICK TAGS INTERACTIVITY
     ============================================================ */
  function handleHeroQuery() {
    const query = heroSearchInput ? heroSearchInput.value.trim() : '';
    const inquirySection = document.getElementById('inquiry');
    const descField = document.getElementById('formDescription');
    const typeSelect = document.getElementById('formType');

    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });

      if (descField && query) {
        descField.value = 'I am looking for: ' + query;
        descField.focus();
      } else if (descField) {
        descField.focus();
      }

      // Auto-detect type from query keywords
      if (typeSelect && query) {
        const lower = query.toLowerCase();
        if (lower.includes('e-commerce') || lower.includes('store') || lower.includes('shop')) {
          typeSelect.value = 'E-commerce Website';
        } else if (lower.includes('ai') || lower.includes('ml') || lower.includes('model') || lower.includes('data')) {
          typeSelect.value = 'AI/ML Application';
        } else if (lower.includes('portfolio') || lower.includes('personal') || lower.includes('resume')) {
          typeSelect.value = 'Portfolio Website';
        } else if (lower.includes('redesign') || lower.includes('rebuild')) {
          typeSelect.value = 'Website Redesign';
        } else if (lower.includes('business') || lower.includes('company')) {
          typeSelect.value = 'Business Website';
        }
      }
    }
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleHeroQuery();
      }
    });
  }

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handleHeroQuery();
    });
  }

  // Quick Tags Click
  heroTags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      const serviceName = this.getAttribute('data-service');
      const inquirySection = document.getElementById('inquiry');
      const typeSelect = document.getElementById('formType');
      const descField = document.getElementById('formDescription');

      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: 'smooth' });
        if (typeSelect && serviceName) {
          typeSelect.value = serviceName;
        }
        if (descField) {
          descField.value = 'Interested in starting a project for: ' + this.textContent.trim();
          descField.focus();
        }
      }
    });
  });

  /* ============================================================
     GLOBAL PREFILL HELPER
     ============================================================ */
  window.prefillInquiry = function (topic, typeValue) {
    const inquirySection = document.getElementById('inquiry');
    const descField = document.getElementById('formDescription');
    const typeSelect = document.getElementById('formType');

    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
      if (typeSelect && typeValue) {
        typeSelect.value = typeValue;
      }
      if (descField && topic) {
        descField.value = 'Inquiring regarding: ' + topic + ' — ';
        descField.focus();
      }
    }
  };

  /* ============================================================
     FORM VALIDATION & SUBMISSION
     ============================================================ */
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      formMessage.className = 'form-message';
      formMessage.textContent = '';
      formMessage.style.display = 'none';

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const type = document.getElementById('formType').value;
      const description = document.getElementById('formDescription').value.trim();

      const errors = [];

      if (!name) {
        errors.push('Please enter your name.');
      }

      if (!email) {
        errors.push('Please enter your email address.');
      } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address.');
      }

      if (!type) {
        errors.push('Please select a website type.');
      }

      if (!description) {
        errors.push('Please describe your project.');
      } else if (description.length < 15) {
        errors.push('Please provide a slightly more detailed project description.');
      }

      if (errors.length > 0) {
        showFormMessage(errors.join(' '), 'error');
        return;
      }

      const submitBtn = document.getElementById('formSubmitBtn');
      submitBtn.textContent = 'Sending Inquiry...';
      submitBtn.disabled = true;

      setTimeout(function () {
        showFormMessage(
          'Thank you, ' + name + '! Your project inquiry has been received. I will review your requirements and respond within 24 hours.',
          'success'
        );
        submitBtn.textContent = 'Send Project Inquiry →';
        submitBtn.disabled = false;
        inquiryForm.reset();
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ============================================================
     PRELOAD / INITIAL REVEAL
     ============================================================ */
  window.addEventListener('load', function () {
    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  });

})();
