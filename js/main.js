// Golden Layout instance
let layout;

// Load Tinylytics script function
function loadTinylyticsScript() {
  if (!document.querySelector('script[src*="tinylytics.app/embed"]')) {
    const script = document.createElement('script');
    script.src = 'https://tinylytics.app/embed/SsEsEjyyoeL_2FbCdwC5.js?kudos&hits&countries';
    document.head.appendChild(script);
    console.log('Tinylytics script loaded');
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSite();
});

function initializeSite() {
  // Initialize theme from localStorage or system preference
  initializeTheme();
  
  // Set up theme toggle
  setupThemeToggle();
  
  // Initialize Golden Layout
  initializeGoldenLayout();
  
  // Load Tinylytics after a short delay
  setTimeout(() => {
    loadTinylyticsScript();
  }, 1000);
}

// Initialize theme based on localStorage or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleText(savedTheme);
  }
}

// Set up theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
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
    updateThemeToggleText(newTheme);
  });
}

function updateThemeToggleText(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.textContent = theme;
}

// Initialize Golden Layout
function initializeGoldenLayout() {
  const container = document.getElementById('golden-layout-container');
  
  console.log('Initializing Golden Layout...');
  console.log('Container:', container);
  console.log('GoldenLayout available:', typeof GoldenLayout);
  
  // Check if Golden Layout is available
  if (typeof GoldenLayout === 'undefined') {
    console.error('Golden Layout not loaded, using fallback');
    createFallbackLayout(container);
    return;
  }

  // Default layout configuration
  const defaultConfig = {
    root: {
      type: 'row',
      content: [
        {
          type: 'column',
          width: 30,
          content: [
            {
              type: 'component',
              componentType: 'about',
              title: 'About',
              height: 60
            },
            {
              type: 'component',
              componentType: 'social',
              title: 'Social',
              height: 40
            }
          ]
        },
        {
          type: 'column',
          width: 70,
          content: [
            {
              type: 'stack',
              content: [
                {
                  type: 'component',
                  componentType: 'projects',
                  title: 'Projects'
                },
                {
                  type: 'component',
                  componentType: 'blog',
                  title: 'Blog'
                },
                {
                  type: 'component',
                  componentType: 'mail',
                  title: 'Mail'
                }
              ]
            }
          ]
        }
      ]
    }
  };

  // Always use default config for now to debug
  let config = defaultConfig;

  try {
    // Create Golden Layout instance
    layout = new GoldenLayout(config, container);
    console.log('Golden Layout instance created:', layout);

    // Register components
    registerComponents();
    console.log('Components registered');

    // Initialize the layout
    layout.init();
    console.log('Golden Layout initialized successfully');

    // Save layout on changes
    layout.on('stateChanged', () => {
      try {
        localStorage.setItem('goldenLayoutConfig', JSON.stringify(layout.toConfig()));
      } catch (e) {
        console.warn('Failed to save layout:', e);
      }
    });

  } catch (error) {
    console.error('Error initializing Golden Layout:', error);
    createFallbackLayout(container);
  }

  // Set up reset layout button
  document.getElementById('reset-layout-btn').addEventListener('click', () => {
    resetLayout();
  });
}

// Create a fallback layout when Golden Layout fails
function createFallbackLayout(container) {
  console.log('Creating fallback layout...');
  
  container.innerHTML = `
    <div class="fallback-layout">
      <div class="fallback-left-column">
        <div class="fallback-panel" id="about-panel">
          <div class="fallback-panel-header">
            <span class="fallback-panel-title">About</span>
          </div>
          <div class="fallback-panel-content" id="about-content"></div>
        </div>
        <div class="fallback-panel" id="social-panel">
          <div class="fallback-panel-header">
            <span class="fallback-panel-title">Social</span>
          </div>
          <div class="fallback-panel-content" id="social-content"></div>
        </div>
      </div>
      <div class="fallback-right-column">
        <div class="fallback-panel fallback-tabbed-panel">
          <div class="fallback-tabs">
            <button class="fallback-tab active" data-target="projects">Projects</button>
            <button class="fallback-tab" data-target="blog">Blog</button>
            <button class="fallback-tab" data-target="mail">Mail</button>
          </div>
          <div class="fallback-tab-content">
            <div class="fallback-tab-pane active" id="projects-pane"></div>
            <div class="fallback-tab-pane" id="blog-pane"></div>
            <div class="fallback-tab-pane" id="mail-pane"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Populate content
  document.getElementById('about-content').appendChild(createAboutContent());
  document.getElementById('social-content').appendChild(createSocialContent());
  document.getElementById('projects-pane').appendChild(createProjectsContent());
  document.getElementById('blog-pane').appendChild(createIframeContent('https://l3on.site/', 'Blog'));
  document.getElementById('mail-pane').appendChild(createIframeContent('https://letterbird.co/lok', 'Mail'));

  // Set up tab functionality
  setupFallbackTabs();
}

// Set up tab functionality for fallback layout
function setupFallbackTabs() {
  const tabs = document.querySelectorAll('.fallback-tab');
  const panes = document.querySelectorAll('.fallback-tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      
      // Remove active class from all tabs and panes
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding pane
      tab.classList.add('active');
      document.getElementById(`${target}-pane`).classList.add('active');
    });
  });
}

// Register all Golden Layout components
function registerComponents() {
  // About component
  layout.registerComponent('about', function(container) {
    const content = createAboutContent();
    container.getElement().appendChild(content);
  });

  // Social component
  layout.registerComponent('social', function(container) {
    const content = createSocialContent();
    container.getElement().appendChild(content);
  });

  // Projects component
  layout.registerComponent('projects', function(container) {
    const content = createProjectsContent();
    container.getElement().appendChild(content);
  });

  // Blog component
  layout.registerComponent('blog', function(container) {
    const content = createIframeContent('https://l3on.site/', 'Blog');
    container.getElement().appendChild(content);
  });

  // Mail component
  layout.registerComponent('mail', function(container) {
    const content = createIframeContent('https://letterbird.co/lok', 'Mail');
    container.getElement().appendChild(content);
  });
}

// Create About content
function createAboutContent() {
  const wrapper = document.createElement('div');
  wrapper.className = 'component-content about-component';
  
  const content = document.createElement('div');
  content.className = 'about-content';
  content.innerHTML = siteConfig.about.content;
  
  wrapper.appendChild(content);
  return wrapper;
}

// Create Social content
function createSocialContent() {
  const wrapper = document.createElement('div');
  wrapper.className = 'component-content social-component';
  
  const socialConfig = siteConfig.buttons.find(btn => btn.id === 'social');
  
  const socialColumns = document.createElement('div');
  socialColumns.className = 'social-columns';
  
  socialConfig.socialColumns.forEach(column => {
    const columnDiv = document.createElement('div');
    columnDiv.className = 'social-column';
    
    const columnTitle = document.createElement('h4');
    columnTitle.textContent = column.title;
    columnDiv.appendChild(columnTitle);
    
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
  
  wrapper.appendChild(socialColumns);
  return wrapper;
}

// Create Projects content
function createProjectsContent() {
  const wrapper = document.createElement('div');
  wrapper.className = 'component-content projects-component';
  
  const projectsConfig = siteConfig.buttons.find(btn => btn.id === 'projects');
  
  // Create project tabs
  const projectTabs = document.createElement('div');
  projectTabs.className = 'project-tabs';
  
  projectsConfig.projects.forEach((project, index) => {
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
  projectsConfig.projects.forEach((project, index) => {
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
  
  wrapper.appendChild(projectTabs);
  wrapper.appendChild(projectContentArea);
  
  // Add tab click handlers
  projectTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      const targetProjectId = e.target.getAttribute('data-project');
      
      // Remove active class from all tabs and contents
      projectTabs.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
      projectContentArea.querySelectorAll('.project-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      e.target.classList.add('active');
      const targetContent = wrapper.querySelector(`#${targetProjectId}`);
      targetContent.classList.add('active');
      
      // Load iframe if needed
      const iframe = targetContent.querySelector('iframe');
      if (iframe && iframe.hasAttribute('data-src') && iframe.src === 'about:blank') {
        iframe.src = iframe.getAttribute('data-src');
      }
    }
  });
  
  // Load first project iframe
  setTimeout(() => {
    const firstIframe = wrapper.querySelector('.project-content.active iframe');
    if (firstIframe && firstIframe.hasAttribute('data-src') && firstIframe.src === 'about:blank') {
      firstIframe.src = firstIframe.getAttribute('data-src');
    }
  }, 500);
  
  return wrapper;
}

// Create iframe content for blog/mail components
function createIframeContent(src, title) {
  const wrapper = document.createElement('div');
  wrapper.className = 'component-content iframe-component';
  
  const iframeContainer = document.createElement('div');
  iframeContainer.className = 'iframe-container';
  
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.frameBorder = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  
  iframeContainer.appendChild(iframe);
  wrapper.appendChild(iframeContainer);
  
  return wrapper;
}

// Reset layout to default
function resetLayout() {
  if (layout) {
    localStorage.removeItem('goldenLayoutConfig');
    location.reload(); // Simple way to reset - reload the page
  }
}