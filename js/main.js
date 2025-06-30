// Load Tinylytics script function
function loadTinylyticsScript() {
  // Check if the script already exists to prevent duplicate loading
  if (!document.querySelector('script[src*="tinylytics.app/embed"]')) {
    const script = document.createElement('script');
    script.src = 'https://tinylytics.app/embed/SsEsEjyyoeL_2FbCdwC5.js?kudos&hits&countries';
    document.head.appendChild(script);
    console.log('Tinylytics script loaded');
  }
}

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
  
  // Show about modal by default and load Tinylytics
  setTimeout(() => {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
      aboutContent.style.display = 'block';
      loadTinylyticsScript();
    }
  }, 500); // Small delay to ensure DOM is fully ready
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
  profileContainer.style.display = 'flex';
  profileContainer.style.justifyContent = 'space-between';
  profileContainer.style.alignItems = 'center';
  
  // Create and add profile name as regular text
  const nameElement = document.createElement('span');
  nameElement.textContent = siteConfig.profile.name;
  
  // COMMENTED OUT: Bluesky SVG button functionality
  // // Create and add the Bsky link
  // const linkElement = document.createElement('a'); // Create the link element
  // linkElement.href = 'https://bsky.app/profile/did:plc:2p3gp2g2teuwpuv4skhiik3i'; // Set the href
  // linkElement.target = '_blank'; // Set the target to open in a new tab
  // linkElement.style.marginLeft = '5px'; // Add some left margin
  // linkElement.style.textDecoration = 'none'; // Remove text decoration
  // linkElement.title = "Bluesky"; // Set the title for hover
  // 
  // // Create the Bsky SVG element
  // const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // svgElement.setAttribute('viewBox', '0 0 600 530'); // Set the viewBox to match the path dimensions
  // svgElement.setAttribute('width', '18'); // Set the width to match the text size
  // svgElement.setAttribute('height', '16'); // Set the height to match the text size
  // svgElement.style.fill = 'var(--text-color)'; // Set the fill color to the current text color
  // svgElement.style.verticalAlign = 'middle'; // Align the SVG vertically with the text
  // svgElement.innerHTML = '<path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>'; // Add the path for the icon
  // 
  // // Add hover effect to change the fill color
  // svgElement.addEventListener('mouseover', function() {
  //   svgElement.style.fill = '#1185fe'; // Change to a different color on hover
  // });
  // 
  // svgElement.addEventListener('mouseout', function() {
  //   svgElement.style.fill = 'var(--text-color)'; // Revert to the original color on mouse out
  // });
  // 
  // // Append the SVG to the link
  // linkElement.appendChild(svgElement);
  // 
  // 
  // // Append the link to the name element
  // nameElement.appendChild(linkElement);
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
  // contentElement.style.padding = '15px';
  
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
    if (button.type === 'iframe' || button.type === 'projects') {
      sectionElement.className = 'content-section iframe-modal';
    } else {
      sectionElement.className = 'content-section';
    }
    
    // Create header
    const headerElement = document.createElement('div');
    headerElement.className = 'modal-header';
    
    // Create a container for title and arrow button
    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';
    
    // Add title to the container
    const titleElement = document.createElement('h3');
    titleElement.className = 'modal-title';
    titleElement.textContent = button.title;
    titleContainer.appendChild(titleElement);
    
    // Add open-in-new-tab button for iframe modals (not for projects - they have their own action buttons)
    if (button.type === 'iframe') {
      const openInNewTabButton = document.createElement('button');
      openInNewTabButton.className = 'open-in-new-tab-btn';
      openInNewTabButton.textContent = '→';
      openInNewTabButton.addEventListener('click', function(e) {
        // Prevent event from bubbling up to parent elements
        e.stopPropagation();
        // Open iframe URL in a new tab
        window.open(button.iframe.src, '_blank');
      });
      titleContainer.appendChild(openInNewTabButton);
    }
    
    // Add title container to header
    headerElement.appendChild(titleContainer);
    
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
    } else if (button.type === 'social') {
      // Create social content with two columns
      const socialContent = document.createElement('div');
      socialContent.className = 'social-content';
      
      const socialColumns = document.createElement('div');
      socialColumns.className = 'social-columns';
      
      // Add each column
      button.socialColumns.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'social-column';
        
        // Add column title
        const columnTitle = document.createElement('h4');
        columnTitle.textContent = column.title;
        columnDiv.appendChild(columnTitle);
        
        // Add column links
        const columnList = document.createElement('ul');
        column.links.forEach(link => {
          const listItem = document.createElement('li');
          const linkElement = document.createElement('a');
          linkElement.href = link.url;
          linkElement.target = '_blank';
          linkElement.textContent = link.text;
          
          listItem.appendChild(linkElement);
          columnList.appendChild(listItem);
        });
        
        columnDiv.appendChild(columnList);
        socialColumns.appendChild(columnDiv);
      });
      
      socialContent.appendChild(socialColumns);
      sectionElement.appendChild(socialContent);
    } else if (button.type === 'projects') {
      // Create projects content with tabs
      const projectsContent = document.createElement('div');
      projectsContent.className = 'projects-content';
      
      // Create project tabs
      const projectTabs = document.createElement('div');
      projectTabs.className = 'project-tabs';
      
      button.projects.forEach((project, index) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = 'tab-btn';
        if (index === 0) tabBtn.classList.add('active');
        tabBtn.textContent = project.title;
        tabBtn.setAttribute('data-project', project.id);
        projectTabs.appendChild(tabBtn);
      });
      
      // Create project content area
      const projectContentArea = document.createElement('div');
      projectContentArea.className = 'project-content-area';
      
      // Create individual project contents
      button.projects.forEach((project, index) => {
        const projectContent = document.createElement('div');
        projectContent.id = project.id;
        projectContent.className = 'project-content';
        if (index === 0) projectContent.classList.add('active');
        
        // Create project info section
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        
        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description;
        projectInfo.appendChild(projectDescription);
        
        // Create project actions
        const projectActions = document.createElement('div');
        projectActions.className = 'project-actions';
        
        project.actions.forEach(action => {
          const actionBtn = document.createElement('button');
          actionBtn.className = 'action-btn';
          actionBtn.textContent = action.text;
          actionBtn.addEventListener('click', () => {
            window.open(action.url, '_blank');
          });
          projectActions.appendChild(actionBtn);
        });
        
        projectInfo.appendChild(projectActions);
        projectContent.appendChild(projectInfo);
        
        // Create iframe container
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';
        
        const iframe = document.createElement('iframe');
        iframe.setAttribute('data-src', project.iframe);
        iframe.src = 'about:blank';
        iframe.title = project.title;
        iframe.frameBorder = '0';
        
        iframeContainer.appendChild(iframe);
        projectContent.appendChild(iframeContainer);
        
        projectContentArea.appendChild(projectContent);
      });
      
      projectsContent.appendChild(projectTabs);
      projectsContent.appendChild(projectContentArea);
      sectionElement.appendChild(projectsContent);
      
      // Add tab click handlers
      projectTabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
          const targetProjectId = e.target.getAttribute('data-project');
          
          // Remove active class from all tabs and contents
          projectTabs.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
          projectContentArea.querySelectorAll('.project-content').forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding content
          e.target.classList.add('active');
          const targetContent = document.getElementById(targetProjectId);
          targetContent.classList.add('active');
          
          // Load iframe if needed
          const iframe = targetContent.querySelector('iframe');
          if (iframe && iframe.hasAttribute('data-src') && iframe.src === 'about:blank') {
            iframe.src = iframe.getAttribute('data-src');
          }
        }
      });
    } else if (button.type === 'iframe') {
      // Create iframe container
      const iframeContainer = document.createElement('div');
      iframeContainer.className = 'iframe-container';
      
      // Create iframe with lazy loading
      const iframe = document.createElement('iframe');
      iframe.setAttribute('data-src', button.iframe.src); // Store URL in data attribute
      iframe.src = 'about:blank'; // Empty initial source
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
        
        // Check if this section contains an iframe and load it if needed
        const iframe = targetContent.querySelector('iframe');
        if (iframe && iframe.hasAttribute('data-src') && iframe.src === 'about:blank') {
          iframe.src = iframe.getAttribute('data-src');
        }
        
        // For projects modal, load the first active project iframe
        if (targetContent.classList.contains('iframe-modal')) {
          const activeProjectContent = targetContent.querySelector('.project-content.active');
          if (activeProjectContent) {
            const projectIframe = activeProjectContent.querySelector('iframe');
            if (projectIframe && projectIframe.hasAttribute('data-src') && projectIframe.src === 'about:blank') {
              projectIframe.src = projectIframe.getAttribute('data-src');
            }
          }
        }
        
        // If this is the about content, load the Tinylytics script
        if (targetId === 'about-content') {
          loadTinylyticsScript();
        }
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
        
        // Check if this section contains an iframe and load it if needed
        const iframe = targetContent.querySelector('iframe');
        if (iframe && iframe.hasAttribute('data-src') && iframe.src === 'about:blank') {
          iframe.src = iframe.getAttribute('data-src');
        }
        
        // For projects modal, load the first active project iframe
        if (targetContent.classList.contains('iframe-modal')) {
          const activeProjectContent = targetContent.querySelector('.project-content.active');
          if (activeProjectContent) {
            const projectIframe = activeProjectContent.querySelector('iframe');
            if (projectIframe && projectIframe.hasAttribute('data-src') && projectIframe.src === 'about:blank') {
              projectIframe.src = projectIframe.getAttribute('data-src');
            }
          }
        }
        
        // If this is the about content, load the Tinylytics script
        if (targetId === 'about-content') {
          loadTinylyticsScript();
        }
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
