import { ComponentFixture, TestBed } from "@angular/core/testing"
import { DetailComponent } from "./detail.component"
import { Media } from "../../../core/models/media"
import { By } from "@angular/platform-browser"

describe('DetailComponent', () => {
  let component: DetailComponent
  let fixture: ComponentFixture<DetailComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isShow to true if object has genres', () => {
    const media: Media = {
      id: 1,
      releaseDate: '2025-03-11',
      voteAverage: 8.5,
      title: 'The Great Adventure',
      synopsis: 'A thrilling journey through uncharted territories.',
      image: 'https://example.com/image.jpg',
      genres: ['Adventure', 'Action']
    };
    component.object = media;
    component.ngOnInit();
    expect(component.isShow).toBe(true);
  });

  it('should set isShow to false if object does not have genres', () => {
    const media: Media = {
      id: 1,
      releaseDate: '2025-03-11',
      voteAverage: 8.5,
      title: 'The Great Adventure',
      synopsis: 'A thrilling journey through uncharted territories.',
      image: 'https://example.com/image.jpg'
    };
    component.object = media;
    component.ngOnInit();
    expect(component.isShow).toBe(false);
  });

  it('should display if isShow is true', () => {
    const media: Media = {
      id: 1,
      releaseDate: '2025-03-11',
      voteAverage: 8.5,
      title: 'The Great Adventure',
      synopsis: 'A thrilling journey through uncharted territories.',
      image: 'https://example.com/image.jpg',
    };
    component.object = media;
    component.ngOnInit();
    fixture.detectChanges();
    const isShowTrue = fixture.debugElement.query(
      By.css('[data-testid="isShowTrue"]')
    )
    expect(isShowTrue).toBeFalsy()
  })

  it('should not display if isShow is false', () => {
    const media: Media = {
      id: 1,
      releaseDate: '2025-03-11',
      voteAverage: 8.5,
      title: 'The Great Adventure',
      synopsis: 'A thrilling journey through uncharted territories.',
      image: 'https://example.com/image.jpg',
      genres: ['Adventure', 'Comedia']
    };
    component.object = media;
    component.ngOnInit();
    fixture.detectChanges();
    const isShowTrue = fixture.debugElement.query(
      By.css('[data-testid="isShowTrue"]')
    )
    expect(isShowTrue).toBeTruthy()
  })
})
