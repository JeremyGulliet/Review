import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Card {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
}

interface CardStore {
  cards: Card[];
  mainRating: number;
  isFormOpen: boolean;
  setFormOpen: (open: boolean) => void;
  addCard: (title: string, comment: string) => void;
  updateCardRating: (id: number, rating: number) => void;
  setMainRating: (rating: number) => void;
  clearAllCards: () => void;
  deleteCard: (id: number) => void;
}

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      cards: [],
      mainRating: 0,
      isFormOpen: false,
      setFormOpen: (open) => set({ isFormOpen: open }),
      addCard: (title, comment) =>
        set((state) => ({
          cards: [...state.cards, {
            id: Date.now(),
            rating: state.mainRating,
            title,
            comment
          }],
          mainRating: 0
        })),
      updateCardRating: (id, rating) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, rating } : card
          )
        })),
      setMainRating: (rating) => set({ mainRating: rating }),
          clearAllCards: () => set({ cards: [] }),
      deleteCard: (id) => set((state) => ({
        cards: state.cards.filter(card => card.id !== id)
      })),
      
    }),
    {
      name: 'card-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: CardStore) => ({ 
        cards: state.cards,
        mainRating: state.mainRating 
      })
    }
  )
);
