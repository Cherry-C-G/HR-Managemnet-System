import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string>('');

  constructor(private router:Router) {
    // const storedValue = localStorage.getItem('isLoggedIn');
    // this.isAuthenticatedSubject.next(storedValue === 'true');
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    // console.log('logout');
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('token')
    localStorage.clear();
    this.setRole('');
    this.router.navigate(['/login']);
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setRole(role: string) {
    this.roleSubject.next(role);
  }

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }
}
