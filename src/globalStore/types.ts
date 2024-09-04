export interface IGlobalStoreProps {
  isLoading: boolean;
}

export interface IGlobalStoreActions {
  startLoadind: () => void;
  stopLoadind: () => void;
  setLoadind: (isLoading: boolean) => void;
}

export type IGlobalStore = IGlobalStoreProps & IGlobalStoreActions;