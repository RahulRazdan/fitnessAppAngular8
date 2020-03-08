import { createAction } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';

export const authFeatureKey = 'authenticate';

export interface State {
    isAuthenticated:boolean;
}
const initialState = {
    isAuthenticated:false
};

export const isAuthenticated = createAction('[Auth Component] IS_AUTHENTICATED');
export const isUnauthenticated = createAction('[Auth Component] IS_UNAUTHENTICATED');

const _counterReducer = createReducer(initialState,
    on(isAuthenticated, state => ({...state,isAuthenticated:true})),
    on(isUnauthenticated, state =>  ({...state,isAuthenticated:false}))
  );

export function authReducer(state = initialState,action){
    return _counterReducer(state, action);
}