// City configuration data
export const cityConfig = {
    name: "Almaty",
    center: {
        lat: 43.2608,
        lng: 76.9453
    },
    defaultZoom: 12,
    homeBase: {
        lat: 43.2615,
        lng: 76.9445,
        name: "Airbnb near Green Bazaar",
        color: "#10B981" // emerald-500
    }
};

// Categories configuration
export const categories = {
    default: {
        color: "#6B7280", // gray-500
        icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    },
    home: {
        color: "#10B981", // emerald-500
        icon: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
    },
    nature: {
        color: "#059669", // emerald-600
        icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    },
    culture: {
        color: "#7C3AED", // violet-600
        icon: "M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
    },
    urban: {
        color: "#2563EB", // blue-600
        icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
    },
    adventure: {
        color: "#DC2626", // red-600
        icon: "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"
    },
    sport: {
        color: "#0891B2", // cyan-600
        icon: "M19.52 2.49c-2.34-2.34-6.62-1.87-9.55 1.06-1.6 1.6-2.52 3.87-2.54 5.46-.02 1.58.26 3.89-1.35 5.5l-4.24 4.24 1.42 1.42 4.24-4.24c1.61-1.61 3.92-1.33 5.5-1.35s3.86-.94 5.46-2.54c2.92-2.93 3.4-7.21 1.06-9.55zm-9.2 9.19c-1.53-1.53-1.05-4.61 1.06-6.72s5.18-2.59 6.72-1.06c1.53 1.53 1.05 4.61-1.06 6.72s-5.18 2.59-6.72 1.06zM18 17c.53 0 1.04.21 1.41.59.78.78.78 2.05 0 2.83-.37.37-.88.58-1.41.58s-1.04-.21-1.41-.59c-.78-.78-.78-2.05 0-2.83.37-.37.88-.58 1.41-.58"
    },
    art: {
        color: "#9333EA", // purple-600
        icon: "M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
    },
    monument: {
        color: "#EA580C", // orange-600
        icon: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm0 2c3.71 0 5.81.29 6.67 1H5.33c.86-.71 2.96-1 6.67-1zM6 7h5v3H6V7zm12 8.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5zm0-5.5h-5V7h5v3z"
    },
    religion: {
        color: "#4F46E5", // indigo-600
        icon: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6 9.82L12 16 6 12.82V10.73l6 3.27 6-3.27v2.09z"
    },
    restaurant: {
        color: "#DC2626", // red-600
        icon: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"
    },
    cafe: {
        color: "#B91C1C", // red-700
        icon: "M4 19h16v2H4zm13-13.9V3H7v2.1c-2.5.8-4 3-4 5.4v4c0 .5.2 1 .5 1.5.7 1 2 1.9 4.4 1.9h8.2c2.4 0 3.7-.9 4.4-1.9.3-.5.5-1 .5-1.5v-4c0-2.4-1.5-4.6-4-5.4zm-9 1.2c-.4.2-.7.5-1 .8-.5.6-.9 1.4-1 2.4l.2-.1L8 10V7.5c0-.9.1-1.8.9-2.3.1-.1.2-.1.3-.1-.1 0-.1 0-.2-.1zm5-1.2V10l1.8-.9.2.1c-.1-.9-.5-1.7-1-2.4-.4-.4-.7-.6-1-.8z"
    },
    food_court: {
        color: "#991B1B", // red-800
        icon: "M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"
    }
};

// Place types configuration
export const placeTypes = {
    NATURE: 'nature',
    CULTURE: 'culture',
    URBAN: 'urban',
    ADVENTURE: 'adventure',
    SPORT: 'sport',
    ART: 'art',
    MONUMENT: 'monument',
    RELIGION: 'religion'
};

// Restaurant types configuration
export const restaurantTypes = {
    RESTAURANT: 'restaurant',
    CAFE: 'cafe',
    FOOD_COURT: 'food_court'
}; 