import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { movie, show } from '../../../core/constants/objectsTest';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let router: Router;
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.object = show
    jest.clearAllMocks();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an object', () => {
    expect(component.object).toBeDefined();
  });

  describe('toDetailPage', () => {

    it('should redirect to /show if object has genres', () => {
      const cardContainer = fixture.debugElement.query(
        By.css('[data-testid="card-container"]')
      );

      component.object = show

      cardContainer.triggerEventHandler('click');
      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['/show', component.object.id]);
    });

    it('should redirect to /movies if object hasnt got genres', () => {
      const cardContainer = fixture.debugElement.query(
        By.css('[data-testid="card-container"]')
      );

      component.object = movie

      cardContainer.triggerEventHandler('click');
      fixture.detectChanges();
      console.log(component.object)

      expect(router.navigate).toHaveBeenCalledWith(['/movie', component.object.id]);
    });

  });
});
