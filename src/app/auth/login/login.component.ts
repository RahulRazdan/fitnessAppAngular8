import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import {State} from '../../app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$:Observable<boolean>;

  constructor(private store: Store<{ui: State}>,private authService:AuthService,private uiService:UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select('ui').pipe(map(state => state.isLoading));
    
    this.loginForm = new FormGroup({
      email: new FormControl('',{validators: [Validators.required,Validators.email]}),
      password: new FormControl('',{validators:[Validators.required]})
    });
  }

  login(){
    console.log(this.loginForm);
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    });
  }
}
