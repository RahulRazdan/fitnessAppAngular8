import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  isLoading$:Observable<boolean>;
  
  constructor(private store: Store<{ui: State}>,private authService:AuthService,private uiService:UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select('ui').pipe(map(state => state.isLoading));
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  signUp(form:NgForm){
    if(form.valid){
      this.authService.registerUser({
        email:form.value.email,
        password: form.value.password
      });
    }
  }
}
