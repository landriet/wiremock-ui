import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import {
    panesReducer,
    IPanesState,
    notificationsReducer,
    notificationsEpic,
    INotificationsState,
    NotificationsAction,
} from 'edikit'
import { coreReducer, CoreAction, ICoreState, coreEpic } from './modules/core'
import {
    mappingsReducer,
    IMappingsState,
    MappingsAction,
    mappingsEpic,
} from './modules/mappings'
import {
    serversReducer,
    IServersState,
    ServersAction,
    serversEpic,
} from './modules/servers'
import {
    settingsReducer,
    ISettingsState,
    SettingsAction,
} from './modules/settings'
import { IData } from './types'
import {
    IRequestsState,
    RequestsAction,
    requestsEpic,
    requestsReducer,
} from './modules/requests/store'

export interface IAction {
    type: string
    payload?: {}
}

export type RootAction =
    | NotificationsAction
    | CoreAction
    | ServersAction
    | SettingsAction
    | MappingsAction
    | RequestsAction

export const rootEpic = combineEpics(
    notificationsEpic,
    coreEpic,
    serversEpic,
    mappingsEpic,
    requestsEpic,
)

export interface IApplicationState {
    notifications: INotificationsState
    panes: IPanesState<IData>
    core: ICoreState
    settings: ISettingsState
    servers: IServersState
    mappings: IMappingsState
    requests: IRequestsState
}

export const rootReducer = combineReducers<IApplicationState>({
    notifications: notificationsReducer,
    panes: panesReducer<IData>(),
    core: coreReducer,
    settings: settingsReducer,
    servers: serversReducer,
    mappings: mappingsReducer,
    requests: requestsReducer,
})
