/**
 * NovaTech Landing Page - Interactive Features
 * Developer 3: JavaScript Implementation
 * Git Flow: feature/interactividad-js
 */

// ==================== MOBILE MENU TOGGLE ====================
/**
 * Handles responsive mobile menu toggle functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu visibility
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Update ARIA attribute for accessibility
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});
