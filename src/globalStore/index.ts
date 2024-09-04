import { create } from 'zustand'
import { IGlobalStore, IGlobalStoreProps } from './types'

const initialData: IGlobalStoreProps = {
  isLoading: true,
}

const useGlobalStore = create<IGlobalStore>()((set) => ({
  ...initialData,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useGlobalStore;