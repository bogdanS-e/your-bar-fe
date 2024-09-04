import { create } from 'zustand'
import { IGlobalStore, IGlobalStoreProps } from './types'

const initialData: IGlobalStoreProps = {
  isLoading: true,
}

const useGlobalStore = create<IGlobalStore>()((set) => ({
  ...initialData,
  startLoadind: () => set({ isLoading: true }),
  stopLoadind: () => set({ isLoading: false }),
  setLoadind: (isLoading) => set({ isLoading }),
}));

export default useGlobalStore;