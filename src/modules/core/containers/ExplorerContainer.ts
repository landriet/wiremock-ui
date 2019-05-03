import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { panesCurrentContentsSelector, uuid } from 'edikit'
import { ITreeNode } from '..'
import { IApplicationState } from '../../../store'
import { loadServerMappings, getMappingUrl } from '../../mappings'
import { IServer } from '../../servers'
import Explorer from '../components/Explorer'
import { loadServerRequests } from "../../requests/store";

const mapStateToProps = (
    {
        panes,
        servers: { servers },
        mappings: serversMappings,
        requests: serversRequests
    }: IApplicationState
): {
    tree: ITreeNode
    servers: IServer[]
} => {
    const currentContentIds: string[] = panesCurrentContentsSelector(panes, 'default')
        .map(({ id }) => id)

    const tree: ITreeNode = {
        id: 'root',
        type: 'root',
        label: 'servers',
        children: []
    }

    servers.forEach(server => {
        const serverNode = {
            id: server.name,
            label: server.name,
            type: 'server',
            children: [] as ITreeNode[],
        }

        const mappings = serversMappings[server.name]
        if (mappings !== undefined) {
            const creationId = uuid()
            serverNode.children.push({
                id: `${server.name}.mapping.create.${creationId}`,
                type: 'mapping.create',
                label: 'create mapping',
                data: {
                    serverName: server.name,
                    creationId,
                },
            })

            const mappingsNode: ITreeNode = {
                id: `${server.name}.mappings`,
                type: 'mappings',
                label: 'mappings',
                data: {
                    serverName: server.name,
                },
                children: [],
            }
            mappings.ids.forEach(mappingId => {
                const mapping = mappings.byId[mappingId].mapping
                if (mapping !== undefined) {
                    mappingsNode.children!.push({
                        id: mappingId,
                        type: 'mapping',
                        label: mapping.name || `${mapping.request.method} ${getMappingUrl(mapping)}`,
                        isCurrent: currentContentIds.includes(mappingId),
                        data: {
                            serverName: server.name,
                            mappingId,
                        },
                    })
                }
            })
            serverNode.children.push(mappingsNode)
        }

        const requests = serversRequests[server.name]
        if (requests !== undefined) {
            const requestsNode: ITreeNode = {
                id: `${server.name}.requests`,
                type: "requests",
                label: "Requests",
                data: {
                    serverName: server.name
                },
                children: []
            };

            requests.ids.forEach(requestId => {
                const request = requests.byId[requestId];
                requestsNode.children!.push({
                    id: requestId,
                    type: "request",
                    label: `${request.request.method} ${request.request.url}`,
                    data: {
                        serverName: server.name,
                        requestId,
                    }
                });
            });
            serverNode.children.push(requestsNode);
        }

        tree.children!.push(serverNode)
    })

    tree.children!.push({
        id: 'server.create',
        type: 'server.create',
        label: 'create server',
    })

    return { tree, servers }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadServerMappings: (server: IServer) => {
        dispatch(loadServerMappings(server))
    },
    loadServerRequests: (server: IServer) => {
        dispatch(loadServerRequests(server));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explorer)
