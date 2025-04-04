import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KEY_API } from '../../core/constants/token';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${KEY_API}`),
  });

  return next(newReq);
};
