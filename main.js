// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the site
  initializeSite();
});

function initializeSite() {
  // Generate profile content
  generateProfile();
  
  // Generate buttons
  generateButtons();
  
  // Generate content sections
  generateContentSections();
  
  // Set up event listeners
  setupEventListeners();
}

// Generate profile content in the header
function generateProfile() {
  const profileContainer = document.getElementById('profile-container');
  
  // Create and add profile elements
  const nameElement = document.createElement('h1');
  nameElement.textContent = siteConfig.profile.name;
  
  const bioElement = document.createElement('p');
  bioElement.textContent = siteConfig.profile.bio;
  
  // Append elements to profile container
  profileContainer.appendChild(nameElement);
  profileContainer.appendChild(bioElement);
}

// Generate buttons based on config
function generateButtons() {
  const buttonContainer = document.getElementById('button-container');
  const buttonWrapper = document.createElement('p');
  
  // Create buttons based on config
  siteConfig.buttons.forEach(button => {
    const buttonElement = document.createElement('span');
    buttonElement.className = 'btn';
    buttonElement.setAttribute('data-target', `${button.id}-content`);
    buttonElement.textContent = button.label;
    
    buttonWrapper.appendChild(buttonElement);
  });
  
  buttonContainer.appendChild(buttonWrapper);
}

// Generate content sections based on config
function generateContentSections() {
  const contentContainer = document.getElementById('content-container');
  
  // Create content sections for each button
  siteConfig.buttons.forEach(button => {
    // Create content section wrapper
    const sectionElement = document.createElement('div');
    sectionElement.id = `${button.id}-content`;
    sectionElement.className = 'content-section';
    
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
      iframe.width = button.iframe.width;
      iframe.height = button.iframe.height;
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
