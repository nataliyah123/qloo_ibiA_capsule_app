import { create } from 'zustand'
import { Capsule, Artifact } from '@/lib/types'
import { generateMockCapsule } from '@/lib/data/mock-capsule'

interface CapsuleState {
  currentCapsule: Capsule | null
  isLoading: boolean
  currentDay: number
  loadCapsule: (id: string) => Promise<void>
  completeDay: (day: number) => void
  setCurrentDay: (day: number) => void
  remixArtifact: (artifactId: string) => Promise<void>
}

export const useCapsuleStore = create<CapsuleState>((set, get) => ({
  currentCapsule: null,
  isLoading: false,
  currentDay: 1,
  
  loadCapsule: async (id: string) => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockCapsule = generateMockCapsule(id)
    
    set({
      currentCapsule: mockCapsule,
      isLoading: false
    })
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
    
    // Simulate API call to Qloo Similarity API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock remix logic - replace the artifact with a similar one
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
}))