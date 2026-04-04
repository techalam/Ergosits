import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      // ADD ITEM
      addItem: (product) => {
        const items = get().items;

        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? { ...i, qty: i.qty + product.qty }
                : i
            ),
          });
        } else {
          set({
            items: [...items, product],
          });
        }
      },

      // REMOVE
      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      // INCREASE
      increase: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        }),

      // DECREASE
      decrease: (id) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        }),

      // CLEAR CART (future use)
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

export default useCart;