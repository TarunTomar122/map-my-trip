import { categories } from '../config/cityData.js';

// Create SVG icon for any category
export function createIcon(color, category, options = {}) {
    const { size = 32, className = 'custom-place-icon' } = options;
    const svgPath = categories[category]?.icon || categories.default.icon;
    
    return L.divIcon({
        className: className,
        html: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));">
                <path fill="${color}" d="${svgPath}"/>
              </svg>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
    });
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Create a route line between two points
export function createRouteLine(start, end, color) {
    return L.polyline([
        [start.lat, start.lng],
        [end.lat, end.lng]
    ], {
        color: color,
        weight: 3,
        opacity: 0.7,
        className: 'route-line'
    });
}

// Find nearby points of interest
export function findNearbyPOIs(point, poiList, maxDistance = 1.5, maxCount = 3) {
    return poiList
        .map(poi => ({
            ...poi,
            distance: calculateDistance(point, poi)
        }))
        .filter(poi => poi.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxCount);
}

// Create a tooltip for a marker
export function createTooltip(title, options = {}) {
    return L.tooltip({
        permanent: false,
        direction: 'top',
        className: 'place-tooltip',
        ...options
    }).setContent(title);
} 