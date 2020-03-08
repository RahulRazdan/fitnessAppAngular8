import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn : 'root'
})
export class UIService {

    constructor(private _snackbar:MatSnackBar){}
    showSnackBar(message,action,duration){
        this._snackbar.open(message,action,{
            duration:duration
        });
    }
}