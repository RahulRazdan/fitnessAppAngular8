import { createAction, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const trainingFeatureKey = 'training';

export interface State {
    availableExercises:Exercise[],
    finishedExercises:Exercise[],
    activeExercise:Exercise
}

const initialState = {
    availableExercises:[],
    finishedExercises:[],
    activeExercise:null
};

export const availableExercise = createAction('[Training Component] AVAILABLE_EXERCISES',props<{exercises:Exercise[]}>());
export const finishedExercise = createAction('[Training Component] FINISHED_EXERCISES',props<{exercises:Exercise[]}>());
export const startExercise = createAction('[Training Component] START_EXERCISE',props<{exercise:Exercise}>());
export const stopExercise = createAction('[Training Component] STOP_EXERCISE');

const _counterReducer = createReducer(initialState,
    on(availableExercise, (state,{exercises}) => ({...state,availableExercises:exercises})),
    on(finishedExercise, (state,{exercises}) =>  ({...state,finishedExercises:exercises})),
    on(startExercise, (state,{exercise}) =>  ({...state,activeExercise:exercise})),
    on(stopExercise, state =>  ({...state,activeExercise:null}))
  );

export function trainingReducer(state = initialState,action){
    return _counterReducer(state, action);
}