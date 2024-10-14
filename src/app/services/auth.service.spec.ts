import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate the user', () => {
    service.login('admin', 'admin');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should log out the user', () => {
    service.login('admin', 'admin');
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
