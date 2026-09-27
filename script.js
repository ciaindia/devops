// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Mobile Sidebar Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
  }

  menuToggle.addEventListener('click', toggleSidebar);
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }

  // Close sidebar when clicking a link on mobile
  const navLinksList = document.querySelectorAll('.nav-links a');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('open');
      }
    });
  });

  // Search Functionality
  const searchInput = document.getElementById('search-input');
  const sections = document.querySelectorAll('section');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filter Navigation & Content
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const text = section.textContent.toLowerCase();
      const navItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (text.includes(query)) {
        section.style.display = 'block';
        if (navItem) navItem.parentElement.style.display = 'block';
      } else {
        section.style.display = 'none';
        if (navItem) navItem.parentElement.style.display = 'none';
      }
    });
  });

  // Active Navigation Highlight on Scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            // Scroll sidebar to active link if it's out of view
            const linkRect = link.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            if (linkRect.bottom > sidebarRect.bottom || linkRect.top < sidebarRect.top) {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Copy Code Button
  const preBlocks = document.querySelectorAll('pre');

  preBlocks.forEach(pre => {
    const code = pre.querySelector('code');
    if (code) {
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.innerText = 'Copy';
      
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code.innerText).then(() => {
          button.innerText = 'Copied!';
          setTimeout(() => {
            button.innerText = 'Copy';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy', err);
        });
      });
      
      pre.appendChild(button);
    }
  });

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
