import * as React from "react";
import { IServer } from "../../servers";
import RequestJsonEditor from "./RequestJsonEditor";

interface IRequestProps {
  server?: IServer;
  isLoading: boolean;
  request: any;
}

export default class Mapping extends React.Component<IRequestProps, {}> {
  constructor(props: IRequestProps) {
    super(props);
  }

  render() {
    const { request, isLoading } = this.props;
    return <RequestJsonEditor isLoading={isLoading} request={request} />;
  }
}
