import { placeTypes, restaurantTypes, categories } from './cityData.js';

export const places = [
    {
        id: 1,
        name: "Big Almaty Lake",
        type: placeTypes.NATURE,
        lat: 43.0556,
        lng: 76.9825,
        color: categories.nature.color,
        details: {
            description: "A stunning alpine lake located in the Trans-Ili Alatau mountains, famous for its turquoise waters and surrounding snow-capped peaks.",
            howToReach: "Most reliable option is taxi (5000-7000 KZT one way, book return trip in advance). Tour groups offer convenient day trips. Public transport: take bus 28 to the last stop, then hike or taxi. Car rental possible but 4x4 recommended, especially in winter. Drive time about 1.5 hours from city center. Border zone permit required in advance.",
            whatToExpect: "Spectacular photography opportunities, especially in early morning as the lake's color changes throughout the day. Several hiking trails around the lake and to nearby peaks. Designated picnic areas available. Rich bird watching with various alpine species. Excellent star gazing on clear nights. Scientific station visible but not open to public.",
            thingsToBeAwareOf: "Bring passport and border zone permit. High altitude (2511m) requires proper acclimatization. Weather changes rapidly - bring warm clothes and rain gear. Swimming not allowed. Limited facilities - bring food, water, and supplies. Best visited May-October. Road closes after heavy snow. No camping allowed near lake. Phone signal limited. Start early to avoid afternoon clouds."
        }
    },
    {
        id: 2,
        name: "Medeu",
        type: placeTypes.SPORT,
        lat: 43.1614,
        lng: 77.0487,
        color: categories.sport.color,
        details: {
            description: "The world's highest Olympic-size ice skating rink, set in a spectacular mountain valley at 1,691 meters above sea level.",
            howToReach: "Take bus 12 from Dostyk/Abai intersection (150 KZT) or taxi (2000-3000 KZT one way). Cable car available from downtown station near Hotel Kazakhstan. Shared taxis (marshrutka) run on weekends. Many organized tours combine with Shymbulak visit.",
            whatToExpect: "World-class ice skating with equipment rental available (2000-3000 KZT). Fascinating historical museum about the rink. Multiple panoramic viewing platforms. Good selection of restaurants and cafes. Scenic hiking trails to nearby areas. Excellent photo opportunities of mountains and city. Regular sports events and competitions. Popular for altitude training. Special night skating sessions in winter.",
            thingsToBeAwareOf: "High altitude affects physical performance. Very crowded on weekends - go early. Bring warm clothes even in summer. Book equipment in advance during holidays. Last buses return around 7 PM. Cable car service affected by strong winds. Restaurant prices higher than city center. Special events may restrict public skating. Closed Mondays for maintenance. Professional photography requires permits."
        }
    },
    {
        id: 13,
        name: "Shymbulak Resort",
        type: placeTypes.SPORT,
        lat: 43.1286,
        lng: 77.0819,
        color: categories.sport.color,
        details: {
            description: "Kazakhstan's largest ski resort with modern infrastructure, located in the picturesque Zailiyskiy Alatau mountains at an elevation of 2,260 meters.",
            howToReach: "Take bus 12 to Medeu, then transfer to the cable car (2500 KZT for gondola pass). Taxi directly from city costs 3000-4000 KZT one way. Many tour operators offer day trips including equipment. Can combine with visit to Medeu ice rink. Personal car possible with parking at Medeu, then cable car.",
            whatToExpect: "Excellent skiing with 20+ kilometers of trails for all skill levels. Modern ski lifts with minimal wait times. Professional ski instructors available for lessons. Equipment rental on-site. Several restaurants and cafes with mountain views. Summer activities including hiking and mountain biking. Year-round gondola rides to panoramic viewpoints. Luxury hotel accommodations.",
            thingsToBeAwareOf: "Peak season (Dec-Feb) can be crowded on weekends. Book lessons and equipment in advance during holidays. Weather conditions can change rapidly - check forecasts. High altitude may affect some visitors. Last gondola down usually at 6 PM. Restaurant prices higher than city. Off-piste skiing requires guides. Summer operation hours reduced. Warm clothing essential even in spring/fall."
        }
    },
    {
        id: 3,
        name: "Kok-Tobe",
        type: placeTypes.URBAN,
        lat: 43.2220,
        lng: 76.9527,
        color: categories.urban.color,
        details: {
            description: "A mountain with a popular recreational area, offering the best panoramic views of Almaty city and surrounding mountains.",
            howToReach: "Cable car from Dostyk Ave near Hotel Kazakhstan (2000 KZT round trip). Shuttle bus available from Dostyk Ave (500 KZT). Taxis can drive directly to top or base station. Walking is possible but steep from Dostyk Ave (~40 minutes). Public bus runs to base station with transfer options.",
            whatToExpect: "Stunning panoramic city views, especially beautiful at sunset. Famous Beatles monument perfect for photos. Small amusement park with various rides. Selection of restaurants and cafes. Souvenir shops for local crafts. Mini-zoo for families. Views of the iconic TV tower. Regular street performers. Children's playground. Multiple entertainment venues.",
            thingsToBeAwareOf: "Cable car closes in strong winds. Peak times: sunset and weekends. Restaurant reservations needed for window seats. Higher prices than city center. Last cable car down varies by season. Some attractions close in winter. Slippery paths in winter/rain. Photography equipment restrictions. Altitude affects some visitors. Limited parking if driving."
        }
    },
    {
        id: 4,
        name: "Charyn Canyon",
        type: placeTypes.NATURE,
        lat: 43.3505,
        lng: 79.0767,
        color: categories.nature.color,
        details: {
            description: "Often called the Grand Canyon's little brother, featuring stunning red sandstone formations carved by the Charyn River over millions of years.",
            howToReach: "Most convenient option is organized tour with transport and guide (15000-25000 KZT). Private taxi costs around 30000 KZT for full day. Rental car possible but 4x4 recommended, 4-5 hour drive. Public bus goes to Kegen, then arrange local transport. Shared tours available on weekends.",
            whatToExpect: "Explore the famous Valley of Castles with its main viewpoint and trail. Various hiking routes for different skill levels. Best photography in early morning or late afternoon. Designated camping areas available. Seasonal river activities. Visit the eco-park. Stay in traditional yurts. Amazing night sky observation. Fascinating geological exploration. Cultural tours to nearby villages.",
            thingsToBeAwareOf: "No direct public transport to canyon. Very limited facilities - bring all supplies. Extreme temperature variations between day and night. Watch for flash floods in spring. Some trails need permits. No cell service in canyon. Essential to bring sunscreen and hat. Limited water sources. Emergency services far away. Best visited in spring and fall. Some areas have restricted access. Basic accommodations only."
        }
    },
    {
        id: 5,
        name: "Zenkov Cathedral",
        type: placeTypes.CULTURE,
        lat: 43.2567,
        lng: 76.9456,
        color: categories.culture.color,
        details: {
            description: "One of the world's tallest wooden buildings and a stunning example of Russian Orthodox architecture, built without any nails.",
            howToReach: "Easy 5-minute walk from Zhibek Zholy metro station. Multiple bus and trolleybus routes stop at Panfilov Park. Very accessible by walking from city center. Any city taxi knows the location. Often included in organized city tours.",
            whatToExpect: "Regular religious services with posted schedule. Excellent architecture photography opportunities. Fascinating museum inside the cathedral. Beautiful Orthodox choir performances. Impressive religious art collection. Guided tours available on request. Peaceful park surroundings perfect for walks. Rotating historical exhibitions. Convenient souvenir shop nearby. Easy to combine with other park attractions.",
            thingsToBeAwareOf: "Dress modestly - shoulders and knees must be covered, women should cover heads. No photos during services. Maintain quiet during prayer times. Men must remove hats inside. Especially busy during religious holidays. Some areas not open to public. Opening hours vary seasonally. Flash photography not allowed inside. Tour groups get priority access. Small donation expected for candles or entry."
        }
    },
    {
        id: 6,
        name: "Panfilov Park",
        type: placeTypes.URBAN,
        lat: 43.2584,
        lng: 76.9453,
        color: categories.urban.color,
        details: {
            description: "Historic park named after Panfilov's 28 Guardsmen, featuring monuments, the Zenkov Cathedral, and the Glory Memorial.",
            howToReach: "Convenient access from both Zhibek Zholy and Almaly metro stations. Multiple bus routes stop around the park edges. Easy walking distance from city center. Bike rental stations available nearby. All city taxis can reach any entrance.",
            whatToExpect: "Impressive historical monuments and memorials. Interesting military museum. Regular street music performances. Rotating local art exhibitions. Various seasonal festivals and events. Modern children's playgrounds. Excellent photography spots. Pleasant picnic areas. Available walking tours. Popular street food vendors. Regular chess player gatherings. Morning exercise groups.",
            thingsToBeAwareOf: "Gets very crowded on weekends and holidays. Respectful behavior required at monuments. Best photos possible in early morning. Limited public toilet facilities. Access may be restricted during special events. Little protection from weather. Security cameras in operation. No alcohol consumption allowed. Some grass areas restricted. Professional photography may require permit."
        }
    },
    {
        id: 7,
        name: "Arbat Street",
        type: placeTypes.URBAN,
        lat: 43.2606,
        lng: 76.9422,
        color: categories.urban.color,
        details: {
            description: "Almaty's main pedestrian street, known for shopping, cafes, street artists, and vibrant urban culture.",
            howToReach: "Direct access from Zhibek Zholy metro station. Multiple bus stops nearby. Easy walking connections to main city attractions. Any taxi knows it as 'Arbat' or 'Zhybek Zholy street'. Convenient bike rental stations at both ends.",
            whatToExpect: "Vibrant street art scene with various performers. Skilled portrait painters and caricaturists. Extensive souvenir shopping options. Rich cafe culture and dining scene. Modern art galleries. Great street photography opportunities. Regular cultural performances. Trendy fashion boutiques. Local snacks and ice cream vendors. Perfect for people watching. Lively evening entertainment. Beautiful seasonal decorations.",
            thingsToBeAwareOf: "Prices higher than other areas. Busiest during evenings and weekends. Performers expect tips for photos. Watch out for cyclists. Many shops close for lunch break. Limited weather protection. Be aware of pickpockets in crowds. Bargaining expected in souvenir shops. Restaurant quality varies widely. Ask permission before photographing performers."
        }
    },
    {
        id: 8,
        name: "Kolsai Lakes",
        type: placeTypes.NATURE,
        lat: 42.9833,
        lng: 78.3167,
        color: categories.nature.color,
        details: {
            description: "A series of three stunning alpine lakes known for their pristine beauty, surrounded by Tian Shan mountains and pine forests.",
            howToReach: "Most convenient via organized 2-3 day tours. Private car takes 6-7 hours with some rough roads. Public bus available to Saty village then local transport. Weekend shared taxis from Sayahat station. Private driver hire costs around 35000 KZT round trip.",
            whatToExpect: "Beautiful hiking trails between lakes (1-4 hours each). Popular horse riding tours. Well-maintained camping areas. Perfect for photography, especially at sunrise/sunset. Fishing available with permit. Comfortable local homestays. Authentic traditional food. Mountain biking opportunities. Rich bird watching. Summer swimming possible. Traditional yurt accommodation. Cultural experiences in Saty village.",
            thingsToBeAwareOf: "High altitude (1800-2850m) requires acclimatization. Rapid weather changes common. Very basic facilities. Advance accommodation booking essential. Poor phone signal. Bring cash - no ATMs available. Many trails require guides. Bring ID for border zone. Best visited June-September. Winter access often impossible. Book horse rides ahead. Bring camping gear if not staying in homestay."
        }
    },
    {
        id: 9,
        name: "Kaindy Lake",
        type: placeTypes.NATURE,
        lat: 42.9854,
        lng: 78.2947,
        color: categories.nature.color,
        details: {
            description: "Sunken forest lake created by an earthquake in 1911, featuring submerged spruce trees and crystal-clear water.",
            howToReach: "Usually visited as part of Kolsai Lakes tour. Requires 4x4 vehicle from Saty village. Horse riding available from Saty. Private drivers with suitable vehicles available. Organized 1-2 day tours from Almaty. Local guides can be hired in Saty village.",
            whatToExpect: "Unique underwater photography opportunities (bring appropriate gear). Scenic hiking trails around lake. Perfect picnic locations. Swimming possible but very cold. Mountain hiking options. Available camping spots. Popular horse riding tours. Interesting local guide stories. Beautiful landscape photography. Good wildlife spotting. Diving with proper equipment. Seasonal berry picking nearby.",
            thingsToBeAwareOf: "Water remains very cold year-round. Last 12km of road quite rough. No facilities at lake site. Possible altitude sickness. Quick weather changes common. Bring all necessary supplies. No cell phone coverage. Diving requires special permits. Best photography in early morning. Local guide recommended. Emergency help far away. Good footwear essential."
        }
    },
    {
        id: 10,
        name: "Central Mosque",
        type: placeTypes.RELIGION,
        lat: 43.2544,
        lng: 76.9353,
        color: categories.religion.color,
        details: {
            description: "The central mosque of Almaty, featuring beautiful Islamic architecture and serving as the main religious center of the city.",
            howToReach: "Easy access from Zhibek Zholy or Almaly metro stations. Multiple bus routes stop nearby. Short 10-minute walk from Arbat. Well-known landmark for any taxi. Included in most organized city tours.",
            whatToExpect: "Five daily prayer services. Outstanding architectural photography opportunities. Guided tours available by arrangement. Beautiful Islamic art displays. Enriching cultural learning experience. Chances to meet local community. Traditional religious ceremonies. Educational center access. Impressive calligraphy displays. Peaceful space for meditation.",
            thingsToBeAwareOf: "Modest dress required - long sleeves/pants/skirts. Women must cover heads (scarves provided). Remove shoes before entering. No photography during prayers. Busiest during Friday noon prayer. Some areas restricted to Muslims only. Quiet, respectful behavior expected. Best to visit between prayer times. Ask before taking photos. Separate areas for men and women."
        }
    },
    {
        id: 11,
        name: "First President's Park",
        type: placeTypes.URBAN,
        lat: 43.2275,
        lng: 76.9098,
        color: categories.urban.color,
        details: {
            description: "Modern park complex with fountains, gardens, and recreational areas, dedicated to Kazakhstan's first president.",
            howToReach: "Bus routes 29, 45, and 70 stop nearby. Quick 10-15 minute taxi ride from center. 30-minute walk from metro possible. Dedicated bike paths available. Convenient parking for private cars.",
            whatToExpect: "Impressive musical fountains during season. Great landscape photography opportunities. Well-maintained walking and jogging trails. Modern children's playgrounds. Designated exercise areas. Multiple photo spots. Pleasant picnic locations. Regular cultural events. Interesting art installations. Educational historical exhibits. Various sports facilities. Beautiful evening light shows.",
            thingsToBeAwareOf: "Best visited during spring and summer months. Fountain shows follow specific schedule. Some areas lack shade. Cafe closing times vary. Special events may limit access. Bike rental only available seasonally. No alcohol permitted in park. Security cameras throughout. Dogs must be kept on leash. Certain areas close at sunset."
        }
    },
    {
        id: 12,
        name: "Green Bazaar",
        type: placeTypes.URBAN,
        lat: 43.2608,
        lng: 76.9453,
        color: categories.urban.color,
        details: {
            description: "Traditional Central Asian bazaar selling fresh produce, dried fruits, nuts, local specialties, and daily necessities.",
            howToReach: "Direct access from Zhibek Zholy metro station. Multiple bus routes stop outside. Easy walking distance from Panfilov Park. Well-known destination for any taxi. Included in most city tours.",
            whatToExpect: "Wide selection of fresh produce. Opportunities to taste local foods. Rich cultural photography settings. Extensive spice markets. Traditional meat and dairy sections. Fresh traditional bread vendors. Various souvenir options. Authentic local interactions. Price negotiation experiences. Food preparation demonstrations. Seasonal specialty items. True traditional market atmosphere.",
            thingsToBeAwareOf: "Expect to bargain - start around 50% of initial price. Busiest during morning hours. Bring your own shopping bags. Keep belongings secure in crowds. Many vendors speak only Russian/Kazakh. Cash only - bring small bills. Tourist prices higher than locals pay. Ask permission for photos. Quality varies by season. Upper floor usually less crowded. Try samples before buying. Clean all produce before eating."
        }
    },
    {
        id: 14,
        name: "Alma Arasan",
        type: placeTypes.NATURE,
        lat: 43.0833,
        lng: 77.0667,
        color: categories.nature.color,
        details: {
            description: "A picturesque hot spring resort located in the foothills of the Trans-Ili Alatau mountains, known for its thermal mineral waters and therapeutic properties.",
            howToReach: "Take bus 28 to the last stop, then taxi (about 1500-2000 KZT). Direct taxi from city center costs 4000-5000 KZT one way. Tour operators offer day trips with transportation included. Personal car takes about 40 minutes from city center with parking available on-site.",
            whatToExpect: "Therapeutic mineral hot springs with indoor and outdoor pools. Beautiful mountain scenery and fresh air. Hiking trails of various difficulty levels. Spa treatments and massage services available. On-site cafe serving local cuisine. Picnic areas in natural settings. Photography opportunities in pristine nature. Day passes and longer stay options.",
            thingsToBeAwareOf: "Weekends can be very crowded - visit on weekdays if possible. Bring your own towels and swimming gear. Some pools have specific temperature ranges - check before entering. Medical consultation recommended for those with health conditions. Limited public transport options - plan return transportation in advance. Weather can change quickly in the mountains. Facilities are basic compared to city spas. Bring cash as card payment may be unreliable."
        }
    }
];

export const restaurants = [
    {
        id: 'r1',
        name: "Alasha",
        notes: "Traditional Central Asian cuisine",
        lat: 43.2590,
        lng: 76.9450,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "One of Almaty's most popular restaurants for traditional Uzbek and Central Asian cuisine, featuring authentic decor and live music.",
            whatToEat: "Their signature plov is a must-try, along with various shashlik (kebab) options and traditional bread. The lamb dishes are exceptional, and their samsa (meat-filled pastries) are freshly baked.",
            whyGoThere: "Experience authentic Central Asian dining in a beautifully decorated setting with traditional music and dance performances. Perfect for special occasions or cultural dining experience.",
            expenses: "Mid-range to upscale. Main dishes 2,500-6,000 KZT. Traditional performances and special dishes may require advance booking.",
            bestDishes: "Uzbek plov with lamb, mixed shashlik platter, lagman (hand-pulled noodles), traditional bread basket, and their special tea selection.",
            howToReach: "Located in the city center near Panfilov Park. Walking distance from Zhibek Zholy metro station. Most taxis know the location well.",
            thingsToBeAwareOf: "Reservations essential for dinner and weekends. Live music can be loud during performances. Some dishes take 30-40 minutes to prepare. Large portions - consider sharing."
        }
    },
    {
        id: 'r2',
        name: "Cafeteria",
        notes: "Modern European cafe",
        lat: 43.2377,
        lng: 76.9575,
        color: categories.cafe.color,
        type: restaurantTypes.CAFE,
        details: {
            description: "Trendy cafe known for excellent coffee, international breakfast options, and modern atmosphere. Popular among young professionals and digital nomads.",
            whatToEat: "Their breakfast menu is outstanding, featuring both international and local options. Fresh pastries are baked daily, and their coffee is sourced from top roasters.",
            whyGoThere: "Perfect spot for breakfast meetings or working remotely. Modern interior with plenty of natural light and good WiFi. Great for people watching.",
            expenses: "Moderate. Breakfast items 1,500-3,000 KZT. Coffee drinks 800-1,500 KZT. Lunch sets available on weekdays.",
            bestDishes: "Eggs Benedict with salmon, avocado toast with poached eggs, specialty pancakes, house-made granola, and their signature coffee drinks.",
            howToReach: "Located in the Dostyk area near Abai avenue. Short walk from Abai metro station. Well-known to taxi drivers.",
            thingsToBeAwareOf: "Gets very busy during weekend brunch hours. Limited seating during peak times. Some items sell out by afternoon. Outdoor seating seasonal."
        }
    },
    {
        id: 'r3',
        name: "Gakku",
        notes: "Traditional Kazakh restaurant",
        lat: 43.2399,
        lng: 76.9270,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "Upscale restaurant specializing in authentic Kazakh cuisine, offering a modern take on traditional dishes in an elegant setting.",
            whatToEat: "Traditional Kazakh specialties including beshbarmak, kazy (horse meat sausage), and kumys (fermented mare's milk). Their modern interpretations of classic dishes are exceptional.",
            whyGoThere: "Best place to experience high-end Kazakh cuisine. Beautiful interior design combining traditional elements with modern aesthetics. Knowledgeable staff can explain dishes.",
            expenses: "Mid to high-range. Main dishes 3,000-8,000 KZT. Special horse meat dishes may be more expensive. Traditional drinks extra.",
            bestDishes: "Signature beshbarmak, horse meat platter with various cuts, traditional soups like koktal and sorpa, modern takes on baursak.",
            howToReach: "Located near the Palace of Republic. Easy access by taxi. Parking available for private vehicles.",
            thingsToBeAwareOf: "Some traditional dishes may be unfamiliar to tourists. Horse meat is a local delicacy. Advance reservations recommended for dinner. Private rooms available for groups."
        }
    },
    {
        id: 'r4',
        name: "Nedelka",
        notes: "European cuisine",
        lat: 43.2427,
        lng: 76.9527,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "Sophisticated restaurant offering European cuisine with a focus on steaks and seafood, complemented by an extensive wine list.",
            whatToEat: "Premium steaks cooked to perfection, fresh seafood dishes, and homemade pasta. Their wine selection includes both Old and New World options.",
            whyGoThere: "Elegant atmosphere perfect for romantic dinners or business meetings. Professional service and consistent quality. Beautiful terrace in summer.",
            expenses: "Mid to high-range. Main dishes 3,500-7,000 KZT. Business lunch offers better value. Wine by glass or bottle available.",
            bestDishes: "Ribeye steak with truffle sauce, seafood pasta, beef carpaccio, fresh oysters (seasonal), and their signature tiramisu.",
            howToReach: "Located in the golden square area. Most taxi drivers know it. Valet parking available.",
            thingsToBeAwareOf: "Dinner reservations recommended. Smart casual dress code. Some premium wines need advance order. Terrace seating weather dependent."
        }
    },
    {
        id: 'r5',
        name: "Kaganat",
        notes: "Local food court",
        lat: 43.2558,
        lng: 76.9283,
        color: categories.food_court.color,
        type: restaurantTypes.FOOD_COURT,
        details: {
            description: "Popular local food court offering a wide variety of cuisines including Kazakh, Russian, Korean, and European options at reasonable prices.",
            whatToEat: "Various local and international dishes available from different stalls. Good place to try multiple cuisines in one visit.",
            whyGoThere: "Excellent for trying different local dishes without spending much. Quick service and casual atmosphere. Good for groups with different preferences.",
            expenses: "Budget-friendly. Meals 1,000-3,000 KZT. Good portion sizes and combo options available.",
            bestDishes: "Korean salads, plov variations, grilled meats, traditional soups, fresh baked goods, and local desserts.",
            howToReach: "Located near Abai avenue. Easy access by public transport. Multiple bus routes stop nearby.",
            thingsToBeAwareOf: "Very busy during lunch hours. Self-service style. Some stalls may close early. Seating can be limited during peak times."
        }
    },
    {
        id: 'r6',
        name: "Sky Garden",
        notes: "Rooftop dining near Kok-Tobe",
        lat: 43.2215,
        lng: 76.9520,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "Panoramic rooftop restaurant offering spectacular city views, international cuisine, and a romantic atmosphere.",
            whatToEat: "Mix of European and Asian fusion dishes. Known for grilled meats, fresh salads, and creative cocktails.",
            whyGoThere: "Stunning views of the city and mountains, especially at sunset. Romantic atmosphere with both indoor and outdoor seating.",
            expenses: "High-end. Main courses 4,000-9,000 KZT. Signature cocktails 2,000-3,500 KZT.",
            bestDishes: "Grilled sea bass, lamb rack, truffle risotto, signature sushi rolls, and their special dessert platter.",
            howToReach: "Located near Kok-Tobe lower station. Taxi recommended in evening. Shuttle service available from major hotels.",
            thingsToBeAwareOf: "Weather affects outdoor seating. Advance booking essential for sunset hours. Smart casual dress code enforced. Higher prices reflect the view."
        }
    },
    {
        id: 'r7',
        name: "Lake View Cafe",
        notes: "Cafe near Big Almaty Lake",
        lat: 43.0559,
        lng: 76.9830,
        color: categories.cafe.color,
        type: restaurantTypes.CAFE,
        details: {
            description: "Cozy mountain cafe offering hot drinks and simple meals with stunning views of Big Almaty Lake.",
            whatToEat: "Hot soups, sandwiches, traditional tea, and basic local snacks. Good option for hikers and visitors to the lake.",
            whyGoThere: "Convenient stop for lake visitors. Warm refuge in cold weather. Amazing views of the lake and surrounding mountains.",
            expenses: "Moderate. Hot meals 2,000-4,000 KZT. Hot drinks 500-1,500 KZT.",
            bestDishes: "Traditional shurpa soup, grilled sandwiches, local tea with herbs, homemade pies.",
            howToReach: "Located near the main viewing area of Big Almaty Lake. Walking distance from the parking area.",
            thingsToBeAwareOf: "Simple menu and facilities. Weather affects accessibility. Cash only. Hours vary by season. Limited seating during peak times."
        }
    },
    {
        id: 'r8',
        name: "Medeu Restaurant",
        notes: "Traditional restaurant at Medeu",
        lat: 43.1618,
        lng: 76.9482,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "Traditional restaurant at Medeu skating rink, offering warming meals and drinks with mountain views.",
            whatToEat: "Hearty soups, grilled meats, traditional Kazakh dishes, and hot beverages perfect after skating.",
            whyGoThere: "Convenient location for Medeu visitors. Cozy atmosphere with mountain views. Good for warming up after skating.",
            expenses: "Mid-range. Main dishes 2,500-5,000 KZT. Hot drinks and snacks available separately.",
            bestDishes: "Beef soup, grilled kebabs, traditional plov, hot mulled wine, and local tea varieties.",
            howToReach: "Located inside Medeu complex. Easy access for skating rink visitors.",
            thingsToBeAwareOf: "Can be very busy during skating season. Simple but comfortable setting. May close with skating rink. Reservations recommended for groups."
        }
    },
    {
        id: 'r9',
        name: "Green Bazaar Cafe",
        notes: "Local cafe at Green Bazaar",
        lat: 43.2610,
        lng: 76.9455,
        color: categories.cafe.color,
        type: restaurantTypes.CAFE,
        details: {
            description: "Authentic local cafe inside Green Bazaar, perfect for trying fresh market food and local specialties.",
            whatToEat: "Fresh salads, grilled meats, traditional soups, and various local dishes made with market ingredients.",
            whyGoThere: "Experience local food culture. Fresh ingredients from the market. Authentic atmosphere and reasonable prices.",
            expenses: "Budget to mid-range. Meals 1,000-3,000 KZT. Fresh juices and drinks available.",
            bestDishes: "Market fresh salads, shashlik, lagman soup, fresh bread, and seasonal specials.",
            howToReach: "Located on the upper floor of Green Bazaar. Easy access while visiting the market.",
            thingsToBeAwareOf: "Basic setting but clean. Busy during market hours. Menu varies with market availability. Local style service."
        }
    },
    {
        id: 'r10',
        name: "Shymbulak Resort Restaurant",
        notes: "Mountain resort dining",
        lat: 43.1288,
        lng: 77.0820,
        color: categories.restaurant.color,
        type: restaurantTypes.RESTAURANT,
        details: {
            description: "High-altitude restaurant at Shymbulak ski resort offering panoramic mountain views and international cuisine.",
            whatToEat: "International menu with focus on Alpine cuisine. Good selection of warming drinks and après-ski options.",
            whyGoThere: "Spectacular mountain views. Perfect for lunch while skiing or hiking. Cozy atmosphere with outdoor terrace.",
            expenses: "High-end. Main dishes 3,500-8,000 KZT. Special mountain menu available during ski season.",
            bestDishes: "Cheese fondue, alpine-style raclette, grilled meats, homemade soups, and hot chocolate.",
            howToReach: "Located at Shymbulak resort base. Accessible via gondola from Medeu or resort shuttle.",
            thingsToBeAwareOf: "Prices reflect the location. Can be very busy during ski season. Weather affects terrace availability. Reservation recommended for groups."
        }
    }
]; 