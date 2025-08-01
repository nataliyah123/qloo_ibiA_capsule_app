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
        // Simulate API call to Qloo Taste API
        const mockTasteVector = Array.from({ length: 128 }, () => Math.random() * 2 - 1)
        
        set({
          tasteVector: mockTasteVector,
          isComplete: true
        })
      },
      
      reset: () => {
        set({
          ratings: {},
          tasteVector: null,
          isComplete: false
        })
      }
    }),
    {
      name: 'onboarding-storage',
    }
  )
)