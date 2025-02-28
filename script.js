// Almaty Trip Planner - Main JavaScript

import { cityConfig, categories } from './config/cityData.js';
import { places, restaurants } from './config/placesData.js';
import { createIcon, calculateDistance, createRouteLine, findNearbyPOIs, createTooltip } from './utils/mapUtils.js';
import { updateSidebarContent, toggleSidebar } from './utils/sidebarUtils.js';

// Global state
let map;
let currentRouteLayer = null;
let locationsVisible = true;
let restaurantsVisible = false;
let restaurantMarkers = [];
let nearbyRestaurantMarkers = [];

// Initialize map
function initializeMap() {
    // Create map centered on the city
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true,
        zoomAnimation: true,
        fadeAnimation: true
    }).setView([cityConfig.center.lat, cityConfig.center.lng], cityConfig.defaultZoom);
    
    // Add CartoDB Voyager tile layer - cleaner and more minimal design
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 22,
   
    }).addTo(map);
    
    // Add home base marker with minimal design
    const homeIcon = createIcon(cityConfig.homeBase.color, 'home', { 
        className: 'home-icon',
        size: 28
    });
    
    L.marker([cityConfig.homeBase.lat, cityConfig.homeBase.lng], {
        icon: homeIcon
    })
    .bindTooltip(cityConfig.homeBase.name, { 
        className: 'place-tooltip',
        offset: [0, -14]
    })
    .addTo(map);
    
    // Initialize places with clean markers
    initializePlaces();
    
    // Add event listeners
    setupEventListeners();
}

// Initialize places on the map
function initializePlaces() {
    places.forEach(place => {
        const icon = createIcon(place.color, place.type, {
            size: 28
        });
        
        const marker = L.marker([place.lat, place.lng], {
            icon: icon
        }).addTo(map);
        
        // Store marker reference
        place.marker = marker;
        
        // Add tooltip with clean design
        marker.bindTooltip(place.name, {
            permanent: false,
            direction: 'top',
            className: 'place-tooltip',
            offset: [0, -14]
        });
        
        // Handle click
        marker.on('click', () => {
            handlePlaceClick(place);
        });
    });
}

// Handle place marker click
function handlePlaceClick(place) {
    // Remove previous route if exists
    if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
    }
    
    // Create and add new route
    currentRouteLayer = createRouteLine(cityConfig.homeBase, place, place.color).addTo(map);
    
    // Clear any previously displayed nearby restaurant markers
    clearNearbyRestaurantMarkers();
    
    // Find and display nearby restaurants if they're not already visible
    if (!restaurantsVisible) {
        const nearbyRestaurants = findNearbyPOIs(place, restaurants);
        displayNearbyRestaurants(nearbyRestaurants);
    }
    
    // Update sidebar
    updateSidebarContent(place, false);
}

// Handle restaurant marker click
function handleRestaurantClick(restaurant) {
    // Remove previous route
    if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
    }
    
    // Create new route
    currentRouteLayer = createRouteLine(cityConfig.homeBase, restaurant, restaurant.color).addTo(map);
    
    // Update sidebar
    updateSidebarContent(restaurant, true);
}

// Display nearby restaurants
function displayNearbyRestaurants(nearbyRestaurants) {
    nearbyRestaurants.forEach(restaurant => {
        const icon = createIcon(restaurant.color, restaurant.type);
        
        const marker = L.marker([restaurant.lat, restaurant.lng], {
            icon: icon
        }).addTo(map);
        
        marker.bindTooltip(restaurant.name, {
            permanent: false,
            direction: 'top',
            className: 'place-tooltip'
        });
        
        marker.on('click', () => handleRestaurantClick(restaurant));
        
        nearbyRestaurantMarkers.push(marker);
    });
}

// Clear nearby restaurant markers
function clearNearbyRestaurantMarkers() {
    nearbyRestaurantMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    nearbyRestaurantMarkers = [];
}

// Toggle all restaurants visibility
function toggleRestaurants() {
    restaurantsVisible = !restaurantsVisible;
    
    // Update button text
    const toggleRestaurantsBtn = document.getElementById('toggle-restaurants');
    toggleRestaurantsBtn.innerHTML = restaurantsVisible ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z" clip-rule="evenodd" />
        </svg> Hide Restaurants` :
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z" clip-rule="evenodd" />
        </svg> Restaurants`;
    
    if (restaurantsVisible) {
        // Show all restaurants
        restaurants.forEach(restaurant => {
            const icon = createIcon(restaurant.color, restaurant.type);
            const marker = L.marker([restaurant.lat, restaurant.lng], { icon }).addTo(map);
            
            marker.bindTooltip(restaurant.name, {
                permanent: false,
                direction: 'top',
                className: 'place-tooltip'
            });
            
            marker.on('click', () => handleRestaurantClick(restaurant));
            restaurantMarkers.push(marker);
        });
    } else {
        // Hide all restaurants
        restaurantMarkers.forEach(marker => map.removeLayer(marker));
        restaurantMarkers = [];
        
        // Close sidebar if showing restaurant
        const sidebarName = document.getElementById('sidebar-place-name');
        if (sidebarName.getAttribute('data-type') === 'restaurant') {
            toggleSidebar(false);
        }
    }
    
    // Clear any nearby markers
    clearNearbyRestaurantMarkers();
    
    // Clear route if exists
    if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
        currentRouteLayer = null;
    }
}

// Toggle all locations visibility
function toggleLocations() {
    locationsVisible = !locationsVisible;
    
    // Update button text
    const toggleLocationsBtn = document.getElementById('toggle-locations');
    toggleLocationsBtn.innerHTML = locationsVisible ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm7.75 9.75a.75.75 0 000-1.5h-4.5a.75.75 0 000 1.5h4.5z" clip-rule="evenodd" />
        </svg> Hide Places` :
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm7.75 9.75a.75.75 0 000-1.5h-4.5a.75.75 0 000 1.5h4.5z" clip-rule="evenodd" />
        </svg> Show Places`;
    
    // Toggle each place marker
    places.forEach(place => {
        if (place.marker) {
            if (locationsVisible) {
                map.addLayer(place.marker);
            } else {
                map.removeLayer(place.marker);
            }
        }
    });
    
    // Clear nearby restaurant markers
    clearNearbyRestaurantMarkers();
    
    // Remove route and close sidebar when hiding
    if (!locationsVisible) {
        if (currentRouteLayer) {
            map.removeLayer(currentRouteLayer);
            currentRouteLayer = null;
        }
        toggleSidebar(false);
    }
}

// Go to home location
function goToHome() {
    map.setView([cityConfig.homeBase.lat, cityConfig.homeBase.lng], cityConfig.defaultZoom);
}

// Setup event listeners
function setupEventListeners() {
    // Toggle restaurants button
    document.getElementById('toggle-restaurants').addEventListener('click', toggleRestaurants);
    
    // Toggle locations button
    document.getElementById('toggle-locations').addEventListener('click', toggleLocations);
    
    // Home button
    document.getElementById('go-home').addEventListener('click', goToHome);
    
    // Close sidebar button
    document.getElementById('close-sidebar').addEventListener('click', () => {
        toggleSidebar(false);
        // Clear any nearby restaurant markers
        clearNearbyRestaurantMarkers();
        // Clear route if exists
        if (currentRouteLayer) {
            map.removeLayer(currentRouteLayer);
            currentRouteLayer = null;
        }
    });
    
    // Handle ESC key press to close sidebar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('place-sidebar');
            if (!sidebar.classList.contains('hidden')) {
                toggleSidebar(false);
                // Clear any nearby restaurant markers
                clearNearbyRestaurantMarkers();
                // Clear route if exists
                if (currentRouteLayer) {
                    map.removeLayer(currentRouteLayer);
                    currentRouteLayer = null;
                }
            }
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeMap);