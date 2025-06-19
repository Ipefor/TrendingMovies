import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { AuthFacade } from '../../shared/state/auth/auth.facade';
import { CallbackComponent } from './callback.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createMock, createMockWithValues } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';

/* xtest('Callback Component', async () => {
  const user = userEvent.setup();
  await render(CallbackComponent, {
    routes: [
      { path: 'home', component: MockHomePageComponent },
      { path: '', component: MockLoginComponent },
    ],
  });
}); */

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let router: Router;
  let fixture: ComponentFixture<CallbackComponent>;
  let authFacade: AuthFacade;
  let activatedRoute: ActivatedRoute;
  const activatedRouteMock = {
    queryParams: of({ requestToken: 'mock-token', Id: '12345' })  // Mock the queryParams as an observable
  };

  beforeEach(async () => {
    ({fixture} = await render(CallbackComponent, {
      imports: [CallbackComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: createMockWithValues(AuthFacade, {
            createSessionId: jest.fn(),
          }),
        },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    }))
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // private isTokenApproved(): void {
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     const approved = params['approved'];
  //     const requestToken = params['request_token'];

  //     if (approved === 'true') {
  //       this.authFacade.createSessionId(requestToken);
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }

  it('should redirect', () => {
    component.isTokenApproved()
    fixture.detectChanges();

  });

  /* it('should call createSessionId and navigate to /home if approved is true', () => {
    jest.spyOn(router, 'navigate').mockImplementation();

    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //expect(authFacade.createSessionId).toHaveBeenCalledWith('mockRequestToken');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to login if approved is false', () => {
    activatedRoute.snapshot.queryParams = {
      request_token: 'mockRequestToken',
      approved: 'true',
    };
    jest.spyOn(router, 'navigate').mockImplementation();

    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }); */
});
