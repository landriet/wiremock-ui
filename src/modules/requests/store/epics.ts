import { combineEpics, Epic } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { getRequests } from '../../../api'
import { IApplicationState } from '../../../store'
import {
    ILoadServerRequestsAction,
    ILoadServerRequestsRequestAction,
    loadServerRequestsRequest,
    loadServerRequestsSuccess,
    RequestsAction,
} from './actions'
import { EMPTY, of } from 'rxjs'
import { RequestsActionTypes } from './types'

export const shouldLoadServerRequestsEpic: Epic<
    RequestsAction,
    any,
    IApplicationState
> = (action$, state$) =>
    action$.ofType(RequestsActionTypes.LOAD_SERVER_REQUESTS).pipe(
        mergeMap(({ payload }: ILoadServerRequestsAction) => {
            const isLoaded = state$.value.requests.isLoaded
            if (isLoaded) {
                return EMPTY
            }

            return of(loadServerRequestsRequest(payload.server))
        }),
    )

export const loadServerRequestsEpic: Epic<
    RequestsAction,
    any,
    IApplicationState
> = (action$, state$) =>
    action$
        .ofType(RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST)
        .pipe(
            mergeMap(({ payload }: ILoadServerRequestsRequestAction) =>
                getRequests(payload.server).pipe(
                    map(({ requests: requests }) =>
                        loadServerRequestsSuccess(payload.server, requests),
                    ),
                ),
            ),
        )

export const requestsEpic = combineEpics(
    shouldLoadServerRequestsEpic,
    loadServerRequestsEpic,
)
