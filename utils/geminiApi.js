/**
 * Utility functions for interacting with the Google Gemini API
 */

// Constants
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';

/**
 * Generate a travel plan using the Gemini API
 * @param {Object} options - Options for generating the travel plan
 * @param {string} options.cityName - The name of the city to generate a plan for
 * @param {number} options.numDays - The number of days for the trip
 * @param {string} options.additionalInfo - Additional information about preferences
 * @returns {Promise<Object>} - The generated travel plan
 */
export async function generateTravelPlan({ cityName, numDays, additionalInfo = '' }) {
    try {
        // Get API key from server
        const apiKeyResponse = await fetch('/api/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cityName, numDays, additionalInfo })
        });
        
        const apiKeyData = await apiKeyResponse.json();
        
        if (apiKeyData.error) {
            throw new Error(apiKeyData.error);
        }
        
        const apiKey = apiKeyData.apiKey;
        
        // Create prompt for the API
        const prompt = createPrompt(cityName, numDays, additionalInfo);
        
        // Fetch response from Gemini API
        const response = await fetchGeminiResponse(prompt, apiKey);
        
        // Parse the response
        return parseGeminiResponse(response);
    } catch (error) {
        console.error('Error generating travel plan:', error);
        throw new Error(`Failed to generate travel plan: ${error.message}`);
    }
}

/**
 * Create a prompt for the Gemini API
 * @param {string} cityName - The name of the city
 * @param {number} numDays - The number of days for the trip
 * @param {string} additionalInfo - Additional information about preferences
 * @returns {string} - The formatted prompt
 */
function createPrompt(cityName, numDays, additionalInfo) {
    return `
    Generate a detailed travel plan for ${cityName} for ${numDays} days.
    
    Additional preferences: ${additionalInfo || 'No specific preferences'}

    Please format your response as a valid JavaScript object with the following structure:
    
    {
      cityConfig: {
        name: "City Name",
        center: { lat: latitude, lng: longitude },
        defaultZoom: zoomLevel
      },
      homebase: {
        name: "Homebase Name",
        lat: latitude,
        lng: longitude,
        color: "#10B981",
        description: "Brief description of why this is a good homebase"
      },
      categories: {
        landmark: { name: "Landmark", color: "#hexColor" },
        museum: { name: "Museum", color: "#hexColor" },
        park: { name: "Park", color: "#hexColor" },
        restaurant: { name: "Restaurant", color: "#hexColor" },
        cafe: { name: "Cafe", color: "#hexColor" }
      },
      places: [
        {
          id: "unique_id",
          name: "Place Name",
          type: "place.category",
          lat: latitude,
          lng: longitude,
          notes: "Brief description",
          details: {
            description: "description",
            howToReach: [
              "Bullet point 1 about transportation options",
              "Bullet point 2 about best routes",
              "Bullet point 3 about parking or public transit tips"
            ],
            whatToExpect: [
              "Bullet point 1 about main attractions",
              "Bullet point 2 about experience highlights",
              "Bullet point 3 about typical visit duration"
            ],
            thingsToBeAwareOf: [
              "Bullet point 1 about important warnings",
              "Bullet point 2 about cultural considerations",
              "Bullet point 3 about timing or seasonal information"
            ]
          }
        }
      ],
      restaurants: [
        {
          id: "unique_id",
          name: "Restaurant Name",
          type: "place.restaurant or place.cafe",
          lat: latitude,
          lng: longitude,
          notes: "Brief description",
          details: {
            description: "Detailed description",
            whatToEat: [
              "Bullet point 1 about signature dish",
              "Bullet point 2 about popular menu items",
              "Bullet point 3 about specialty drinks or desserts"
            ],
            whyGoThere: [
              "Bullet point 1 about unique atmosphere",
              "Bullet point 2 about special features",
              "Bullet point 3 about local reputation"
            ],
            expenses: "Price range information",
            bestDishes: [
              "Bullet point 1 about top-rated dish",
              "Bullet point 2 about chef's special",
              "Bullet point 3 about must-try item"
            ],
            howToReach: [
              "Bullet point 1 about location access",
              "Bullet point 2 about nearby landmarks",
              "Bullet point 3 about transportation options"
            ],
            thingsToBeAwareOf: [
              "Bullet point 1 about reservation requirements",
              "Bullet point 2 about dress code or customs",
              "Bullet point 3 about busy hours or seasonal changes"
            ]
          }
        }
      ]
    }

    IMPORTANT: 
    1. Provide ONLY the JavaScript object, with no additional text before or after.
    2. Use accurate latitude and longitude coordinates for the city center and all places.
    4. Ensure all IDs are unique strings.
    5. Make sure all text fields have detailed, helpful information.
    6. Format the "howToReach", "whatToExpect", "thingsToBeAwareOf", "whatToEat", "whyGoThere", and "bestDishes" fields as arrays of bullet points (3-5 points each).
    7. Do not include any image URLs or references.
    8. ALWAYS include a homebase object with a name, coordinates, color, and description. The homebase should be in a central location or near popular hotels.
    9. The homebase should be in a central location or near popular hotels.
    10. Consider the weather and seasonlity if provided in the additional info.
    11. Make sure you are considering the number of days the trip is for and accordingly adjust the places and restaurants/cafes. 
    12. Make sure you add some of the off the beaten path places to visit even if they are a bit far from the homebase if the user has more days.
    `;
}

/**
 * Fetch a response from the Gemini API
 * @param {string} prompt - The prompt to send to the API
 * @param {string} apiKey - The API key for authentication
 * @returns {string} - The text response from the API
 */
async function fetchGeminiResponse(prompt, apiKey) {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8192
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response generated from the API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        throw error;
    }
}

/**
 * Parse the response from the Gemini API
 * @param {string} responseText - The text response from the API
 * @returns {Object} - The parsed travel plan object
 */
function parseGeminiResponse(responseText) {
    try {
        // Clean up the response text to extract just the JavaScript object
        let cleanedText = responseText.trim();
        
        // Remove any markdown code block indicators
        cleanedText = cleanedText.replace(/```javascript|```js|```|<code>|<\/code>/g, '').trim();
        
        // Evaluate the cleaned text as a JavaScript object
        // Using Function constructor instead of eval for better security
        const parsedObject = new Function(`return ${cleanedText}`)();
        
        // Validate the parsed object has the expected structure
        if (!parsedObject.cityConfig || !parsedObject.places || !parsedObject.restaurants) {
            throw new Error('Response does not have the expected structure');
        }
        
        return parsedObject;
    } catch (error) {
        console.error('Error parsing Gemini response:', error);
        throw new Error(`Failed to parse API response: ${error.message}`);
    }
} 