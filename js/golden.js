document.addEventListener('DOMContentLoaded', function() {
    let myLayout;
    const savedState = localStorage.getItem('savedState');

    // Define a function to create a component
    const createComponent = function(container, state) {
        const content = siteConfig[state.id];
        if (content) {
            if (state.id === 'about') {
                container.getElement().html(`
                    <div class="modal-header">
                        <h3 class="modal-title">${content.title}</h3>
                    </div>
                    <div class="about-content">${content.content}</div>
                `);
            } else if (state.id === 'projects') {
                // Simplified projects view for now
                let projectsHtml = `<div class="modal-header"><h3 class="modal-title">${siteConfig.buttons.find(b => b.id === 'projects').title}</h3></div><ul>`;
                siteConfig.buttons.find(b => b.id === 'projects').projects.forEach(project => {
                    projectsHtml += `<li><a href="${project.actions.find(a => a.text === 'Demo').url}" target="_blank">${project.title}</a></li>`;
                });
                projectsHtml += '</ul>';
                container.getElement().html(projectsHtml);
            } else if (state.id === 'social') {
                let socialHtml = `<div class="modal-header"><h3 class="modal-title">${siteConfig.buttons.find(b => b.id === 'social').title}</h3></div>`;
                siteConfig.buttons.find(b => b.id === 'social').socialColumns.forEach(column => {
                    socialHtml += `<h4>${column.title}</h4><ul>`;
                    column.links.forEach(link => {
                        socialHtml += `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`;
                    });
                    socialHtml += '</ul>';
                });
                container.getElement().html(socialHtml);
            }
        } else {
            container.getElement().html(`<h2>${state.label}</h2>`);
        }
    };

    const config = {
        content: [{
            type: 'row',
            content: [{
                type: 'stack',
                width: 25,
                content: [{
                    type: 'component',
                    componentName: 'component',
                    title: 'About',
                    componentState: { id: 'about', label: 'About' }
                }]
            }, {
                type: 'stack',
                width: 50,
                content: [{
                    type: 'component',
                    componentName: 'component',
                    title: 'Projects',
                    componentState: { id: 'projects', label: 'Projects' }
                }]
            }, {
                type: 'stack',
                width: 25,
                content: [{
                    type: 'component',
                    componentName: 'component',
                    title: 'Social',
                    componentState: { id: 'social', label: 'Social' }
                }]
            }]
        }]
    };

    if (savedState) {
        myLayout = new GoldenLayout(JSON.parse(savedState), document.getElementById('layout-container'));
    } else {
        myLayout = new GoldenLayout(config, document.getElementById('layout-container'));
    }

    myLayout.registerComponent('component', createComponent);

    myLayout.on('stateChanged', function() {
        const state = JSON.stringify(myLayout.toConfig());
        localStorage.setItem('savedState', state);
    });

    myLayout.init();

    window.addEventListener('resize', function() {
        myLayout.updateSize();
    });
});