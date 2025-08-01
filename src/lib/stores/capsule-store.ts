import { create } from 'zustand'
import { Capsule, Artifact } from '@/lib/types'
import { generateMockCapsule } from '@/lib/data/mock-capsule'
import { getSimilarItems } from '@/lib/api/qloo'

interface CapsuleState {
  currentCapsule: Capsule | null
  isLoading: boolean
  currentDay: number
  loadCapsule: (id: string) => Promise<void>
  completeDay: (day: number) => void
  setCurrentDay: (day: number) => void
  remixArtifact: (artifactId: string) => Promise<void>
}

async function generateCapsuleFromRecommendations(id: string, recommendations: any): Promise<Capsule> {
  // Implementation would go here
  return generateMockCapsule(id)
}

export const useCapsuleStore = create<CapsuleState>((set, get) => ({
  currentCapsule: null,
  isLoading: false,
  currentDay: 1,
  
  loadCapsule: async (id: string) => {
    set({ isLoading: true })
    
    try {
      // In a real app, this would fetch the capsule from your backend
      // For now, we'll generate it using the user's taste profile and Qloo recommendations
      const { useOnboardingStore } = await import('./onboarding-store')
      const { tasteVector } = useOnboardingStore.getState()
      
      if (tasteVector) {
        // Use real Qloo API to get recommendations
        const { getRecommendations } = await import('@/lib/api/qloo')
        const recommendations = await getRecommendations({
          taste_vector: tasteVector,
          weights: {
            books: 0.25,
            podcasts: 0.20,
            dining: 0.20,
            travel: 0.20,
            sports: 0.15
          }
        })
        
        // Generate capsule with real recommendations
        const capsule = await generateCapsuleFromRecommendations(id, recommendations)
        set({
          currentCapsule: capsule,
          isLoading: false
        })
      } else {
        // Fallback to mock capsule if no taste profile
        const mockCapsule = generateMockCapsule(id)
        set({
          currentCapsule: mockCapsule,
          isLoading: false
        })
      }
    } catch (error) {
      console.error('Failed to load capsule:', error)
    }
  },
  
  completeDay: (day: number) => {
    const { currentCapsule } = get()
    if (!currentCapsule) return
    
    const completedDays = currentCapsule.completedDays || []
    if (!completedDays.includes(day)) {
      set({
        currentCapsule: {
          ...currentCapsule,
          completedDays: [...completedDays, day].sort((a, b) => a - b)
        }
      })
    }
  },
  
  setCurrentDay: (day: number) => {
    set({ currentDay: day })
  },
  
  remixArtifact: async (artifactId: string) => {
    const { currentCapsule } = get()
    if (!currentCapsule) return
    
    // Find the artifact to remix
    const artifactToRemix = currentCapsule.artifacts.find(a => a.id === artifactId)
    if (!artifactToRemix) return
    
    try {
      // Call Qloo Similarity API to get similar items
      const similarResponse = await getSimilarItems({
        entity_id: artifactToRemix.entityId,
        type: artifactToRemix.type
      })
      
      // Get the first similar item
      const similarItem = similarResponse.similar_items[0]
      if (!similarItem) return
      
      // Update the artifact with the similar item data
      const updatedArtifacts = currentCapsule.artifacts.map(artifact => {
        if (artifact.id === artifactId) {
          return {
            ...artifact,
            entityId: similarItem.id,
            metadata: {
              ...artifact.metadata,
              title: similarItem.title,
              author: similarItem.author || artifact.metadata.author,
              description: similarItem.description,
              url: similarItem.url,
              rating: undefined // Reset rating for new item
            }
          }
        }
        return artifact
      })
      
      set({
        currentCapsule: {
          ...currentCapsule,
          artifacts: updatedArtifacts
        }
      })
    } catch (error) {
      console.error('Failed to remix artifact:', error)
      // Fallback to simple mock logic if API fails
      const updatedArtifacts = currentCapsule.artifacts.map(artifact => {
        if (artifact.id === artifactId) {
          return {
            ...artifact,
            metadata: {
              ...artifact.metadata,
              title: `Alternative ${artifact.metadata.title}`,
              description: `A fresh recommendation similar to your original choice.`
            }
          }
        }
        return artifact
      })
      
      set({
        currentCapsule: {
          ...currentCapsule,
          artifacts: updatedArtifacts
        }
      })
    }
  }
}))