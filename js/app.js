/**
 * NovaTech Landing Page - Funcionalidades Interactivas
 * Developer 3: Implementación JavaScript
 * Git Flow: feature/interactividad-js
 */

// ==================== MENÚ MÓVIL RESPONSIVE ====================
/**
 * Maneja la funcionalidad del menú desplegable en dispositivos móviles
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  // Toggle del menú al hacer clic en el botón
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Alternar visibilidad del menú
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Actualizar atributo ARIA para accesibilidad
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Cerrar menú al hacer clic en cualquier enlace
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==================== SCROLL SUAVE ====================
/**
 * Habilita desplazamiento suave para enlaces de anclaje
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Saltar si el href es solo "#"
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Actualizar URL sin saltar
        history.pushState(null, null, href);
      }
    });
  });
}

// ==================== VALIDACIÓN DE FORMULARIO ====================
/**
 * Valida el formulario de contacto con mensajes dinámicos
 */
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  // Expresiones regulares para validación
  const patterns = {
    nombre: /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{3,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
    mensaje: /^.{10,500}$/
  };
  
  // Mensajes de error personalizados
  const errorMessages = {
    nombre: 'El nombre debe tener entre 3 y 50 caracteres y solo letras',
    email: 'Por favor ingresa un correo electrónico válido',
    telefono: 'Por favor ingresa un número de teléfono válido',
    asunto: 'Por favor selecciona un asunto',
    mensaje: 'El mensaje debe tener entre 10 y 500 caracteres',
    privacidad: 'Debes aceptar la política de privacidad'
  };
  
  // Función para mostrar error
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
    input.classList.remove('success');
  }
  
  // Función para mostrar éxito
  function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.classList.remove('error');
    input.classList.add('success');
  }
  
  // Validar campo individual
  function validateField(input) {
    const value = input.value.trim();
    const name = input.name;
    
    // Campo requerido vacío
    if (input.hasAttribute('required') && !value) {
      showError(input, `El campo ${input.previousElementSibling?.textContent || name} es obligatorio`);
      return false;
    }
    
    // Validar con patrón si existe
    if (value && patterns[name] && !patterns[name].test(value)) {
      showError(input, errorMessages[name]);
      return false;
    }
    
    // Validar select
    if (input.tagName === 'SELECT' && !value) {
      showError(input, errorMessages[name]);
      return false;
    }
    
    // Validar checkbox
    if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
      showError(input, errorMessages[name]);
      return false;
    }
    
    showSuccess(input);
    return true;
  }
  
  // Validación en tiempo real
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    // Validar al perder el foco
    input.addEventListener('blur', () => {
      if (input.value.trim() || input.hasAttribute('required')) {
        validateField(input);
      }
    });
    
    // Limpiar error al escribir
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Validar al enviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Mostrar mensaje de éxito
      showSuccessMessage();
      form.reset();
      
      // Limpiar clases de éxito
      inputs.forEach(input => {
        input.classList.remove('success', 'error');
      });
    } else {
      // Hacer scroll al primer error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });
  
  // Mostrar mensaje de éxito
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
      <p>✓ ¡Mensaje enviado correctamente!</p>
      <p>Te responderemos en menos de 24 horas.</p>
    `;
    
    form.insertAdjacentElement('beforebegin', successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
}

// ==================== BOTÓN CTA INTERACTIVO ====================
/**
 * Agrega efecto interactivo al botón CTA principal
 */
function initCTAButton() {
  const ctaButtons = document.querySelectorAll('.btn-primary');
  
  ctaButtons.forEach(button => {
    // Efecto ripple al hacer clic
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
    
    // Animación hover
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ==================== ANIMACIONES POR SCROLL ====================
/**
 * Activa animaciones cuando los elementos entran en el viewport
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animar hijos con delay si existen
        const children = entry.target.querySelectorAll('.beneficio, .testimonio, .caracteristica');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    });
  }, observerOptions);
  
  // Observar secciones principales
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('animate-ready');
    observer.observe(section);
  });
  
  // Observar elementos individuales
  const animateElements = document.querySelectorAll('.beneficio, .testimonio, .caracteristica');
  animateElements.forEach(element => {
    element.classList.add('animate-ready');
  });
}

// ==================== CONTADOR ANIMADO ====================
/**
 * Anima contadores numéricos cuando entran en el viewport
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString('es-ES');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString('es-ES');
      }
    };
    
    updateCounter();
  };
  
  // Observar contadores
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ==================== MODAL EMERGENTE ====================
/**
 * Controla la apertura y cierre del modal
 */
function initModal() {
  const modal = document.getElementById('demo-modal');
  if (!modal) return;
  
  const closeBtn = modal.querySelector('.modal-close');
  const modalCTA = modal.querySelector('.modal-cta');
  
  // Función para abrir modal
  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
  
  // Función para cerrar modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Abrir modal automáticamente después de 10 segundos
  setTimeout(() => {
    // Solo mostrar si el usuario no ha interactuado con el formulario
    const hasInteracted = sessionStorage.getItem('modal-shown');
    if (!hasInteracted) {
      openModal();
      sessionStorage.setItem('modal-shown', 'true');
    }
  }, 10000);
  
  // Cerrar con botón X
  closeBtn.addEventListener('click', closeModal);
  
  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // CTA del modal redirige al formulario
  modalCTA.addEventListener('click', () => {
    closeModal();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Trigger manual para abrir modal (puede usarse en otros botones)
  window.openDemoModal = openModal;
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initFormValidation();
  initCTAButton();
  initScrollAnimations();
  initAnimatedCounters();
  initModal();
});
