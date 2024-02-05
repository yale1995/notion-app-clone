import { create } from 'zustand'

type State = {
  isOpen: boolean
}

type Actions = {
  onOpen: () => void
  onClose: () => void
  toggle: () => void
}

export const useSearch = create<State & Actions>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),

  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}))
