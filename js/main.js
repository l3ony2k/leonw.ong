// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the site
  initializeSite();
});

function initializeSite() {
  // Initialize theme from localStorage or system preference
  initializeTheme();
  
  // Generate profile content
  generateProfile();
  
  // Generate buttons
  generateButtons();
  
  // Generate content sections
  generateContentSections();
  
  // Add theme toggle button
  addThemeToggleButton();
  
  // Set up event listeners
  setupEventListeners();
}

// Initialize theme based on localStorage or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

// Add theme toggle button
function addThemeToggleButton() {
  const buttonContainer = document.getElementById('button-container');
  
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  
  // Get initial theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'system';
  themeToggle.textContent = currentTheme;
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'system';
    let newTheme;
    
    // Rotate through themes: system -> light -> dark -> system
    switch (currentTheme) {
      case 'system':
        newTheme = 'light';
        break;
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'system';
        break;
      default:
        newTheme = 'system';
    }
    
    // Update theme and button text
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme;
  });
  
  buttonContainer.appendChild(themeToggle);
}

// Generate profile content in the header
function generateProfile() {
  const profileContainer = document.getElementById('profile-container');
  
  // Set the profile container to flex layout
  // profileContainer.style.display = 'flex';
  // profileContainer.style.justifyContent = 'space-between';
  // profileContainer.style.alignItems = 'center';
  
  // Create and add profile name as regular text
  const nameElement = document.createElement('div');
  nameElement.textContent = siteConfig.profile.name;
  nameElement.className = 'profile-name';
  
  // Create about button
  const aboutButton = document.createElement('span');
  aboutButton.className = 'btn';
  aboutButton.setAttribute('data-target', 'about-content');
  aboutButton.textContent = 'about';
  
  // Append elements to profile container
  profileContainer.appendChild(nameElement);
  profileContainer.appendChild(aboutButton);
  
  // Generate the about content section
  generateAboutSection();
}

// Generate the about section modal
function generateAboutSection() {
  const contentContainer = document.getElementById('content-container');
  
  // Create content section wrapper
  const sectionElement = document.createElement('div');
  sectionElement.id = 'about-content';
  sectionElement.style.display = 'none';
  sectionElement.className = 'content-section about-modal';
  
  // Create header
  const headerElement = document.createElement('div');
  headerElement.className = 'modal-header';
  
  // Add title
  const titleElement = document.createElement('h3');
  titleElement.className = 'modal-title';
  titleElement.textContent = siteConfig.about.title;
  headerElement.appendChild(titleElement);
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn';
  closeButton.setAttribute('data-target', 'about-content');
  closeButton.textContent = '×';
  headerElement.appendChild(closeButton);
  
  // Add header to section
  sectionElement.appendChild(headerElement);
  
  // Create and add content container
  const contentElement = document.createElement('div');
  contentElement.className = 'about-content';
  contentElement.style.padding = '15px';
  
  // Use innerHTML to allow HTML content
  contentElement.innerHTML = siteConfig.about.content;
  
  sectionElement.appendChild(contentElement);
  
  // Add the about section to the content container
  contentContainer.appendChild(sectionElement);
}

// Generate buttons based on config
function generateButtons() {
  const buttonContainer = document.getElementById('button-container');
  
  // Create a container for the left-side buttons
  const buttonsLeft = document.createElement('div');
  buttonsLeft.className = 'buttons-left';
  
  // Create buttons based on config
  siteConfig.buttons.forEach(button => {
    const buttonElement = document.createElement('span');
    buttonElement.className = 'btn';
    buttonElement.setAttribute('data-target', `${button.id}-content`);
    buttonElement.textContent = button.label;
    
    buttonsLeft.appendChild(buttonElement);
  });
  
  // Add the buttons-left container to the main button container
  buttonContainer.appendChild(buttonsLeft);
}

// Generate content sections based on config
function generateContentSections() {
  const contentContainer = document.getElementById('content-container');
  
  // Create content sections for each button
  siteConfig.buttons.forEach(button => {
    // Create content section wrapper
    const sectionElement = document.createElement('div');
    sectionElement.id = `${button.id}-content`;
    sectionElement.style.display = 'none'; // Ensure all sections are hidden by default
    
    // Add appropriate class based on type
    if (button.type === 'iframe') {
      sectionElement.className = 'content-section iframe-modal';
    } else {
      sectionElement.className = 'content-section';
    }
    
    // Create header
    const headerElement = document.createElement('div');
    headerElement.className = 'modal-header';
    
    // Add title
    const titleElement = document.createElement('h3');
    titleElement.className = 'modal-title';
    titleElement.textContent = button.title;
    headerElement.appendChild(titleElement);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.setAttribute('data-target', `${button.id}-content`);
    closeButton.textContent = '×';
    headerElement.appendChild(closeButton);
    
    // Add header to section
    sectionElement.appendChild(headerElement);
    
    // Add content based on type
    if (button.type === 'links') {
      // Create list
      const listElement = document.createElement('ul');
      
      // Add list items
      button.links.forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.textContent = link.text;
        
        listItem.appendChild(linkElement);
        listElement.appendChild(listItem);
      });
      
      sectionElement.appendChild(listElement);
    } else if (button.type === 'iframe') {
      // Create iframe container
      const iframeContainer = document.createElement('div');
      iframeContainer.className = 'iframe-container';
      
      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = button.iframe.src;
      iframe.width = button.iframe.width || '100%';
      iframe.frameBorder = '0';
      
      iframeContainer.appendChild(iframe);
      sectionElement.appendChild(iframeContainer);
    }
    
    // Add content section to container
    contentContainer.appendChild(sectionElement);
  });
}

// Set up event listeners for buttons and close buttons
function setupEventListeners() {
  // Add event listeners to all buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      // Get the target content section ID
      const targetId = this.getAttribute('data-target');
      // Get all content sections
      const allContentSections = document.querySelectorAll('.content-section');
      
      // Get the target content section
      const targetContent = document.getElementById(targetId);
      
      // Check if the target content is already visible
      const isVisible = targetContent.style.display === 'block';
      
      // First, hide all content sections
      allContentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // If the clicked content wasn't already visible, show it
      if (!isVisible) {
        targetContent.style.display = 'block';
      }
      // If it was visible, it will remain hidden (toggle behavior)
    });
  });

  // Add event listeners to all close buttons
  document.querySelectorAll('.close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      // Get the target content section ID
      const targetId = this.getAttribute('data-target');
      // Get the target content section
      const targetContent = document.getElementById(targetId);
      // Hide the content section
      targetContent.style.display = 'none';
    });
  });
  
  // Need to re-run this for dynamically created elements
  document.addEventListener('DOMNodeInserted', function(e) {
    if (e.target.classList && (e.target.classList.contains('close-btn') || e.target.classList.contains('btn'))) {
      setupButtonListener(e.target);
    }
  });
}

// Set up listener for a specific button
function setupButtonListener(button) {
  if (button.classList.contains('btn')) {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const allContentSections = document.querySelectorAll('.content-section');
      const targetContent = document.getElementById(targetId);
      const isVisible = targetContent.style.display === 'block';
      
      allContentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      if (!isVisible) {
        targetContent.style.display = 'block';
      }
    });
  } else if (button.classList.contains('close-btn')) {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      targetContent.style.display = 'none';
    });
  }
}
