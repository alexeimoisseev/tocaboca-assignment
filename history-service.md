# Saving history of operations

## Making a call from calculation service

For saving history of operations let's introduce another service.

Calculator service should call history service whenever new request is arrived and calculation is made. This call should affect calculator serice as least as possible. Call must be done asynchronously when calculation is made and response sent to client. This will help us be sure that main functionality is working if history service is down. Well it is point of discussion, if we consider that saving history is mandatory for the whole service to work, then we respond to client with error if saving fails.


Making history service separate would bring several benefits:

1. It will help making calculation service as simple as possible, without persistence.
2. It would let us making using different tecniques of querying data.
3. It would let us scale history service intependently. If reading history requests come more often, then we just scale history service.

For making a call we can use nest.js `interceptor` feature.
Code could be something like this:

```
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
				POST history/save
				{
					expression,
					result: r,
					user: headers['user-id'],
				}

				*/

			});
			return data;
		});
	}
}
```

And in AppController could be used like this:

```
@UseInterceptors(HistoryInterceptor)
export class AppController {
	...
```

We need to configure API gateway so it passes user id to the header (in the example above it can be `user-id`).


## Design of history service

### API

It consists of two endoints:

	1. `POST /save`. It saves history item from calculation service HistoryInterceptor.
	2. `GET /history`. It returns the list of calculations for specified user and other parameters.

User authorization should be handled by API Gateway as it is done for calculation service.

`GET /history` request should get user id from header or from get parameter.
It accepts query parameters:

* `from` - timestamp from which we want to get history
* `to` - ...
* `sort` - asccending or decscending by timestamp
* `limit` - number of items to return
* `offset` - from which item it should start

Response could be something like:
```
{
	meta: {
		count: 1000500, // items found
		limit: 100, // number of items in response
		offset: 100, // number of first item from the whole result
		page: 2 // page number for easier implementation of pagination
	},
	result: [
		{
			timestamp: 1637585362, // timestamp of event
			userId: 123,
			expression: "1+2",
			result: "3"
		}, 
		{
			...
		}
	]
}
```

Using GraphQL can be considered here.

### Persistence

History service saves data in time-series database, for example TimescaleDB.

Structure could be: `timestamp, userId, expression, result`.

Probably it would be a good idea using some shared models for those items that could be used by both services (https://typeorm.io/).
