import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),

  logout: () => set({ user: null, session: null }),
}))

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  setOrders: (orders) => set({ orders }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  setLoading: (loading) => set({ loading }),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),

  updateOrder: (orderId, updates) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, ...updates } : o
      ),
    })),
}))

export const usePaymentStore = create((set) => ({
  paymentStatus: null,
  mpesaRequestId: null,

  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setMpesaRequestId: (id) => set({ mpesaRequestId: id }),
  reset: () => set({ paymentStatus: null, mpesaRequestId: null }),
}))
