import { createAction } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';

export interface State {
    isLoading:boolean;
}
const initialState = {
    isLoading:false
};

export const startLoading = createAction('[Auth Component] START_LOADING');
export const stopLoading = createAction('[Auth Component] STOP_LOADING');

const _counterReducer = createReducer(initialState,
    on(startLoading, state => state = {isLoading:true}),
    on(stopLoading, state => state = {isLoading:false})
  );

export function appReducer(state = initialState,action){
    return _counterReducer(state, action);
}