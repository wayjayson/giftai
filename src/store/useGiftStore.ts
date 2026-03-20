import { create } from 'zustand'

export interface UserInput {
  gender: string
  age: number
  hobbies: string[]
  occasion: string
  additionalInfo: string
  budgetMin: number
  budgetMax: number
}

export interface GiftItem {
  name: string
  reason: string
  priceRange: string
  highlight: string
  platforms: {
    taobao: string
    jd: string
    pdd: string
  }
}

interface GiftStore {
  step: number
  userInput: UserInput
  recommendations: GiftItem[]
  isLoading: boolean
  error: string | null
  
  setStep: (step: number) => void
  setUserInput: (input: Partial<UserInput>) => void
  setRecommendations: (recommendations: GiftItem[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialUserInput: UserInput = {
  gender: '',
  age: 25,
  hobbies: [],
  occasion: '',
  additionalInfo: '',
  budgetMin: 100,
  budgetMax: 500,
}

export const useGiftStore = create<GiftStore>((set) => ({
  step: 1,
  userInput: initialUserInput,
  recommendations: [],
  isLoading: false,
  error: null,

  setStep: (step) => set({ step }),
  setUserInput: (input) => set((state) => ({ userInput: { ...state.userInput, ...input } })),
  setRecommendations: (recommendations) => set({ recommendations }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    step: 1, 
    userInput: initialUserInput, 
    recommendations: [], 
    isLoading: false, 
    error: null 
  }),
}))
