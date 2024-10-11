import { create } from 'zustand';
import createObjectsSlice, { TObjectsSlice } from './objectsSlice';
import createUiSlice, { TUISlice } from './uiSlice';

const useStore = create<TObjectsSlice & TUISlice>()((...a) => ({
  ...createUiSlice(...a),
  ...createObjectsSlice(...a),
}));

export default useStore;
