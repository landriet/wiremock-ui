import {Dispatch} from "redux";
import {connect} from "react-redux";
import {IApplicationState} from "../../../store";
import {IServer} from "../../servers";
import Request from "../components/Request";

interface IOwnProps {
  serverName: string;
  requestId: string;
}

interface IPropsFromState {
  server?: IServer;
  isLoading: boolean;
  request: any;
}

const mapStateToProps = (
  { servers: { servers }, requests: serversRequests }: IApplicationState,
  { serverName, requestId }: IOwnProps
): IPropsFromState => {
  const server = servers.find(s => s.name === serverName);
  const serverRequests = serversRequests[serverName]
  const request = serverRequests.byId[requestId];
  return {
    server,
    isLoading: false,
    request,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IOwnProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
