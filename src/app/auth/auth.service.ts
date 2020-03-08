import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from '../training/exercise.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import {State, startLoading,stopLoading} from '../app.reducer';
import * as AuthState from './auth.reducer';

@Injectable({
    providedIn :'root'
})
export class AuthService {

    constructor(private store: Store<{
        ui: State,
        authenticate:AuthState.State
    }>,private uiService: UIService,private route:Router,private fireAuthProvide:AngularFireAuth,private exerciseService:ExerciseService){  }

    initAuthListener(){
        this.fireAuthProvide.authState.subscribe(user => {
            if(user){
                this.store.dispatch(AuthState.isAuthenticated());
                this.route.navigate(['/training']);
            }else{
                this.store.dispatch(AuthState.isUnauthenticated());
                this.exerciseService.cancelfirebaseSubscriptions();
                this.route.navigate(['/login']);
            }
        });
    }
    registerUser(authData:AuthData){
        //this.uiService.spinnerService.next(true);
        this.store.dispatch(startLoading());

        this.fireAuthProvide.createUserWithEmailAndPassword(authData.email,authData.password).then(
            success => {
                this.store.dispatch(stopLoading());
                //this.uiService.spinnerService.next(false);
                this.uiService.showSnackBar('Welcome to fitness tracker!', null, 2000);
            }
        ).catch(err => {
            this.store.dispatch(stopLoading());
            //this.uiService.spinnerService.next(false);
            this.uiService.showSnackBar(err.message, null,2000);
        });
    }

    login(authData:AuthData){
        //this.uiService.spinnerService.next(true);
        this.store.dispatch(startLoading());
        this.fireAuthProvide.signInWithEmailAndPassword(authData.email,authData.password).then(
            success => {
                //this.uiService.spinnerService.next(false);
                this.store.dispatch(stopLoading());
                this.uiService.showSnackBar('Welcome to fitness tracker!', null,2000);
                //this.authSuccess();
            }
        ).catch(err => {
            //this.uiService.spinnerService.next(false);
            this.store.dispatch(stopLoading());
            this.uiService.showSnackBar(err.message, null,2000);
        });
    }

    logout(){
        this.fireAuthProvide.signOut();
    }
}