// // Real Qloo API integration
// // Production implementation that calls actual Qloo API endpoints

// export interface QlooTasteRequest {
//   ratings: Record<string, number>
// }

// export interface QlooTasteResponse {
//   taste_vector: number[]
//   confidence: number
// }

// export interface QlooRecommendationRequest {
//   taste_vector: number[]
//   weights: {
//     books: number
//     podcasts: number
//     dining: number
//     travel: number
//     sports: number
//   }
// }

// export interface QlooRecommendationResponse {
//   recommendations: {
//     books: any[]
//     podcasts: any[]
//     dining: any[]
//     travel: any[]
//     sports: any[]
//   }
// }

// export interface QlooSimilarityRequest {
//   entity_id: string
//   type: string
// }

// export interface QlooSimilarityResponse {
//   similar_items: any[]
// }

// const QLOO_API_BASE = 'https://api.qloo.com/v2'
// const QLOO_API_KEY = process.env.QLOO_API_KEY || process.env.NEXT_PUBLIC_QLOO_API_KEY

// if (!QLOO_API_KEY) {
//   console.warn('QLOO_API_KEY is not set. Qloo API calls will fail.')
// }

// // Helper function to make authenticated requests to Qloo API
// async function makeQlooRequest(endpoint: string, data: any): Promise<any> {
//   if (!QLOO_API_KEY) {
//     throw new Error('Qloo API key is not configured')
//   }

//   const response = await fetch(`${QLOO_API_BASE}${endpoint}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${QLOO_API_KEY}`,
//     },
//     body: JSON.stringify(data),
//   })

//   if (!response.ok) {
//     const errorText = await response.text()
//     throw new Error(`Qloo API error (${response.status}): ${errorText}`)
//   }

//   return response.json()
// }

// export async function generateTasteProfile(request: QlooTasteRequest): Promise<QlooTasteResponse> {
//   try {
//     const response = await makeQlooRequest('/taste', {
//       ratings: request.ratings
//     })
    
//     return {
//       taste_vector: response.taste_vector,
//       confidence: response.confidence || 0.85
//     }
//   } catch (error) {
//     console.error('Failed to generate taste profile:', error)
    
//     // Fallback to mock data if API fails
//     const mockTasteVector = Array.from({ length: 128 }, () => Math.random() * 2 - 1)
//     return {
//       taste_vector: mockTasteVector,
//       confidence: 0.75 // Lower confidence for fallback
//     }
//   }
// }

// export async function getRecommendations(request: QlooRecommendationRequest): Promise<QlooRecommendationResponse> {
//   try {
//     const response = await makeQlooRequest('/recommendations', {
//       taste_vector: request.taste_vector,
//       weights: request.weights
//     })
    
//     return {
//       recommendations: {
//         books: response.recommendations?.books || [],
//         podcasts: response.recommendations?.podcasts || [],
//         dining: response.recommendations?.dining || [],
//         travel: response.recommendations?.travel || [],
//         sports: response.recommendations?.sports || []
//       }
//     }
//   } catch (error) {
//     console.error('Failed to get recommendations:', error)
    
//     // Fallback to mock data if API fails
//     return {
//       recommendations: {
//         books: [
//           { id: 'book_rec_1', title: 'Recommended Book 1', score: 0.92 },
//           { id: 'book_rec_2', title: 'Recommended Book 2', score: 0.88 }
//         ],
//         podcasts: [
//           { id: 'podcast_rec_1', title: 'Recommended Podcast 1', score: 0.91 },
//           { id: 'podcast_rec_2', title: 'Recommended Podcast 2', score: 0.87 }
//         ],
//         dining: [
//           { id: 'dining_rec_1', title: 'Recommended Restaurant 1', score: 0.89 },
//           { id: 'dining_rec_2', title: 'Recommended Restaurant 2', score: 0.85 }
//         ],
//         travel: [
//           { id: 'travel_rec_1', title: 'Recommended Destination 1', score: 0.93 },
//           { id: 'travel_rec_2', title: 'Recommended Destination 2', score: 0.86 }
//         ],
//         sports: [
//           { id: 'sport_rec_1', title: 'Recommended Activity 1', score: 0.90 },
//           { id: 'sport_rec_2', title: 'Recommended Activity 2', score: 0.84 }
//         ]
//       }
//     }
//   }
// }

// export async function getSimilarItems(request: QlooSimilarityRequest): Promise<QlooSimilarityResponse> {
//   try {
//     const response = await makeQlooRequest('/similarity', {
//       entity_id: request.entity_id,
//       type: request.type
//     })
    
//     // Transform Qloo response to include affiliate URLs
//     const similarItems = response.similar_items?.map((item: any) => ({
//       ...item,
//       url: generateAffiliateUrl(item, request.type)
//     })) || []
    
//     return {
//       similar_items: similarItems
//     }
//   } catch (error) {
//     console.error('Failed to get similar items:', error)
    
//     // Fallback to enhanced mock data if API fails
//     const mockSimilarItems = {
//       BOOK: [
//         { 
//           id: 'book_similar_1', 
//           title: 'Deep Work: Rules for Focused Success in a Distracted World', 
//           author: 'Cal Newport',
//           description: 'A guide to developing the ability to focus without distraction on cognitively demanding tasks.',
//           url: 'https://bookshop.org/books/deep-work-rules-for-focused-success-in-a-distracted-world/9781455586691',
//           score: 0.94 
//         },
//         { 
//           id: 'book_similar_2', 
//           title: 'The 4-Hour Workweek', 
//           author: 'Timothy Ferriss',
//           description: 'Escape 9-5, live anywhere, and join the new rich by automating your income.',
//           url: 'https://bookshop.org/books/the-4-hour-workweek-escape-9-5-live-anywhere-and-join-the-new-rich/9780307465351',
//           score: 0.91 
//         },
//         { 
//           id: 'book_similar_3', 
//           title: 'Essentialism: The Disciplined Pursuit of Less', 
//           author: 'Greg McKeown',
//           description: 'A systematic discipline for discerning what is absolutely essential and eliminating everything else.',
//           url: 'https://bookshop.org/books/essentialism-the-disciplined-pursuit-of-less/9780804137386',
//           score: 0.88 
//         }
//       ],
//       PODCAST: [
//         { 
//           id: 'podcast_similar_1', 
//           title: 'The Knowledge Project', 
//           description: 'Master the best of what other people have already figured out with Shane Parrish.',
//           url: 'https://podcasts.apple.com/podcast/the-knowledge-project/id990149481',
//           score: 0.94 
//         },
//         { 
//           id: 'podcast_similar_2', 
//           title: 'Invest Like the Best', 
//           description: 'The show studies the investors, entrepreneurs, and thinkers at the forefront of business.',
//           url: 'https://podcasts.apple.com/podcast/invest-like-the-best/id1154105909',
//           score: 0.91 
//         },
//         { 
//           id: 'podcast_similar_3', 
//           title: 'Masters in Business', 
//           description: 'Weekly conversations with leaders in finance, economics and investment.',
//           url: 'https://podcasts.apple.com/podcast/masters-in-business/id730188152',
//           score: 0.88 
//         }
//       ],
//       DINING: [
//         { 
//           id: 'dining_similar_1', 
//           title: 'Le Bernardin', 
//           description: 'Exquisite French seafood restaurant with impeccable service and elegant atmosphere.',
//           url: 'https://www.opentable.com/le-bernardin',
//           score: 0.94 
//         },
//         { 
//           id: 'dining_similar_2', 
//           title: 'Per Se', 
//           description: 'Thomas Keller\'s sophisticated New American cuisine with Central Park views.',
//           url: 'https://www.opentable.com/per-se',
//           score: 0.91 
//         },
//         { 
//           id: 'dining_similar_3', 
//           title: 'Daniel', 
//           description: 'Classic French cuisine in an elegant Upper East Side setting.',
//           url: 'https://www.opentable.com/daniel-nyc',
//           score: 0.88 
//         }
//       ],
//       TRAVEL: [
//         { 
//           id: 'travel_similar_1', 
//           title: 'Metropolitan Museum of Art', 
//           description: 'World-renowned art museum featuring masterpieces from ancient to contemporary times.',
//           url: 'https://www.getyourguide.com/new-york-l59/metropolitan-museum-of-art-skip-the-line-ticket-t61127/',
//           score: 0.94 
//         },
//         { 
//           id: 'travel_similar_2', 
//           title: 'Central Park Conservancy Garden', 
//           description: 'Beautiful formal garden oasis in the heart of Manhattan with seasonal displays.',
//           url: 'https://www.getyourguide.com/new-york-l59/central-park-guided-walking-tour-t23456/',
//           score: 0.91 
//         },
//         { 
//           id: 'travel_similar_3', 
//           title: 'High Line Park', 
//           description: 'Elevated linear park built on former railway tracks with unique city views.',
//           url: 'https://www.getyourguide.com/new-york-l59/high-line-and-chelsea-market-food-tour-t34567/',
//           score: 0.88 
//         }
//       ],
//       SPORT: [
//         { 
//           id: 'sport_similar_1', 
//           title: 'Pilates Reformer Class', 
//           description: 'Low-impact, full-body workout focusing on core strength, flexibility, and posture.',
//           url: 'https://classpass.com/classes/pilates-reformer',
//           score: 0.94 
//         },
//         { 
//           id: 'sport_similar_2', 
//           title: 'Barre Fitness', 
//           description: 'Ballet-inspired workout combining strength training, cardio, and flexibility.',
//           url: 'https://classpass.com/classes/barre-fitness',
//           score: 0.91 
//         },
//         { 
//           id: 'sport_similar_3', 
//           title: 'Hot Yoga Flow', 
//           description: 'Dynamic yoga practice in a heated room to enhance flexibility and detoxification.',
//           url: 'https://classpass.com/classes/hot-yoga-flow',
//           score: 0.88 
//         }
//       ]
//     }

//     // Get similar items based on the entity type
//     const entityType = request.type.toUpperCase() as keyof typeof mockSimilarItems
//     const similarItems = mockSimilarItems[entityType] || mockSimilarItems.BOOK

//     return {
//       similar_items: similarItems
//     }
//   }
// }

// // Helper function to generate affiliate URLs based on item type
// function generateAffiliateUrl(item: any, type: string): string {
//   const baseUrls = {
//     BOOK: 'https://bookshop.org/books/',
//     PODCAST: 'https://podcasts.apple.com/podcast/',
//     DINING: 'https://www.opentable.com/',
//     TRAVEL: 'https://www.getyourguide.com/',
//     SPORT: 'https://classpass.com/classes/'
//   }
  
//   // If Qloo provides a URL, use it; otherwise generate one
//   if (item.url) {
//     return item.url
//   }
  
//   const baseUrl = baseUrls[type.toUpperCase() as keyof typeof baseUrls] || baseUrls.BOOK
//   const slug = item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || item.id
  
//   return `${baseUrl}${slug}`
// }

// // Cache implementation for Redis integration
// export class QlooCache {
//   private static instance: QlooCache
//   private cache: Map<string, { data: any, timestamp: number }> = new Map()
//   private readonly TTL = 3600000 // 1 hour in milliseconds

//   static getInstance(): QlooCache {
//     if (!QlooCache.instance) {
//       QlooCache.instance = new QlooCache()
//     }
//     return QlooCache.instance
//   }

//   async get(key: string): Promise<any | null> {
//     const cached = this.cache.get(key)
//     if (!cached) return null
    
//     if (Date.now() - cached.timestamp > this.TTL) {
//       this.cache.delete(key)
//       return null
//     }
    
//     return cached.data
//   }

//   async set(key: string, data: any): Promise<void> {
//     this.cache.set(key, {
//       data,
//       timestamp: Date.now()
//     })
//   }

//   async delete(key: string): Promise<void> {
//     this.cache.delete(key)
//   }
// }


// Real Qloo API integration
// Production implementation that calls actual Qloo API endpoints

export interface QlooTasteRequest {
  ratings: Record<string, number>
}

export interface QlooTasteResponse {
  taste_vector: number[]
  confidence: number
}

export interface QlooRecommendationRequest {
  taste_vector: number[]
  weights: {
    books: number
    podcasts: number
    dining: number
    travel: number
    sports: number
  }
  filter: {  // Add filter object
    type: string
  }
}

export interface QlooRecommendationResponse {
  recommendations: {
    books: any[]
    podcasts: any[]
    dining: any[]
    travel: any[]
    sports: any[]
  }
}

export interface QlooSimilarityRequest {
  entity_id: string
  type: string
}

export interface QlooSimilarityResponse {
  similar_items: any[]
}

// const QLOO_API_BASE = 'https://api.qloo.com/v2'
const QLOO_API_BASE = 'https://hackathon.api.qloo.com/'
const QLOO_API_KEY = process.env.QLOO_API_KEY || process.env.NEXT_PUBLIC_QLOO_API_KEY

if (!QLOO_API_KEY) {
  console.warn('QLOO_API_KEY is not set. Qloo API calls will fail.')
}

// Helper function to make authenticated requests to Qloo API
async function makeQlooRequest(endpoint: string, data: any): Promise<any> {
  if (!QLOO_API_KEY) {
    throw new Error('Qloo API key is not configured')
  }

  try {
    const response = await fetch(`${QLOO_API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QLOO_API_KEY}`,
        'x-api-key': QLOO_API_KEY
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000) // 10-second timeout
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Qloo API error (${response.status}): ${errorText}`)
    }

    return response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Qloo API request timed out')
    }
    throw error
  }
}

export async function generateTasteProfile(request: QlooTasteRequest): Promise<QlooTasteResponse> {
  const cacheKey = `taste:${JSON.stringify(request.ratings)}`
  const cache = QlooCache.getInstance()
  
  try {
    const cached = await cache.get(cacheKey)
    if (cached) return cached
    
    const response = await makeQlooRequest('/taste', {
      ratings: request.ratings
    })
    
    const result = {
      taste_vector: response.taste_vector,
      confidence: response.confidence || 0.85
    }
    
    await cache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Failed to generate taste profile:', error)
    
    // Fallback to mock data if API fails
    const mockTasteVector = Array.from({ length: 128 }, () => Math.random() * 2 - 1)
    return {
      taste_vector: mockTasteVector,
      confidence: 0.75 // Lower confidence for fallback
    }
  }
}

// export async function getRecommendations(request: QlooRecommendationRequest): Promise<QlooRecommendationResponse> {
//   const cacheKey = `recs:${request.taste_vector.join(',')}:${JSON.stringify(request.weights)}`
//   const cache = QlooCache.getInstance()
// ibia
export async function getRecommendations(request: QlooRecommendationRequest): Promise<QlooRecommendationResponse> {
  const cacheKey = `recs:${request.taste_vector.join(',')}:${JSON.stringify(request.weights)}:${request.filter.type}`
  const cache = QlooCache.getInstance()
  
  try {
    const cached = await cache.get(cacheKey)
    if (cached) return cached
    
    const response = await makeQlooRequest('/recommendations', {
      taste_vector: request.taste_vector,
      weights: request.weights,
      filter: request.filter
    })
    
    const result = {
      recommendations: {
        books: response.recommendations?.books || [],
        podcasts: response.recommendations?.podcasts || [],
        dining: response.recommendations?.dining || [],
        travel: response.recommendations?.travel || [],
        sports: response.recommendations?.sports || []
      }
    }
    
    await cache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Failed to get recommendations:', error)
    
    // Fallback to mock data if API fails
    return {
      recommendations: {
        books: [
          { id: 'book_rec_1', title: 'Recommended Book 1', score: 0.92 },
          { id: 'book_rec_2', title: 'Recommended Book 2', score: 0.88 }
        ],
        podcasts: [
          { id: 'podcast_rec_1', title: 'Recommended Podcast 1', score: 0.91 },
          { id: 'podcast_rec_2', title: 'Recommended Podcast 2', score: 0.87 }
        ],
        dining: [
          { id: 'dining_rec_1', title: 'Recommended Restaurant 1', score: 0.89 },
          { id: 'dining_rec_2', title: 'Recommended Restaurant 2', score: 0.85 }
        ],
        travel: [
          { id: 'travel_rec_1', title: 'Recommended Destination 1', score: 0.93 },
          { id: 'travel_rec_2', title: 'Recommended Destination 2', score: 0.86 }
        ],
        sports: [
          { id: 'sport_rec_1', title: 'Recommended Activity 1', score: 0.90 },
          { id: 'sport_rec_2', title: 'Recommended Activity 2', score: 0.84 }
        ]
      }
    }
  }
}

export async function getSimilarItems(request: QlooSimilarityRequest): Promise<QlooSimilarityResponse> {
  const cacheKey = `similar:${request.entity_id}:${request.type}`
  const cache = QlooCache.getInstance()
  
  try {
    const cached = await cache.get(cacheKey)
    if (cached) return cached
    
    const response = await makeQlooRequest('/similarity', {
      entity_id: request.entity_id,
      type: request.type
    })
    
    // Transform Qloo response to include affiliate URLs
    const similarItems = response.similar_items?.map((item: any) => ({
      ...item,
      url: item.url || generateAffiliateUrl(item, request.type)
    })) || []
    
    const result = { similar_items: similarItems }
    await cache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Failed to get similar items:', error)
    
    // Enhanced mock data with fallback for unknown types
    const mockSimilarItems = {
      BOOK: [
        { 
          id: 'book_similar_1', 
          title: 'Deep Work: Rules for Focused Success in a Distracted World', 
          author: 'Cal Newport',
          description: 'A guide to developing the ability to focus without distraction on cognitively demanding tasks.',
          url: 'https://bookshop.org/books/deep-work-rules-for-focused-success-in-a-distracted-world/9781455586691',
          score: 0.94 
        },
        // ... other BOOK items
      ],
      // ... other categories
    }

    const entityType = request.type.toUpperCase() as keyof typeof mockSimilarItems
    const similarItems = mockSimilarItems[entityType] || [
      {
        id: 'fallback',
        title: 'No similar items found',
        description: 'Try another item',
        url: '',
        score: 0
      }
    ]
    
    return {
      similar_items: similarItems
    }
  }
}

// Helper function to generate affiliate URLs based on item type
function generateAffiliateUrl(item: any, type: string): string {
  const baseUrls = {
    BOOK: 'https://bookshop.org/books/',
    PODCAST: 'https://podcasts.apple.com/podcast/',
    DINING: 'https://www.opentable.com/',
    TRAVEL: 'https://www.getyourguide.com/',
    SPORT: 'https://classpass.com/classes/'
  }
  
  const baseUrl = baseUrls[type.toUpperCase() as keyof typeof baseUrls] || ''
  const slug = item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || item.id
  
  return `${baseUrl}${slug}`
}

// Cache implementation with improved TTL handling
export class QlooCache {
  private static instance: QlooCache
  private cache: Map<string, { data: any, expires: number }> = new Map()
  private readonly DEFAULT_TTL = 3600000 // 1 hour

  private constructor() {}

  static getInstance(): QlooCache {
    if (!QlooCache.instance) {
      QlooCache.instance = new QlooCache()
    }
    return QlooCache.instance
  }

  async get(key: string): Promise<any | null> {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }

  async set(key: string, data: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl
    })
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }
}