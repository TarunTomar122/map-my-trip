// Almaty Trip Planner - Main JavaScript

import { cityConfig, categories } from './config/cityData.js';
import { places, restaurants } from './config/placesData.js';
import { createIcon, calculateDistance, createRouteLine, findNearbyPOIs, createTooltip } from './utils/mapUtils.js';
import { updateSidebarContent } from './utils/sidebarUtils.js';
import { generateTravelPlan } from './utils/geminiApi.js';
import { sampleTravelPlan } from './config/sampleData.js';

// Global state
let map;
let currentRouteLayer = null;
let locationsVisible = true;
let restaurantsVisible = true;
let restaurantMarkers = [];
let placeMarkers = [];
let currentMarkers = [];
let nearbyRestaurantMarkers = [];
let homeMarker = null;
let travelData = null;
let customHomeBase = null; // Store custom home base

// Global variables for route
let currentRoute = null;

// DOM Elements
let tripPlannerHome = document.getElementById('trip-planner-home');
let mapContainer = document.getElementById('map-container');
let generatePlanBtn = document.getElementById('generate-plan-btn');
let loadingIndicator = document.getElementById('loading-indicator');
let cityNameInput = document.getElementById('city-name');
let numDaysInput = document.getElementById('num-days');
let additionalInfoInput = document.getElementById('additional-info');
let backToPlannerBtn = document.getElementById('back-to-planner');
let cityTitle = document.getElementById('city-title');
let placesList = document.getElementById('places-list');
let placeDetails = document.getElementById('place-details');

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
    const homeIcon = createIcon(cityConfig.homeBase.color, 'homebase', { 
        size: 32
    });
    
    homeMarker = L.marker([cityConfig.homeBase.lat, cityConfig.homeBase.lng], {
        icon: homeIcon,
        zIndexOffset: 1000 // Make sure homebase is on top
    })
    .bindTooltip(cityConfig.homeBase.name, { 
        className: 'place-tooltip',
        offset: [0, -14]
    })
    .addTo(map);
    
    // Initialize places with clean markers
    initializePlaces();
    
    // Add map controls
    addMapControls();
    
    // Add event listeners
    setupEventListeners();
}

// Initialize places on the map
function initializePlaces() {
    places.forEach(place => {
        // Safely handle place type
        let placeType = 'default';
        if (place.type && place.type.includes('.')) {
            placeType = place.type.split('.')[1];
        }
        
        const category = categories[placeType.toLowerCase()] || categories.default;
        const icon = createIcon(category.color, 'place', {
            size: 28
        });
        
        const marker = L.marker([place.lat, place.lng], {
            icon: icon,
            placeId: place.id,
            type: 'place'
        }).addTo(map);
        
        // Store marker reference
        place.marker = marker;
        placeMarkers.push(marker);
        
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
    
    // Initialize restaurants if they should be visible
    if (restaurantsVisible) {
        restaurants.forEach(restaurant => {
            // Safely handle restaurant type
            let restaurantType = 'default';
            if (restaurant.type && restaurant.type.includes('.')) {
                restaurantType = restaurant.type.split('.')[1];
            }
            
            const category = categories[restaurantType.toLowerCase()] || categories.default;
            const icon = createIcon(category.color, 'restaurant', {
                size: 28
            });
            
            const marker = L.marker([restaurant.lat, restaurant.lng], {
                icon: icon,
                placeId: restaurant.id,
                type: 'restaurant'
            }).addTo(map);
            
            // Add tooltip
            marker.bindTooltip(restaurant.name, {
                permanent: false,
                direction: 'top',
                className: 'place-tooltip',
                offset: [0, -14]
            });
            
            // Handle click
            marker.on('click', () => {
                handleRestaurantClick(restaurant);
            });
            
            // Store marker reference
            restaurantMarkers.push(marker);
        });
    }
}

// Handle place click
function handlePlaceClick(place) {
    // Show place details in sidebar
    showPlaceDetails(place);
    
    // Show the sidebar
    toggleSidebar(true);
    
    // Remove previous route if exists
    if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
    }
    
    // Get current home base
    const homeBase = customHomeBase || cityConfig.homeBase;
    
    // Create and add new route
    currentRouteLayer = createRouteLine(
        map,
        [homeBase.lat, homeBase.lng],
        [place.lat, place.lng],
        place.color || '#4a6fa5'
    ).addTo(map);
    
    // Clear any previously displayed nearby restaurant markers
    clearNearbyRestaurantMarkers();
    
    // Find and display nearby restaurants if they're not already visible
    if (!restaurantsVisible) {
        const nearbyRestaurants = findNearbyPOIs(restaurants, place.lat, place.lng, 1);
        displayNearbyRestaurants(nearbyRestaurants);
    }
    
    // Update sidebar
    updateSidebarContent(place, false);
}

// Handle restaurant click
function handleRestaurantClick(restaurant) {
    // Show restaurant details in sidebar
    showRestaurantDetails(restaurant);
    
    // Show the sidebar
    toggleSidebar(true);
    
    // Remove previous route
    if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
    }
    
    // Get current home base
    const homeBase = customHomeBase || cityConfig.homeBase;
    
    // Create new route
    currentRouteLayer = createRouteLine(
        map,
        [homeBase.lat, homeBase.lng],
        [restaurant.lat, restaurant.lng],
        restaurant.color || '#4a6fa5'
    ).addTo(map);
    
    // Update sidebar
    updateSidebarContent(restaurant, true);
}

// Display nearby restaurants
function displayNearbyRestaurants(nearbyRestaurants) {
    nearbyRestaurants.forEach(restaurant => {
        // Safely handle restaurant type
        let restaurantType = 'default';
        if (restaurant.type && restaurant.type.includes('.')) {
            restaurantType = restaurant.type.split('.')[1];
        }
        
        // Make sure we have a default category if categories is undefined
        if (!categories || !categories.default) {
            categories.default = { color: '#DC2626', name: 'Default' };
        }
        
        const category = categories[restaurantType.toLowerCase()] || categories.default;
        
        // Use SVG icon for restaurants
        const restaurantIconHtml = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <path fill="${category.color || '#DC2626'}" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
            </svg>
        `;
        
        const icon = L.divIcon({
            className: 'custom-marker restaurant-marker',
            html: restaurantIconHtml,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
        });
        
        const marker = L.marker([restaurant.lat, restaurant.lng], {
            icon: icon,
            placeId: restaurant.id,
            type: 'restaurant'
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
    console.log('toggleRestaurants called');
    restaurantsVisible = !restaurantsVisible;
    
    // Update button state
    const restaurantsBtn = document.getElementById('restaurants-btn');
    restaurantsBtn.classList.toggle('active', restaurantsVisible);
    
    if (restaurantsVisible) {
        // Show all restaurants - first clear any existing markers
        restaurantMarkers.forEach(marker => {
            if (marker && marker._map) {
                map.removeLayer(marker);
            }
        });
        restaurantMarkers = [];
        
        // Add fresh markers
        restaurants.forEach(restaurant => {
            // Safely handle restaurant type
            let restaurantType = 'default';
            if (restaurant.type && restaurant.type.includes('.')) {
                restaurantType = restaurant.type.split('.')[1];
            }
            
            // Make sure we have a default category if categories is undefined
            if (!categories || !categories.default) {
                categories.default = { color: '#DC2626', name: 'Default' };
            }
            
            const category = categories[restaurantType.toLowerCase()] || categories.default;
            
            // Use SVG icon for restaurants
            const restaurantIconHtml = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                    <path fill="${category.color || '#DC2626'}" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
            `;
            
            const icon = L.divIcon({
                className: 'custom-marker restaurant-marker',
                html: restaurantIconHtml,
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                popupAnchor: [0, -28]
            });
            
            const marker = L.marker([restaurant.lat, restaurant.lng], { 
                icon: icon,
                placeId: restaurant.id,
                type: 'restaurant'
            }).addTo(map);
            
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
        restaurantMarkers.forEach(marker => {
            if (marker && marker._map) {
                map.removeLayer(marker);
            }
        });
        restaurantMarkers = [];
        
        // Close sidebar if showing restaurant
        const sidebarName = document.getElementById('sidebar-place-name');
        if (sidebarName && sidebarName.getAttribute('data-type') === 'restaurant') {
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
    
    // Update button state
    const placesBtn = document.getElementById('places-btn');
    placesBtn.classList.toggle('active', locationsVisible);
    
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
    // First check if user has set a custom home base
    if (customHomeBase) {
        map.setView([customHomeBase.lat, customHomeBase.lng], 15);
    } 
    // Check if Gemini provided a homebase in the response
    else if (travelData && travelData.homebase) {
        map.setView([travelData.homebase.lat, travelData.homebase.lng], 15);
    }
    // Check if city config has a homebase
    else if (cityConfig && cityConfig.homeBase) {
        map.setView([cityConfig.homeBase.lat, cityConfig.homeBase.lng], 15);
    }
    // Default to city center
    else if (travelData && travelData.cityConfig && travelData.cityConfig.center) {
        map.setView([travelData.cityConfig.center.lat, travelData.cityConfig.center.lng], 15);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Back to planner button
    if (backToPlannerBtn) {
        backToPlannerBtn.addEventListener('click', handleBackToPlanner);
    }
    
    // Generate plan button
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', handleGeneratePlan);
    }
    
    // Form validation
    if (cityNameInput && numDaysInput) {
        cityNameInput.addEventListener('input', validateForm);
        numDaysInput.addEventListener('input', validateForm);
    }
    
    // Add sample data button for development
    addSampleDataButton();
}

// Initialize the application
function initApp() {
    // Ensure DOM elements are properly initialized
    const initializeDOMElements = () => {
        // Re-initialize DOM elements to ensure they're available
        let elements = {
            tripPlannerHome: document.getElementById('trip-planner-home'),
            mapContainer: document.getElementById('map-container'),
            generatePlanBtn: document.getElementById('generate-plan-btn'),
            loadingIndicator: document.getElementById('loading-indicator'),
            cityNameInput: document.getElementById('city-name'),
            numDaysInput: document.getElementById('num-days'),
            additionalInfoInput: document.getElementById('additional-info'),
            backToPlannerBtn: document.getElementById('back-to-planner'),
            cityTitle: document.getElementById('city-title'),
            placesList: document.getElementById('places-list'),
            placeDetails: document.getElementById('place-details')
        };
        
        // Check if any required elements are missing
        let missingElements = Object.entries(elements)
            .filter(([_, element]) => !element)
            .map(([name]) => name);
            
        if (missingElements.length > 0) {
            console.warn('Missing DOM elements:', missingElements.join(', '));
        }
        
        // Update global references
        if (elements.tripPlannerHome) tripPlannerHome = elements.tripPlannerHome;
        if (elements.mapContainer) mapContainer = elements.mapContainer;
        if (elements.generatePlanBtn) generatePlanBtn = elements.generatePlanBtn;
        if (elements.loadingIndicator) loadingIndicator = elements.loadingIndicator;
        if (elements.cityNameInput) cityNameInput = elements.cityNameInput;
        if (elements.numDaysInput) numDaysInput = elements.numDaysInput;
        if (elements.additionalInfoInput) additionalInfoInput = elements.additionalInfoInput;
        if (elements.backToPlannerBtn) backToPlannerBtn = elements.backToPlannerBtn;
        if (elements.cityTitle) cityTitle = elements.cityTitle;
        if (elements.placesList) placesList = elements.placesList;
        if (elements.placeDetails) placeDetails = elements.placeDetails;
    };
    
    // Initialize DOM elements
    initializeDOMElements();
    
    // Add event listeners
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', handleGeneratePlan);
    } else {
        console.error('Generate plan button not found');
    }
    
    if (backToPlannerBtn) {
        backToPlannerBtn.addEventListener('click', handleBackToPlanner);
    } else {
        console.error('Back to planner button not found');
    }
    
    // Initialize form validation
    if (cityNameInput && numDaysInput) {
        initFormValidation();
    } else {
        console.error('Form input elements not found');
    }
    
    // Add sample data button for testing
    addSampleDataButton();
}

// Initialize form validation
function initFormValidation() {
    cityNameInput.addEventListener('input', validateForm);
    numDaysInput.addEventListener('input', validateForm);
    
    // Initial validation
    validateForm();
}

// Validate the form inputs
function validateForm() {
    const cityName = cityNameInput.value.trim();
    const numDays = parseInt(numDaysInput.value) || 0;
    
    const isValid = cityName !== '' && numDays > 0 && numDays <= 30;
    
    // Enable/disable the generate plan button
    generatePlanBtn.disabled = !isValid;
    
    return isValid;
}

// Handle generate plan button click
async function handleGeneratePlan() {
    if (!validateForm()) {
        return;
    }
    
    const cityName = cityNameInput.value.trim();
    const numDays = parseInt(numDaysInput.value);
    const additionalInfo = additionalInfoInput.value.trim();
    
    // Show loading indicator
    tripPlannerHome.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    try {
        // Generate travel plan
        travelData = await generateTravelPlan({
            cityName,
            numDays,
            additionalInfo
        });
        
        // Update city title
        if (cityTitle) {
            cityTitle.textContent = `${travelData.cityConfig.name} - ${numDays} Day Trip`;
        }
        
        // Initialize map and display data
        initMap(travelData);
        
        // Wait for DOM to update before trying to access places-list
        setTimeout(() => {
            // Make sure placesList element exists before populating it
            placesList = document.getElementById('places-list');
            if (placesList) {
                populatePlacesList(travelData);
            } else {
                console.error('Cannot populate places list: places-list element not found');
                // Create the places-list element if it doesn't exist
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    placesList = document.createElement('div');
                    placesList.id = 'places-list';
                    placesList.className = 'places-list';
                    sidebar.appendChild(placesList);
                    populatePlacesList(travelData);
                }
            }
            
            // Show map container
            loadingIndicator.classList.add('hidden');
            mapContainer.classList.remove('hidden');
        }, 100);
    } catch (error) {
        console.error('Error generating plan:', error);
        alert(`Error: ${error.message}`);
        
        // Show trip planner home again
        loadingIndicator.classList.add('hidden');
        tripPlannerHome.classList.remove('hidden');
    }
}

// Handle back to planner button click
function handleBackToPlanner() {
    // Clear map and data
    if (map) {
        map.remove();
        map = null;
    }
    
    // Clear markers
    currentMarkers = [];
    placeMarkers = [];
    restaurantMarkers = [];
    homeMarker = null;
    travelData = null;
    
    // Clear form inputs
    cityNameInput.value = '';
    numDaysInput.value = '';
    additionalInfoInput.value = '';
    
    // Show trip planner home
    mapContainer.classList.add('hidden');
    tripPlannerHome.classList.remove('hidden');
    
    // Reset validation
    validateForm();
}

// Initialize the map with travel data
function initMap(data) {
    // Clear existing markers
    currentMarkers = [];
    placeMarkers = [];
    restaurantMarkers = [];
    
    // Make sure data has all required properties
    if (!data) {
        console.error('No data provided to initMap');
        return;
    }
    
    // Ensure data has categories
    if (!data.categories) {
        data.categories = {
            default: { color: '#4a6fa5', name: 'Default' },
            restaurant: { color: '#DC2626', name: 'Restaurant' }
        };
    }
    
    // Create map if it doesn't exist
    if (!map) {
        map = L.map('map', {
            zoomControl: true,
            attributionControl: false // Hide attribution for cleaner look
        }).setView(
            [data.cityConfig.center.lat, data.cityConfig.center.lng],
            data.cityConfig.defaultZoom
        );
        
        // Add clean minimal tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: ''
        }).addTo(map);
        
        // Add simplified map controls
        addMapControls();
    } else {
        // Update map view
        map.setView(
            [data.cityConfig.center.lat, data.cityConfig.center.lng],
            data.cityConfig.defaultZoom
        );
        
        // Clear existing markers
        currentMarkers.forEach(marker => marker.remove());
        currentMarkers = [];
    }
    
    // Determine homebase location
    let homeBase;
    
    // First check if user has set a custom home base
    if (customHomeBase) {
        homeBase = customHomeBase;
    } 
    // Check if Gemini provided a homebase in the response
    else if (data.homebase) {
        homeBase = data.homebase;
    }
    // Check if city config has a homebase
    else if (data.cityConfig && data.cityConfig.homeBase) {
        homeBase = data.cityConfig.homeBase;
    }
    // Find most popular place to use as home base
    else {
        const popularPlaces = [...data.places].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        if (popularPlaces.length > 0) {
            const mostPopular = popularPlaces[0];
            homeBase = {
                lat: mostPopular.lat,
                lng: mostPopular.lng,
                name: mostPopular.name + ' (Auto Home Base)',
                color: '#10B981', // emerald color
                description: 'Automatically selected as home base due to popularity'
            };
        } else {
            // Use city center as homebase if no places available
            homeBase = {
                lat: data.cityConfig.center.lat,
                lng: data.cityConfig.center.lng,
                name: `${data.cityConfig.name} Center (Home Base)`,
                color: '#10B981', // emerald color
                description: 'City center selected as default home base'
            };
        }
    }
    
    // Create homebase SVG icon
    const homebaseIconHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path fill="${homeBase.color || '#10B981'}" d="M12 3L4 9v12h16V9l-8-6zm0 7.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
        </svg>
    `;
    
    const homeIcon = L.divIcon({
        className: 'custom-marker homebase-marker',
        html: homebaseIconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Add homebase marker
    homeMarker = L.marker([homeBase.lat, homeBase.lng], {
        icon: homeIcon,
        zIndexOffset: 1000 // Make sure homebase is on top
    }).addTo(map);
    
    // Add tooltip
    homeMarker.bindTooltip(homeBase.name + ' (Home Base)', { 
        className: 'place-tooltip',
        offset: [0, -14]
    });
    
    // Add popup with homebase information
    const homebaseDescription = homeBase.description || 'Your home base for this trip';
    homeMarker.bindPopup(`
        <div class="popup-content">
            <div class="popup-title">${homeBase.name}</div>
            <div class="popup-note">${homebaseDescription}</div>
        </div>
    `, {
        closeButton: true,
        className: 'clean-popup'
    });
    
    // Add click handler for homebase
    homeMarker.on('click', () => {
        showHomebaseInfo(homeBase);
    });
    
    // Store in travel data
    travelData.homebase = homeBase;
    
    // Add place markers
    data.places.forEach(place => {
        addPlaceMarker(place, data.categories);
    });
    
    // Add restaurant markers
    data.restaurants.forEach(restaurant => {
        addRestaurantMarker(restaurant, data.categories);
    });
}

// Show homebase information
function showHomebaseInfo(homeBase) {
    // Create content for the homebase info
    const content = `
        <div class="place-details-header">
            <h2>${homeBase.name}</h2>
            <button class="close-details-btn">&times;</button>
        </div>
        <div class="place-details-content">
            <div class="place-details-section">
                <h3>Home Base</h3>
                <p>${homeBase.description || 'Your central location for this trip.'}</p>
            </div>
            <div class="place-details-section">
                <h3>Location</h3>
                <p>Latitude: ${homeBase.lat.toFixed(6)}<br>Longitude: ${homeBase.lng.toFixed(6)}</p>
            </div>
        </div>
    `;
    
    // Update and show details panel
    placeDetails.innerHTML = content;
    placeDetails.classList.remove('hidden');
    
    // Add close button event
    const closeBtn = placeDetails.querySelector('.close-details-btn');
    closeBtn.addEventListener('click', () => {
        placeDetails.classList.add('hidden');
    });
}

// Add map control buttons
function addMapControls() {
    // Create control container
    const controlContainer = document.createElement('div');
    controlContainer.className = 'map-controls';
    
    // Toggle places button
    const placesButton = createControlButton('places-btn', 'Toggle Places', '<i class="fas fa-landmark"></i>', () => {
        togglePlaces();
    });
    
    // Toggle restaurants button
    const restaurantsButton = createControlButton('restaurants-btn', 'Toggle Restaurants', '<i class="fas fa-utensils"></i>', () => {
        toggleRestaurants();
    });
    
    // Go to homebase button
    const homebaseButton = createControlButton('homebase-btn', 'Go to Homebase', '<i class="fas fa-home"></i>', () => {
        goToHome();
    });
    
    // Set homebase button
    const setHomebaseButton = createControlButton('set-homebase-btn', 'Set Homebase', '<i class="fas fa-map-pin"></i>', () => {
        promptSetHomeBase();
    });
    
    // Add buttons to container
    controlContainer.appendChild(placesButton);
    controlContainer.appendChild(restaurantsButton);
    controlContainer.appendChild(homebaseButton);
    controlContainer.appendChild(setHomebaseButton);
    
    // Add custom control to map
    const MapControl = L.Control.extend({
        options: {
            position: 'topright'
        },
        onAdd: function() {
            return controlContainer;
        }
    });
    
    map.addControl(new MapControl());
    
    // Set initial active states
    document.getElementById('places-btn').classList.toggle('active', locationsVisible);
    document.getElementById('restaurants-btn').classList.toggle('active', restaurantsVisible);
}

// Helper function to create control buttons
function createControlButton(id, title, iconHtml, clickHandler) {
    const button = document.createElement('button');
    button.id = id;
    button.className = 'map-control-btn';
    button.setAttribute('title', title);
    button.innerHTML = iconHtml;
    button.addEventListener('click', function() {
        clickHandler();
        // Toggle active class for places and restaurants buttons
        if (id === 'places-btn' || id === 'restaurants-btn') {
            this.classList.toggle('active');
        }
    });
    return button;
}

// Toggle places visibility
function togglePlaces() {
    locationsVisible = !locationsVisible;
    
    // Update button state
    const placesBtn = document.getElementById('places-btn');
    placesBtn.classList.toggle('active', locationsVisible);
    
    placeMarkers.forEach(marker => {
        if (locationsVisible) {
            marker.addTo(map);
        } else {
            marker.remove();
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

// Add a place marker to the map
function addPlaceMarker(place, categories) {
    // Safely handle place type
    let placeType = 'default';
    if (place.type && place.type.includes('.')) {
        placeType = place.type.split('.')[1];
    }
    
    // Make sure categories is defined
    if (!categories) {
        categories = {};
    }
    
    // Make sure we have a default category
    if (!categories.default) {
        categories.default = { color: '#4a6fa5', name: 'Default' };
    }
    
    const category = categories[placeType.toLowerCase()] || categories.default;
    
    // Use SVG icon for places
    const placeIconHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
            <path fill="${category.color || '#4a6fa5'}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    `;
    
    const icon = L.divIcon({
        className: 'custom-marker place-marker',
        html: placeIconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
    
    // Create marker with minimal design
    const marker = L.marker([place.lat, place.lng], {
        title: place.name,
        icon: icon,
        placeId: place.id,
        type: 'place'
    }).addTo(map);
    
    // Add tooltip with clean design
    marker.bindTooltip(place.name, {
        permanent: false,
        direction: 'top',
        className: 'place-tooltip',
        offset: [0, -8]
    });
    
    // Add popup with minimal info
    marker.bindPopup(`<b>${place.name}</b><br>${place.category || ''}`, {
        closeButton: false,
        className: 'clean-popup'
    });
    
    // Handle click
    marker.on('click', () => {
        showPlaceDetails(place);
        highlightPlaceInList(place.id);
        
        // Show the sidebar
        toggleSidebar(true);
    });
    
    // Store marker reference
    currentMarkers.push(marker);
    placeMarkers.push(marker);
    place.marker = marker;
}

// Add a restaurant marker to the map
function addRestaurantMarker(restaurant, categories) {
    // Safely handle restaurant type
    let restaurantType = 'default';
    if (restaurant.type && restaurant.type.includes('.')) {
        restaurantType = restaurant.type.split('.')[1];
    }
    
    // Make sure categories is defined
    if (!categories) {
        categories = {};
    }
    
    // Make sure we have a default category
    if (!categories.default) {
        categories.default = { color: '#DC2626', name: 'Default' };
    }
    
    const category = categories[restaurantType.toLowerCase()] || categories.default;
    
    // Use SVG icon for restaurants
    const restaurantIconHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
            <path fill="${category.color || '#DC2626'}" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
        </svg>
    `;
    
    const icon = L.divIcon({
        className: 'custom-marker restaurant-marker',
        html: restaurantIconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
    
    // Create marker with minimal design
    const marker = L.marker([restaurant.lat, restaurant.lng], {
        title: restaurant.name,
        icon: icon,
        placeId: restaurant.id,
        type: 'restaurant'
    }).addTo(map);
    
    // Add tooltip with clean design
    marker.bindTooltip(restaurant.name, {
        permanent: false,
        direction: 'top',
        className: 'place-tooltip',
        offset: [0, -8]
    });
    
    // Add popup with minimal info
    marker.bindPopup(`<b>${restaurant.name}</b><br>${restaurant.cuisine || ''}`, {
        closeButton: false,
        className: 'clean-popup'
    });
    
    // Add click event
    marker.on('click', () => {
        showRestaurantDetails(restaurant);
        highlightPlaceInList(restaurant.id);
        
        // Show the sidebar
        toggleSidebar(true);
    });
    
    // Store marker reference
    currentMarkers.push(marker);
    restaurantMarkers.push(marker);
    restaurant.marker = marker;
}

// Populate the places list in the sidebar
function populatePlacesList(data) {
    // Check if placesList element exists
    if (!placesList) {
        console.error('Error: places-list element not found in the DOM');
        return;
    }
    
    // Clear existing list
    placesList.innerHTML = '';
    
    // Add places section
    const placesSection = document.createElement('div');
    placesSection.className = 'places-section';
    
    const placesHeader = document.createElement('h3');
    placesHeader.textContent = 'Places to Visit';
    placesHeader.className = 'section-header';
    placesSection.appendChild(placesHeader);
    
    data.places.forEach(place => {
        const placeItem = createPlaceItem(place, place.id);
        placesSection.appendChild(placeItem);
    });
    
    placesList.appendChild(placesSection);
    
    // Add restaurants section
    const restaurantsSection = document.createElement('div');
    restaurantsSection.className = 'places-section';
    
    const restaurantsHeader = document.createElement('h3');
    restaurantsHeader.textContent = 'Restaurants & Cafes';
    restaurantsHeader.className = 'section-header';
    restaurantsSection.appendChild(restaurantsHeader);
    
    data.restaurants.forEach(restaurant => {
        const restaurantItem = createRestaurantItem(restaurant, restaurant.id);
        restaurantsSection.appendChild(restaurantItem);
    });
    
    placesList.appendChild(restaurantsSection);
}

// Create place item for sidebar
function createPlaceItem(place, index) {
    const placeItem = document.createElement('div');
    placeItem.className = 'place-item';
    placeItem.setAttribute('data-index', index);
    
    // Create place header with name and category
    const placeHeader = document.createElement('div');
    placeHeader.className = 'place-header';
    placeHeader.innerHTML = `
        <h3>${place.name}</h3>
        <span class="place-category">${place.category}</span>
    `;
    
    // Create place details section
    const placeDetails = document.createElement('div');
    placeDetails.className = 'place-details';
    placeDetails.innerHTML = `
        <p>${place.description || ''}</p>
        ${place.details && place.details.length > 0 ? 
            `<ul class="detail-bullets">
                ${place.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>` : ''
        }
    `;
    
    // Add click event to show place on map
    placeItem.addEventListener('click', () => {
        // Find the marker for this place
        const marker = currentMarkers.find(m => 
            m.options.placeId === index && m.options.type === 'place');
        
        if (marker) {
            // Center map on marker
            map.setView(marker.getLatLng(), 15);
            // Open popup
            marker.openPopup();
            // Show place details
            showPlaceDetails(place);
            
            // Show the sidebar
            toggleSidebar(true);
        }
    });
    
    // Append header and details to place item
    placeItem.appendChild(placeHeader);
    placeItem.appendChild(placeDetails);
    
    return placeItem;
}

// Create restaurant item for sidebar
function createRestaurantItem(restaurant, index) {
    const restaurantItem = document.createElement('div');
    restaurantItem.className = 'place-item restaurant-item';
    restaurantItem.setAttribute('data-index', index);
    
    // Create restaurant header with name and cuisine
    const restaurantHeader = document.createElement('div');
    restaurantHeader.className = 'place-header';
    restaurantHeader.innerHTML = `
        <h3>${restaurant.name}</h3>
        <span class="place-category">${restaurant.cuisine}</span>
    `;
    
    // Create restaurant details section
    const placeDetails = document.createElement('div');
    placeDetails.className = 'place-details';
    placeDetails.innerHTML = `
        <p>${restaurant.description || ''}</p>
        ${restaurant.details && restaurant.details.length > 0 ? 
            `<ul class="detail-bullets">
                ${restaurant.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>` : ''
        }
    `;
    
    // Add click event to show restaurant on map
    restaurantItem.addEventListener('click', () => {
        // Find the marker for this restaurant
        const marker = currentMarkers.find(m => 
            m.options.placeId === index && m.options.type === 'restaurant');
        
        if (marker) {
            // Center map on marker
            map.setView(marker.getLatLng(), 15);
            // Open popup
            marker.openPopup();
            // Show restaurant details
            showRestaurantDetails(restaurant);
            
            // Show the sidebar
            toggleSidebar(true);
        }
    });
    
    // Append header and details to restaurant item
    restaurantItem.appendChild(restaurantHeader);
    restaurantItem.appendChild(placeDetails);
    
    return restaurantItem;
}

// Format text into bullet points
function formatToBulletPoints(text) {
    if (!text) return '';
    
    // Split by sentences
    const sentences = text.split(/[.!?]/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    
    if (sentences.length <= 1) return text;
    
    return `<ul class="detail-bullets">
        ${sentences.map(sentence => `<li>${sentence}.</li>`).join('')}
    </ul>`;
}

// Show place details in the sidebar
function showPlaceDetails(place) {
    // Create content for the place details
    const content = `
        <div class="place-details-header">
            <h2>${place.name}</h2>
            <button class="close-details-btn">&times;</button>
        </div>
        <div class="place-details-content">
            <div class="place-details-section">
                <h3>Description</h3>
                <p>${place.details?.description || place.notes || 'No description available.'}</p>
            </div>
            
            ${place.details?.whatToExpect ? `
                <div class="place-details-section">
                    <h3>What to Expect</h3>
                    ${Array.isArray(place.details.whatToExpect) 
                        ? `<ul class="detail-bullets">
                            ${place.details.whatToExpect.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${place.details.whatToExpect}</p>`
                    }
                </div>
            ` : ''}
            
            ${place.details?.howToReach ? `
                <div class="place-details-section">
                    <h3>How to Reach</h3>
                    ${Array.isArray(place.details.howToReach) 
                        ? `<ul class="detail-bullets">
                            ${place.details.howToReach.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${place.details.howToReach}</p>`
                    }
                </div>
            ` : ''}
            
            ${place.details?.thingsToBeAwareOf ? `
                <div class="place-details-section">
                    <h3>Things to Be Aware Of</h3>
                    ${Array.isArray(place.details.thingsToBeAwareOf) 
                        ? `<ul class="detail-bullets">
                            ${place.details.thingsToBeAwareOf.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${place.details.thingsToBeAwareOf}</p>`
                    }
                </div>
            ` : ''}
            
            <div class="place-details-section">
                <h3>Location</h3>
                <p>
                    Distance from homebase: ${typeof calculateDistanceFromHomebase(place.lat, place.lng) === 'number' ? 
                        calculateDistanceFromHomebase(place.lat, place.lng).toFixed(1) + ' km' : 'N/A'}<br>
                    Latitude: ${place.lat.toFixed(6)}<br>
                    Longitude: ${place.lng.toFixed(6)}
                </p>
            </div>
        </div>
    `;
    
    // Update and show details panel
    placeDetails.innerHTML = content;
    placeDetails.classList.remove('hidden');
    
    // Add close button event
    const closeBtn = placeDetails.querySelector('.close-details-btn');
    closeBtn.addEventListener('click', () => {
        placeDetails.classList.add('hidden');
    });
}

// Show restaurant details in the sidebar
function showRestaurantDetails(restaurant) {
    // Create content for the restaurant details
    const content = `
        <div class="place-details-header">
            <h2>${restaurant.name}</h2>
            <button class="close-details-btn">&times;</button>
        </div>
        <div class="place-details-content">
            <div class="place-details-section">
                <h3>Description</h3>
                <p>${restaurant.details?.description || restaurant.notes || 'No description available.'}</p>
            </div>
            
            ${restaurant.details?.whatToEat ? `
                <div class="place-details-section">
                    <h3>What to Eat</h3>
                    ${Array.isArray(restaurant.details.whatToEat) 
                        ? `<ul class="detail-bullets">
                            ${restaurant.details.whatToEat.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${restaurant.details.whatToEat}</p>`
                    }
                </div>
            ` : ''}
            
            ${restaurant.details?.bestDishes ? `
                <div class="place-details-section">
                    <h3>Best Dishes</h3>
                    ${Array.isArray(restaurant.details.bestDishes) 
                        ? `<ul class="detail-bullets">
                            ${restaurant.details.bestDishes.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${restaurant.details.bestDishes}</p>`
                    }
                </div>
            ` : ''}
            
            ${restaurant.details?.whyGoThere ? `
                <div class="place-details-section">
                    <h3>Why Go There</h3>
                    ${Array.isArray(restaurant.details.whyGoThere) 
                        ? `<ul class="detail-bullets">
                            ${restaurant.details.whyGoThere.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${restaurant.details.whyGoThere}</p>`
                    }
                </div>
            ` : ''}
            
            ${restaurant.details?.expenses ? `
                <div class="place-details-section">
                    <h3>Expenses</h3>
                    <p>${restaurant.details.expenses}</p>
                </div>
            ` : ''}
            
            ${restaurant.details?.howToReach ? `
                <div class="place-details-section">
                    <h3>How to Reach</h3>
                    ${Array.isArray(restaurant.details.howToReach) 
                        ? `<ul class="detail-bullets">
                            ${restaurant.details.howToReach.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${restaurant.details.howToReach}</p>`
                    }
                </div>
            ` : ''}
            
            ${restaurant.details?.thingsToBeAwareOf ? `
                <div class="place-details-section">
                    <h3>Things to Be Aware Of</h3>
                    ${Array.isArray(restaurant.details.thingsToBeAwareOf) 
                        ? `<ul class="detail-bullets">
                            ${restaurant.details.thingsToBeAwareOf.map(item => `<li>${item}</li>`).join('')}
                          </ul>`
                        : `<p>${restaurant.details.thingsToBeAwareOf}</p>`
                    }
                </div>
            ` : ''}
            
            <div class="place-details-section">
                <h3>Location</h3>
                <p>
                    Distance from homebase: ${typeof calculateDistanceFromHomebase(restaurant.lat, restaurant.lng) === 'number' ? 
                        calculateDistanceFromHomebase(restaurant.lat, restaurant.lng).toFixed(1) + ' km' : 'N/A'}<br>
                    Latitude: ${restaurant.lat.toFixed(6)}<br>
                    Longitude: ${restaurant.lng.toFixed(6)}
                </p>
            </div>
        </div>
    `;
    
    // Update and show details panel
    placeDetails.innerHTML = content;
    placeDetails.classList.remove('hidden');
    
    // Add close button event
    const closeBtn = placeDetails.querySelector('.close-details-btn');
    closeBtn.addEventListener('click', () => {
        placeDetails.classList.add('hidden');
    });
}

// Calculate distance from homebase
function calculateDistanceFromHomebase(lat, lng) {
    if (!travelData || !travelData.homebase) return 0;
    
    try {
        const distance = calculateDistance(
            travelData.homebase.lat, 
            travelData.homebase.lng,
            lat,
            lng
        );
        
        return distance;
    } catch (error) {
        console.error('Error calculating distance:', error);
        return 0;
    }
}

// Add sample data button for testing
function addSampleDataButton() {
    const formContainer = document.querySelector('.trip-form');
    
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.type = 'button';
    sampleDataBtn.id = 'sample-data-btn';
    sampleDataBtn.className = 'btn-secondary';
    sampleDataBtn.style.marginTop = '10px';
    sampleDataBtn.textContent = 'Use Sample Data (Paris)';
    
    sampleDataBtn.addEventListener('click', () => {
        useSampleData();
    });
    
    formContainer.appendChild(sampleDataBtn);
}

// Use sample data for testing
function useSampleData() {
    // Show loading indicator
    tripPlannerHome.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    // Simulate API delay
    setTimeout(() => {
        // Use sample data
        travelData = sampleTravelPlan;
        
        // Update city title
        if (cityTitle) {
            cityTitle.textContent = `${travelData.cityConfig.name} - Sample Trip Plan`;
        }
        
        // Initialize map and display data
        initMap(travelData);
        
        // Wait for DOM to update before trying to access places-list
        setTimeout(() => {
            // Make sure placesList element exists before populating it
            placesList = document.getElementById('places-list');
            if (placesList) {
                populatePlacesList(travelData);
            } else {
                console.error('Cannot populate places list: places-list element not found');
                // Create the places-list element if it doesn't exist
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    placesList = document.createElement('div');
                    placesList.id = 'places-list';
                    placesList.className = 'places-list';
                    sidebar.appendChild(placesList);
                    populatePlacesList(travelData);
                }
            }
            
            // Show map container
            loadingIndicator.classList.add('hidden');
            mapContainer.classList.remove('hidden');
        }, 100);
    }, 1000);
}

// Toggle sidebar visibility
function toggleSidebar(show) {
    const sidebar = document.querySelector('.sidebar');
    if (show) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}

// Highlight a place in the sidebar list
function highlightPlaceInList(placeId) {
    // Remove active class from all place items
    const placeItems = document.querySelectorAll('.place-item');
    placeItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the selected place item
    const selectedItem = document.querySelector(`.place-item[data-index="${placeId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        // Scroll the item into view
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Prompt user to set a home base
function promptSetHomeBase() {
    // Create a modal/dialog for setting home base
    const modal = document.createElement('div');
    modal.className = 'homebase-modal';
    modal.innerHTML = `
        <div class="homebase-modal-content">
            <h3>Set Home Base</h3>
            <p>Click on the map to set your home base, or select from popular places:</p>
            <div class="popular-places-list" id="popular-places-list"></div>
            <div class="homebase-modal-buttons">
                <button id="cancel-homebase">Cancel</button>
                <button id="use-current-location">Use Current Location</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Populate popular places
    const popularPlacesList = document.getElementById('popular-places-list');
    const topPlaces = [...places].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 5);
    
    topPlaces.forEach(place => {
        const placeItem = document.createElement('div');
        placeItem.className = 'popular-place-item';
        placeItem.innerHTML = `<span>${place.name}</span>`;
        placeItem.addEventListener('click', () => {
            setHomeBase(place.lat, place.lng, place.name);
            document.body.removeChild(modal);
        });
        popularPlacesList.appendChild(placeItem);
    });
    
    // Cancel button
    document.getElementById('cancel-homebase').addEventListener('click', () => {
        document.body.removeChild(modal);
        map.off('click', mapClickHandler);
    });
    
    // Use current location button
    document.getElementById('use-current-location').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setHomeBase(
                        position.coords.latitude,
                        position.coords.longitude,
                        'My Location'
                    );
                    document.body.removeChild(modal);
                },
                (error) => {
                    alert('Unable to get your location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });
    
    // Set up map click handler
    const mapClickHandler = (e) => {
        setHomeBase(e.latlng.lat, e.latlng.lng, 'Custom Location');
        document.body.removeChild(modal);
        map.off('click', mapClickHandler);
    };
    
    map.on('click', mapClickHandler);
}

// Set home base at the specified coordinates
function setHomeBase(lat, lng, name) {
    // Remove existing home marker if any
    if (homeMarker) {
        map.removeLayer(homeMarker);
    }
    
    // Create new home base
    customHomeBase = {
        lat: lat,
        lng: lng,
        name: name,
        color: '#10B981' // emerald color
    };
    
    // Create homebase SVG icon
    const homebaseIconHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path fill="${customHomeBase.color}" d="M12 3L4 9v12h16V9l-8-6zm0 7.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
        </svg>
    `;
    
    const homeIcon = L.divIcon({
        className: 'custom-marker homebase-marker',
        html: homebaseIconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Create and add marker
    homeMarker = L.marker([lat, lng], {
        icon: homeIcon,
        zIndexOffset: 1000 // Make sure homebase is on top
    }).addTo(map);
    
    // Add tooltip
    homeMarker.bindTooltip(name + ' (Home Base)', { 
        className: 'place-tooltip',
        offset: [0, -14]
    });
    
    // Center map on new home base
    map.setView([lat, lng], 15);
    
    // Update home base in travel data
    if (travelData) {
        travelData.homebase = customHomeBase;
    }
    
    // Show confirmation
    showNotification(`Home base set to ${name}`);
}

// Show a temporary notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('map-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'map-notification';
        notification.className = 'map-notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);