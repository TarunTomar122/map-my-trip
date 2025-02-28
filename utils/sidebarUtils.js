// Format text into bullet points

export function formatTextToBullets(text) {
    if (!text) return '';
    
    // Remove any existing bullet points or special characters
    text = text.replace(/[â€•]/g, '').replace(/^[•\-\*]\s*/gm, '');
    
    // Split into sentences and create bullet points
    const sentences = text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);
    
    // Create HTML list
    return `<ul class="sidebar-bullets">
        ${sentences.map(point => `<li>${point}</li>`).join('')}
    </ul>`;
}

// Update sidebar content for a place
export function updateSidebarContent(place, isRestaurant = false) {
    const sidebar = document.getElementById('place-sidebar');
    const sidebarName = document.getElementById('sidebar-place-name');
    const sidebarDesc = document.getElementById('sidebar-description');
    const sidebarHowToReach = document.getElementById('sidebar-how-to-reach');
    const sidebarWhatToExpect = document.getElementById('sidebar-what-to-expect');
    const sidebarThingsToBeAwareOf = document.getElementById('sidebar-things-to-be-aware-of');
    
    if (isRestaurant) {
        // Restaurant-specific content
        sidebarName.setAttribute('data-type', 'restaurant');
        
        // Update section titles
        document.querySelector('.place-sidebar-section:nth-child(1) h3').textContent = 'Description';
        document.querySelector('.place-sidebar-section:nth-child(1) h3').setAttribute('data-type', 'restaurant-what-to-eat');
        
        document.querySelector('.place-sidebar-section:nth-child(2) h3').textContent = 'Why Go There';
        document.querySelector('.place-sidebar-section:nth-child(2) h3').setAttribute('data-type', 'restaurant-why-go');
        
        document.querySelector('.place-sidebar-section:nth-child(3) h3').textContent = 'What to Eat';
        document.querySelector('.place-sidebar-section:nth-child(3) h3').setAttribute('data-type', 'restaurant-menu');
        
        document.querySelector('.place-sidebar-section:nth-child(4) h3').textContent = 'Expenses & How to Reach';
        document.querySelector('.place-sidebar-section:nth-child(4) h3').setAttribute('data-type', 'restaurant-expenses');
        
        // Fill content
        sidebarDesc.innerHTML = formatTextToBullets(place.details.description);
        sidebarHowToReach.innerHTML = formatTextToBullets(place.details.whyGoThere + ' ' + place.details.bestDishes);
        sidebarWhatToExpect.innerHTML = formatTextToBullets(place.details.whatToEat);
        sidebarThingsToBeAwareOf.innerHTML = formatTextToBullets(place.details.expenses + ' ' + place.details.howToReach);
        
        // Set place name
        sidebarName.textContent = place.name;
    } else {
        // Regular place content
        sidebarName.removeAttribute('data-type');
        
        // Reset section titles
        document.querySelector('.place-sidebar-section:nth-child(1) h3').textContent = 'Description';
        document.querySelector('.place-sidebar-section:nth-child(1) h3').removeAttribute('data-type');
        document.querySelector('.place-sidebar-section:nth-child(2) h3').textContent = 'How to Reach';
        document.querySelector('.place-sidebar-section:nth-child(2) h3').removeAttribute('data-type');
        document.querySelector('.place-sidebar-section:nth-child(3) h3').textContent = 'What to Expect';
        document.querySelector('.place-sidebar-section:nth-child(3) h3').removeAttribute('data-type');
        document.querySelector('.place-sidebar-section:nth-child(4) h3').textContent = 'Things to be Aware of';
        document.querySelector('.place-sidebar-section:nth-child(4) h3').removeAttribute('data-type');
        
        // Fill content
        sidebarDesc.innerHTML = place.details.description;
        sidebarHowToReach.innerHTML = formatTextToBullets(place.details.howToReach);
        sidebarWhatToExpect.innerHTML = formatTextToBullets(place.details.whatToExpect);
        sidebarThingsToBeAwareOf.innerHTML = formatTextToBullets(place.details.thingsToBeAwareOf);
        
        // Set place name
        sidebarName.textContent = place.name;
    }
    
    // Show the sidebar
    sidebar.classList.add('visible');
    sidebar.classList.remove('hidden');
}

// Toggle sidebar visibility
export function toggleSidebar(visible = true) {
    const sidebar = document.getElementById('place-sidebar');
    if (visible) {
        sidebar.classList.add('visible');
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.remove('visible');
        sidebar.classList.add('hidden');
    }
} 