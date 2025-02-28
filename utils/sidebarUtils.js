/**
 * Sidebar utility functions for the trip planner application
 */

/**
 * Update the sidebar content with places data
 * @param {HTMLElement} sidebarElement - The sidebar element
 * @param {Array} places - Array of places to display
 * @param {Function} onPlaceClick - Callback function when a place is clicked
 */
export function updateSidebarContent(sidebarElement, places, onPlaceClick) {
    // Clear existing content
    sidebarElement.innerHTML = '';
    
    // Group places by category
    const placesByCategory = groupPlacesByCategory(places);
    
    // Create sections for each category
    Object.entries(placesByCategory).forEach(([category, categoryPlaces]) => {
        const sectionElement = createCategorySection(category, categoryPlaces, onPlaceClick);
        sidebarElement.appendChild(sectionElement);
    });
}

/**
 * Group places by their category
 * @param {Array} places - Array of places
 * @returns {Object} - Object with categories as keys and arrays of places as values
 */
function groupPlacesByCategory(places) {
    return places.reduce((acc, place) => {
        const category = place.type.split('.')[1].toLowerCase();
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(place);
        return acc;
    }, {});
}

/**
 * Create a section for a category of places
 * @param {string} category - The category name
 * @param {Array} places - Array of places in this category
 * @param {Function} onPlaceClick - Callback function when a place is clicked
 * @returns {HTMLElement} - The created section element
 */
function createCategorySection(category, places, onPlaceClick) {
    const sectionElement = document.createElement('div');
    sectionElement.className = 'places-section';
    
    // Create section header
    const headerElement = document.createElement('h3');
    headerElement.className = 'section-header';
    headerElement.textContent = formatCategoryName(category);
    sectionElement.appendChild(headerElement);
    
    // Create place items
    places.forEach(place => {
        const placeElement = createPlaceElement(place, onPlaceClick);
        sectionElement.appendChild(placeElement);
    });
    
    return sectionElement;
}

/**
 * Format a category name for display
 * @param {string} category - The category name
 * @returns {string} - The formatted category name
 */
function formatCategoryName(category) {
    // Capitalize first letter and add 's' if not already plural
    const formattedName = category.charAt(0).toUpperCase() + category.slice(1);
    return formattedName.endsWith('s') ? formattedName : `${formattedName}s`;
}

/**
 * Create an element for a place
 * @param {Object} place - The place object
 * @param {Function} onPlaceClick - Callback function when the place is clicked
 * @returns {HTMLElement} - The created place element
 */
function createPlaceElement(place, onPlaceClick) {
    const placeElement = document.createElement('div');
    placeElement.className = 'place-item';
    placeElement.dataset.id = place.id;
    
    const nameElement = document.createElement('h3');
    nameElement.textContent = place.name;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = place.notes || '';
    
    placeElement.appendChild(nameElement);
    placeElement.appendChild(descriptionElement);
    
    // Add click event
    placeElement.addEventListener('click', () => {
        onPlaceClick(place);
    });
    
    return placeElement;
}

/**
 * Toggle the sidebar visibility
 * @param {HTMLElement} sidebarElement - The sidebar element
 */
export function toggleSidebar(sidebarElement) {
    sidebarElement.classList.toggle('collapsed');
}

/**
 * Highlight a place in the sidebar
 * @param {HTMLElement} sidebarElement - The sidebar element
 * @param {string} placeId - The ID of the place to highlight
 */
export function highlightPlace(sidebarElement, placeId) {
    // Remove active class from all items
    const allItems = sidebarElement.querySelectorAll('.place-item');
    allItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to selected item
    const selectedItem = sidebarElement.querySelector(`.place-item[data-id="${placeId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

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



