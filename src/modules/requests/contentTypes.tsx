import * as React from "react";
import {IContentRenderContext} from "edikit";
import {IData} from "../../types";
import MappingIcon from "../mappings/components/MappingIcon";
import RequestContainer from "./container/RequestContainer";

export const requestsContentTypes = [
  {
    id: "request",
    renderButton: (context: IContentRenderContext<IData>) => {
      return "request";
    },
    renderIcon: () => <MappingIcon />,
    renderPane: (context: IContentRenderContext<IData>) => (
      <RequestContainer
        key={context.content.id}
        serverName={context.content.data!.serverName}
        requestId={context.content.data!.requestId!}
      />
    )
  }
];
