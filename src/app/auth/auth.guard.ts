import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';
import * as AuthState from './auth.reducer';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate,CanLoad{
    constructor(private store: Store<{
        ui: State,
        authenticate:AuthState.State
    }>,private route:Router){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.store.select('authenticate').pipe(map(state => state.isAuthenticated)).pipe(take(1));
    }
    canLoad(route:Route){
        return this.store.select('authenticate').pipe(map(state => state.isAuthenticated)).pipe(take(1));
    }
}