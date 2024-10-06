import { StateCreator } from 'zustand';

export interface IUIStoreProps {
  isLoading: boolean;
}

export interface IUIStoreActions {
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (isLoading: boolean) => void;
}

const initialData: IUIStoreProps = {
  isLoading: true,
};

const createUiSlice: StateCreator<IUIStoreProps & IUIStoreActions> = (set) => ({
  ...initialData,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
});

export default createUiSlice;
