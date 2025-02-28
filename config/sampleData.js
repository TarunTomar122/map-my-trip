/**
 * Sample data for testing the trip planner application
 * This simulates the response from the Gemini API
 */

export const sampleTravelPlan = {
    cityConfig: {
        name: "Paris",
        center: {
            lat: 48.8566,
            lng: 2.3522
        },
        defaultZoom: 13
    },
    categories: {
        landmark: {
            name: "Landmark",
            color: "#4285F4"
        },
        museum: {
            name: "Museum",
            color: "#EA4335"
        },
        park: {
            name: "Park",
            color: "#34A853"
        },
        restaurant: {
            name: "Restaurant",
            color: "#FBBC05"
        },
        cafe: {
            name: "Cafe",
            color: "#AA00FF"
        }
    },
    places: [
        {
            id: "place1",
            name: "Eiffel Tower",
            type: "place.landmark",
            lat: 48.8584,
            lng: 2.2945,
            notes: "Iconic iron tower",
            details: {
                description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
                howToReach: "Take Metro Line 6 to Bir-Hakeim station or Line 9 to Trocadéro station.",
                whatToExpect: "Stunning views of Paris, especially at sunset. There are three levels to visit, including restaurants on the first and second levels.",
                thingsToBeAwareOf: "Long queues, especially during peak tourist season. Consider booking tickets in advance online."
            }
        },
        {
            id: "place2",
            name: "Louvre Museum",
            type: "place.museum",
            lat: 48.8606,
            lng: 2.3376,
            notes: "World's largest art museum",
            details: {
                description: "The Louvre, or the Louvre Museum, is the world's largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine.",
                howToReach: "Take Metro Line 1 or 7 to Palais-Royal–Musée du Louvre station.",
                whatToExpect: "Vast collection of art including the Mona Lisa and Venus de Milo. The museum is divided into eight departments.",
                thingsToBeAwareOf: "Very large museum that can't be fully explored in one day. Plan your visit to focus on specific sections."
            }
        },
        {
            id: "place3",
            name: "Notre-Dame Cathedral",
            type: "place.landmark",
            lat: 48.8530,
            lng: 2.3499,
            notes: "Medieval Catholic cathedral",
            details: {
                description: "Notre-Dame de Paris, also known as Notre-Dame Cathedral, is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris.",
                howToReach: "Take Metro Line 4 to Cité station or RER B or C to Saint-Michel–Notre-Dame station.",
                whatToExpect: "Gothic architecture with beautiful stained glass windows. Note that due to the 2019 fire, interior access is limited during reconstruction.",
                thingsToBeAwareOf: "Reconstruction is ongoing following the 2019 fire. The cathedral is expected to reopen in 2024."
            }
        },
        {
            id: "place4",
            name: "Luxembourg Gardens",
            type: "place.park",
            lat: 48.8462,
            lng: 2.3372,
            notes: "Beautiful public park",
            details: {
                description: "The Luxembourg Gardens is a 23-hectare park in the 6th arrondissement of Paris, known for its lawns, tree-lined promenades, flowerbeds, model sailboats on its circular basin, and picturesque Medici Fountain.",
                howToReach: "Take RER B to Luxembourg station or Metro Line 4 to Saint-Placide station.",
                whatToExpect: "Peaceful gardens with beautiful landscaping, statues, and the Luxembourg Palace. Popular spot for picnics and relaxation.",
                thingsToBeAwareOf: "The gardens close at sunset. Chairs are available for sitting, but lying on the grass is not permitted in most areas."
            }
        },
        {
            id: "place5",
            name: "Montmartre",
            type: "place.landmark",
            lat: 48.8867,
            lng: 2.3431,
            notes: "Historic hilltop district",
            details: {
                description: "Montmartre is a large hill in Paris's 18th arrondissement. It is 130 meters high and gives its name to the surrounding district, part of the Right Bank in the northern section of the city.",
                howToReach: "Take Metro Line 2 to Anvers station and walk up the hill, or Line 12 to Abbesses station.",
                whatToExpect: "Charming neighborhood with narrow streets, artists' studios, and the white-domed Basilica of the Sacré-Cœur at the summit.",
                thingsToBeAwareOf: "Steep climb to reach the top, though there is a funicular. Be aware of pickpockets and scam artists in tourist areas."
            }
        }
    ],
    restaurants: [
        {
            id: "rest1",
            name: "Le Jules Verne",
            type: "place.restaurant",
            lat: 48.8583,
            lng: 2.2944,
            notes: "Fine dining in the Eiffel Tower",
            details: {
                description: "Le Jules Verne is a Michelin-starred restaurant located on the second floor of the Eiffel Tower, offering contemporary French cuisine with panoramic views of Paris.",
                whatToEat: "Tasting menu featuring seasonal French cuisine with modern interpretations.",
                whyGoThere: "Unique dining experience with spectacular views of Paris from inside the Eiffel Tower.",
                expenses: "Very expensive, with tasting menus starting around €190 per person.",
                bestDishes: "Roasted lobster, beef filet, and soufflé desserts.",
                howToReach: "Take the dedicated elevator on the south pillar of the Eiffel Tower.",
                thingsToBeAwareOf: "Reservations required months in advance. Dress code is formal."
            }
        },
        {
            id: "rest2",
            name: "Café de Flore",
            type: "place.cafe",
            lat: 48.8539,
            lng: 2.3336,
            notes: "Historic café in Saint-Germain",
            details: {
                description: "Café de Flore is one of the oldest coffeehouses in Paris, located at the corner of Boulevard Saint-Germain and Rue Saint-Benoît in the 6th arrondissement.",
                whatToEat: "Classic French café fare including croissants, omelettes, and croque-monsieur.",
                whyGoThere: "Historic café frequented by famous intellectuals and artists throughout the 20th century.",
                expenses: "Moderately expensive due to its famous status and location.",
                bestDishes: "Hot chocolate, croissants, and the Croque Madame.",
                howToReach: "Take Metro Line 4 to Saint-Germain-des-Prés station.",
                thingsToBeAwareOf: "Popular tourist spot that can be crowded. Service can be slow during peak hours."
            }
        },
        {
            id: "rest3",
            name: "L'As du Fallafel",
            type: "place.restaurant",
            lat: 48.8570,
            lng: 2.3593,
            notes: "Famous falafel shop in Le Marais",
            details: {
                description: "L'As du Fallafel is a popular Middle Eastern restaurant in the historic Jewish quarter of Le Marais, known for serving some of the best falafel in Paris.",
                whatToEat: "Falafel sandwich with all the toppings, including hummus, eggplant, and cabbage.",
                whyGoThere: "Authentic Middle Eastern street food at affordable prices in a historic neighborhood.",
                expenses: "Inexpensive, with sandwiches around €6-8.",
                bestDishes: "Special falafel sandwich with all the toppings.",
                howToReach: "Take Metro Line 1 to Saint-Paul station.",
                thingsToBeAwareOf: "Long lines during peak hours. Closed on Saturdays for Shabbat."
            }
        },
        {
            id: "rest4",
            name: "Angelina",
            type: "place.cafe",
            lat: 48.8656,
            lng: 2.3304,
            notes: "Elegant tearoom known for hot chocolate",
            details: {
                description: "Angelina is a famous tearoom founded in 1903, located on Rue de Rivoli near the Louvre Museum. It's known for its luxurious hot chocolate and Mont Blanc pastry.",
                whatToEat: "African hot chocolate ('chocolat chaud l'africain') and Mont Blanc pastry.",
                whyGoThere: "Experience one of Paris's most famous tearooms with Belle Époque interior.",
                expenses: "Moderately expensive, with hot chocolate around €8 and pastries around €10.",
                bestDishes: "Hot chocolate, Mont Blanc pastry, and macarons.",
                howToReach: "Take Metro Line 1 to Tuileries station.",
                thingsToBeAwareOf: "Can be very crowded, especially on weekends. Consider making a reservation."
            }
        },
        {
            id: "rest5",
            name: "Le Comptoir du Relais",
            type: "place.restaurant",
            lat: 48.8539,
            lng: 2.3381,
            notes: "Popular bistro in Saint-Germain",
            details: {
                description: "Le Comptoir du Relais is a popular bistro in Saint-Germain-des-Prés, run by renowned chef Yves Camdeborde. It offers traditional French cuisine with a modern twist.",
                whatToEat: "Seasonal French bistro classics and innovative daily specials.",
                whyGoThere: "Experience high-quality French cuisine in a lively bistro atmosphere.",
                expenses: "Moderately expensive, with lunch prix fixe around €30 and dinner à la carte more expensive.",
                bestDishes: "Terrine de campagne, confit duck, and seasonal desserts.",
                howToReach: "Take Metro Line 4 to Odéon station.",
                thingsToBeAwareOf: "Extremely difficult to get dinner reservations. Lunch is first-come, first-served."
            }
        }
    ]
}; 