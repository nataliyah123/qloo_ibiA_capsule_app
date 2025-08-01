import { Capsule, Artifact } from '@/lib/types'

export function generateMockCapsule(id: string): Capsule {
  const themes = [
    'Mindful Living & Conscious Growth',
    'Creative Expression & Artistic Discovery', 
    'Physical Wellness & Mental Clarity',
    'Cultural Exploration & Global Perspective',
    'Sustainable Living & Environmental Awareness'
  ]
  
  const titles = [
    'The Balanced Self',
    'Creative Awakening',
    'Strength & Serenity', 
    'Global Citizen',
    'Conscious Living'
  ]
  
  const mockArtifacts: Artifact[] = [
    {
      id: 'artifact1',
      capsuleId: id,
      type: 'BOOK',
      entityId: 'book1',
      metadata: {
        title: 'The Mindful Way Through Depression',
        author: 'Mark Williams',
        description: 'A revolutionary approach to changing your relationship with your thoughts and feelings.',
        url: 'https://bookshop.org/books/the-mindful-way-through-depression-freeing-yourself-from-chronic-unhappiness/9781593851286',
        rating: 4.6,
        category: 'Psychology'
      },
      orderIndex: 0
    },
    {
      id: 'artifact2', 
      capsuleId: id,
      type: 'PODCAST',
      entityId: 'podcast1',
      metadata: {
        title: 'The Science of Well-Being',
        author: 'Dr. Laurie Santos',
        description: 'Research-backed strategies for improving happiness and life satisfaction.',
        url: 'https://podcasts.apple.com/podcast/the-happiness-lab-with-dr-laurie-santos/id1474245040',
        rating: 4.8,
        category: 'Health & Wellness'
      },
      orderIndex: 1
    },
    {
      id: 'artifact3',
      capsuleId: id,
      type: 'DINING', 
      entityId: 'dining1',
      metadata: {
        title: 'Candle Cafe',
        description: 'Plant-based dining that nourishes both body and soul in a peaceful atmosphere.',
        url: 'https://www.opentable.com/candle-cafe-reservations-new-york?ref=1068',
        rating: 4.4,
        category: 'Vegetarian'
      },
      orderIndex: 2
    },
    {
      id: 'artifact4',
      capsuleId: id,
      type: 'TRAVEL',
      entityId: 'travel1', 
      metadata: {
        title: 'Brooklyn Botanic Garden',
        description: 'Find tranquility among diverse plant collections and peaceful garden spaces.',
        url: 'https://www.getyourguide.com/new-york-l59/brooklyn-botanic-garden-admission-ticket-t123456/',
        rating: 4.7,
        category: 'Nature & Gardens'
      },
      orderIndex: 3
    },
    {
      id: 'artifact5',
      capsuleId: id,
      type: 'SPORT',
      entityId: 'sport1',
      metadata: {
        title: 'Mindful Movement Class',
        description: 'Gentle exercises combining breathwork, stretching, and meditation.',
        url: 'https://classpass.com/classes/mindful-movement-meditation',
        rating: 4.5,
        category: 'Mind-Body'
      },
      orderIndex: 4
    }
  ]

  const dailyQuests = [
    'Start your day with 10 minutes of mindful reading. Notice how the words affect your thoughts.',
    'Listen to today\'s podcast during a walk. Pay attention to how movement enhances your focus.',
    'Visit the recommended restaurant and practice mindful eating. Savor each bite without distractions.',
    'Spend time in nature at your chosen location. Observe how being outdoors shifts your perspective.',
    'Try the suggested physical activity. Notice the connection between movement and mental clarity.',
    'Reflect on the week\'s experiences. What patterns do you notice in your responses?',
    'Integrate your favorite discovery from this week into your daily routine. How will you sustain this growth?'
  ]

  return {
    id,
    title: titles[Math.floor(Math.random() * titles.length)],
    theme: themes[Math.floor(Math.random() * themes.length)],
    userId: 'user1',
    status: 'ACTIVE',
    artifacts: mockArtifacts,
    dailyQuests,
    completedDays: [],
    createdAt: new Date()
  }
}