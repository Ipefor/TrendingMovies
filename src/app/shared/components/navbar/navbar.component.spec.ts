import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { HomePageComponent } from '../../../features/home-page/home-page.component';
import { MoviesComponent } from '../../../features/movies/movies.component';
import { ShowsComponent } from '../../../features/shows/shows.component';

/* @NgModule({
  declarations: [MockHomePageComponent, MockMoviesComponent, MockShowsComponent],
})
export class AppModule {} */

test('it can navigate to routes', async () => {
  const { navigate } = await render(NavbarComponent, {
    providers: [
      provideRouter([
        { path: 'home', component: HomePageComponent },
        { path: 'movies', component: MoviesComponent },
        { path: 'shows', component: ShowsComponent },
      ]),
    ],
  });

  await navigate(screen.getByRole('link', { name: /inicio/i }));
  const test = screen.getByRole('link', {
    name: /Películas/i,
  });

  expect(test).toBeInTheDocument();
});

/* describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let router: Router;
  let fixture: ComponentFixture<NavbarComponent>;

  const mockLocalStorageService = {
    cleanLocalStorage: jest.fn(),
  };

  @Component({
    selector: 'app-homepage-mock',
    template: ``,
    standalone: true,
  })
  class MockHomePageComponent {}

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
      imports: [NavbarComponent],
      providers: [
        provideRouter([
          { path: 'home', component: MockHomePageComponent },
          { path: 'movies', component: MockMoviesComponent },
          { path: 'shows', component: MockShowsComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the movie list page', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="redirectMovies"]'));
    link.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/movies');
  });

  it('should redirect to the show list page', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="redirectShows"]'));
    link.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/shows');
  });

  it('should redirect to the home page', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="redirectHome"]'));
    link.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/home');
  });

  it('should redirect to the login page', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="redirectLogin"]'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(router.url).toBe('/');
  });




}); */

/*   it('can link to established components', () => {
    const anchorElements = fixture.debugElement.queryAll(By.css('a'));

    expect(anchorElements.length).toBe(3);
    expect(anchorElements[0]?.attributes['href']).toBe('/home');
    expect(anchorElements[1]?.attributes['href']).toBe('/movies');
    expect(anchorElements[2]?.attributes['href']).toBe('/shows');
  });

  it('can show the active link', waitForAsync(async () => {
    const harness = await RouterTestingHarness.create('home');
    expect(router.url).toBe('/home');

    await harness.navigateByUrl('movies');
    expect(router.url).toBe('/movies');
  }));*/

/* it('can show the active link', waitForAsync(async () => {
  let routerTestingHarness: RouterTestingHarness
  await fixture.ngZone?.run(async () => routerTestingHarness = await RouterTestingHarness.create('home'))
  fixture.detectChanges();
  let activeLinks = fixture.debugElement.queryAll(By.css('.active'))

  expect(activeLinks.length).toBe(1);
  expect(activeLinks[0]?.attributes['href']).toBe('home');

  await fixture.ngZone?.run(async () => routerTestingHarness.navigateByUrl('movies'))
  fixture.detectChanges();
  activeLinks = fixture.debugElement.queryAll(By.css('.active'))
  expect(activeLinks.length).toBe(1);
  expect(activeLinks[0]?.attributes['href']).toBe('movies');
}));

testing-library-angular
 */
