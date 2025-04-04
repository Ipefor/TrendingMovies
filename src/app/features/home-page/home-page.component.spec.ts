import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { HomePageComponent } from './home-page.component';

describe('NavbarComponent', () => {
  let component: HomePageComponent;
  let router: Router;
  let fixture: ComponentFixture<HomePageComponent>;

  const mockLocalStorageService = {
    cleanLocalStorage: jest.fn(),
  };

  @Component({
    selector: 'app-movies-mock',
    template: ``,
    standalone: true,
  })
  class MockMoviesComponent {}

  @Component({
    selector: 'app-shows-mock',
    template: ``,
    standalone: true,
  })
  class MockShowsComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([
          { path: 'movies', component: MockMoviesComponent },
          { path: 'shows', component: MockShowsComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the movie list page', () => {
    const link = fixture.debugElement.query(
      By.css('[data-testid="redirectMovies"]')
    );
    link.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/movies');
  });

  it('should redirect to the show list page', () => {
    const link = fixture.debugElement.query(
      By.css('[data-testid="redirectShows"]')
    );
    link.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/shows');
  });
});
