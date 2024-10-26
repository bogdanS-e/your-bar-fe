import { StateCreator } from 'zustand';

export interface IUIStoreProps {
  isLoading: boolean;
  isSidebarOpen: boolean;
}

export interface IUIStoreActions {
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (isLoading: boolean) => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export type TUISlice = IUIStoreProps & IUIStoreActions;

const initialData: IUIStoreProps = {
  isLoading: true,
  isSidebarOpen: true,
};

const createUiSlice: StateCreator<TUISlice> = (set) => ({
  ...initialData,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),
});

export default createUiSlice;
