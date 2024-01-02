import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = '/assets';
    if (req.url.includes(excludedUrls)) {
        return next.handle(req);
    }
    var prefix = !req.url.startsWith("http") ? environment.apiBaseUrl : '';
    const apiReq = req.clone({ url: `${prefix}${req.url}` });
    return next.handle(apiReq);
}
}
