import { StateCreator } from 'zustand';

export interface IUIStoreProps {
  isLoading: boolean;
}

export interface IUIStoreActions {
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type TUISlice = IUIStoreProps & IUIStoreActions;

const initialData: IUIStoreProps = {
  isLoading: true,
};

const createUiSlice: StateCreator<TUISlice> = (set) => ({
  ...initialData,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
});

export default createUiSlice;
