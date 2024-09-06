export interface IGlobalStoreProps {
  isLoading: boolean;
}

export interface IGlobalStoreActions {
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (isLoading: boolean) => void;
}

export type IGlobalStore = IGlobalStoreProps & IGlobalStoreActions;
