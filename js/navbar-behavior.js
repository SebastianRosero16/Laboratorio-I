document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});


/* ================= DEVELOPERS SECTION ================= */

function initDeveloperSection() {
  const buttons = document.querySelectorAll('.dev-btn');
  const detailContainer = document.getElementById('developer-detail');

  if (!buttons.length || !detailContainer) return;

  const developers = {
    dev2: `
      <h3>Héctor - Dev 2</h3>

      <p><strong>Perfil Profesional:</strong>
      Ingeniero de Software enfocado en arquitectura modular,
      organización de código y experiencia de usuario.</p>

      <h4>Formación</h4>
      <ul>
        <li>Ingeniería de Software</li>
        <li>Especialización en Desarrollo Web Frontend</li>
      </ul>

      <h4>Repositorios</h4>
      <ul>
        <li>
          <a href="https://github.com/tuusuario"
             target="_blank"
             rel="noopener noreferrer">
             GitHub Personal
          </a>
        </li>
      </ul>

      <h4>Aportes al Proyecto</h4>
      <ul>
        <li>Implementación de navbar dinámico con comportamiento en scroll.</li>
        <li>Fondo dinámico al superar cierto punto.</li>
        <li>Transición suave y sombra dinámica.</li>
        <li>Sección Developers modular y escalable.</li>
      </ul>
    `
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const devKey = button.dataset.dev;

      detailContainer.innerHTML = developers[devKey];
      detailContainer.style.display = 'block';

      detailContainer.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDeveloperSection();
});