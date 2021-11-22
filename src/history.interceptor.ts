import { CallHandler, ArgumentsHost, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryInterceptor implements NestInterceptor<string> {
	intercept(context: ArgumentsHost, next: CallHandler): Observable<string> {
		const request = context.switchToHttp().getRequest();
		const { expression } = request.params;
		const { headers } = request;
		return next.handle().pipe(result => {
			data.subscribe(r => {
				/*

				send something like this to history service
				{
					expression,
					result: r,
					user: headers['userId'],
				}

				*/

			});
			return data;
		});
	}
}