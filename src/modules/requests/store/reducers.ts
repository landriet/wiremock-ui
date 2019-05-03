import { RequestsAction } from './actions'
import { RequestsActionTypes } from './types'
import { ServersAction, ServersActionTypes } from '../../servers/store'
import { IServer } from '../../servers'
import { uniq } from 'lodash'
import { IRequest } from '../types'

export interface IRequestsState {
    [serverName: string]: IServerRequestsState
}

export interface IServerRequestsState {
    isLoading: boolean
    haveBeenLoaded: boolean
    ids: string[]
    byId: {
        [requestId: string]: IRequest
    }
}

export const requestsReducer = (
    state: IRequestsState = {},
    action: RequestsAction | ServersAction,
): IRequestsState => {
    switch (action.type) {
        case ServersActionTypes.INIT_SERVERS:
            return action.payload.servers.reduce(
                (agg: IRequestsState, server: IServer) => ({
                    ...agg,
                    [server.name]: {
                        isLoading: false,
                        haveBeenLoaded: false,
                        ids: [],
                        byId: {},
                        creations: {},
                    },
                }),
                {},
            )

        case ServersActionTypes.CREATE_SERVER:
            return {
                ...state,
                [action.payload.server.name]: requestsByServerReducer(
                    undefined,
                    action,
                ),
            }

        case RequestsActionTypes.LOAD_SERVER_REQUESTS:
        case RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS:
        case RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST:
            return {
                ...state,
                [action.payload.serverName]: requestsByServerReducer(
                    state[action.payload.serverName],
                    action,
                ),
            }

        default:
            return state
    }
}

export const requestsByServerReducer = (
    state: IServerRequestsState = {
        isLoading: false,
        haveBeenLoaded: false,
        ids: [],
        byId: {},
    },
    action: RequestsAction | ServersAction,
): IServerRequestsState => {
    switch (action.type) {
        case RequestsActionTypes.LOAD_SERVER_REQUESTS:
            return {
                ...state,
                isLoading: true,
                haveBeenLoaded: false,
            }
        case RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS:
            const { requests } = action.payload
            return {
                ...state,
                isLoading: false,
                haveBeenLoaded: true,
                ids: uniq(requests.map(request => request.id)),
                byId: requests.reduce(
                    (
                        agg,
                        request,
                    ): { [requestId: string]: IRequest } => ({
                        ...agg,
                        [request.id]: request,
                    }),
                    {},
                ),
            }
    }
    return state
}
