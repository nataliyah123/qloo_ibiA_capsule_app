import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  ratings: Record<string, number>
  tasteVector: number[] | null
  isComplete: boolean
  setRating: (entityId: string, rating: number) => void
  generateTasteVector: (ratings: Record<string, number>) => Promise<void>
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ratings: {},
      tasteVector: null,
      isComplete: false,
      
      setRating: (entityId: string, rating: number) => {
        set((state) => ({
          ratings: { ...state.ratings, [entityId]: rating }
        }))
      },
      
      generateTasteVector: async (ratings: Record<string, number>) => {
        // Call real Qloo Taste API
        try {
          const { generateTasteProfile } = await import('@/lib/api/qloo')
          const response = await generateTasteProfile({ ratings })
          
          set({
            tasteVector: response.taste_vector,
            isComplete: true
          })
        } catch (error) {
          console.error('Failed to generate taste profile:', error)
          
          // Fallback to mock data if API fails
          const mockTasteVector = Array.from({ length: 128 }, () => Math.random() * 2 - 1)
          
          set({
            tasteVector: mockTasteVector,
            isComplete: true
          })
        }
      },
      
      reset: () => {
        set({
          ratings: {},
          tasteVector: null,
          isComplete: false
        });
      }
    }),
    {
      name: 'onboarding-storage',
    }
  )
)