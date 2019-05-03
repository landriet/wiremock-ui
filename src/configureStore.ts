import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { notificationsMiddleware } from 'edikit'
import { IApplicationState, rootEpic, rootReducer } from './store'
import { loadState, saveState } from './modules/tools/localStorage'
import { IServer } from './modules/servers'

export default function configureStore(): Store<IApplicationState> {
    const epicMiddleware = createEpicMiddleware()

    const middlewares = [epicMiddleware, notificationsMiddleware]

    const store = createStore(
        rootReducer,
        loadState(),
        composeWithDevTools(applyMiddleware(...middlewares)),
    )

    store.subscribe(() => {
        const servers =
            store.getState().servers !== undefined
                ? store.getState().servers
                : { servers: [] }
        const mappings = servers.servers.reduce(
            (previousValue: any, currentValue: IServer) => {
                return {
                    ...previousValue,
                    [currentValue.name]: {
                        isLoading: false,
                        haveBeenLoaded: false,
                        ids: [],
                        byId: {},
                        creations: {},
                    },
                }
            },
            {},
        )
        saveState({
            servers,
            mappings,
        })
    })

    epicMiddleware.run(rootEpic)

    return store
}
