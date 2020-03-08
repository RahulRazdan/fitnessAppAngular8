import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import * as AuthState from '../../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('toggleSideNav')
  sideNavEvent = new EventEmitter<void>();

  isAuthenticated$:Observable<boolean>;

  constructor(private store: Store<{authenticate:AuthState.State}>,private authService:AuthService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthState.authFeatureKey).pipe(map(state => state.isAuthenticated));
  }

  toggleSideNav() {
    this.sideNavEvent.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
