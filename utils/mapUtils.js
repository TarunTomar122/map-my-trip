/**
 * Map utility functions for the trip planner application
 */

/**
 * Create a custom icon for map markers
 * @param {string} color - The color of the marker
 * @param {string} type - The type of marker (place, restaurant, home)
 * @param {Object} options - Additional options
 * @returns {L.DivIcon} - A Leaflet div icon
 */
export function createIcon(color, type = 'default', options = {}) {
    const size = options.size || 24;
    const className = options.className || 'custom-marker';
    
    // Different styles based on marker type
    let style = '';
    if (type === 'home' || type === 'homebase') {
        style = `background-color: ${color}; border: 3px solid white;`;
    } else if (type === 'restaurant') {
        style = `background-color: ${color}; border-radius: 50%; border: 2px solid white;`;
    } else {
        // Default for places
        style = `background-color: ${color}; border-radius: 4px; border: 2px solid white;`;
    }
    
    return L.divIcon({
        className: className,
        html: `<div style="${style}"></div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size],
        popupAnchor: [0, -size]
    });
}

/**
 * Calculate the distance between two points in kilometers
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lng1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lng2 - Longitude of the second point
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} - Radians
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Create a route line between two points
 * @param {L.Map} map - The Leaflet map instance
 * @param {Array} startPoint - [lat, lng] of the start point
 * @param {Array} endPoint - [lat, lng] of the end point
 * @param {string} color - The color of the line
 * @returns {L.Polyline} - The created polyline
 */
export function createRouteLine(map, startPoint, endPoint, color = '#4a6fa5') {
    const line = L.polyline([startPoint, endPoint], {
        color: color,
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 10'
    }).addTo(map);
    
    return line;
}

/**
 * Find nearby points of interest
 * @param {Array} places - Array of places
 * @param {number} lat - Latitude of the center point
 * @param {number} lng - Longitude of the center point
 * @param {number} radius - Radius in kilometers
 * @returns {Array} - Array of nearby places
 */
export function findNearbyPOIs(places, lat, lng, radius = 1) {
    return places.filter(place => {
        const distance = calculateDistance(lat, lng, place.lat, place.lng);
        return distance <= radius;
    });
}

/**
 * Create a tooltip for a marker
 * @param {string} title - The title of the tooltip
 * @param {string} content - The content of the tooltip
 * @returns {string} - HTML content for the tooltip
 */
export function createTooltip(title, content) {
    return `
        <div class="custom-tooltip">
            <h3>${title}</h3>
            <p>${content}</p>
        </div>
    `;
} 