import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "../local-storage.service";


describe('LocalStorageService', ()=> {
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  describe('getAndSetToken', () => {
    it('should set and get token', () => {
      const token = 'testToken';
      localStorageService.setToken(token);
      expect(localStorageService.getToken()).toBe(token);
    });

    it('should return null if token is not set', () => {
      expect(localStorageService.getToken()).toBeNull();
    });
  })

  describe('clearLocalStorage', () => {
    it('should clear local storage', () => {
      localStorageService.setToken('testToken');
      localStorageService.cleanLocalStorage();
      expect(localStorageService.getToken()).toBeNull();
    });
  })
})
