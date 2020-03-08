import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import * as AuthState from '../../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output('closeSideNav')
  sideNavEvent = new EventEmitter<void>();

  isAuthenticated$:Observable<boolean>;
  
  constructor(private store: Store<{
    authenticate:AuthState.State
}>,private authService:AuthService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthState.authFeatureKey).pipe(map(state => state.isAuthenticated));
  }

  onLogout(){
    this.closeSideNav();
    this.authService.logout();
  }
  
  closeSideNav() {
    this.sideNavEvent.emit();
  }
}
