import * as React from "react";
import { action } from "typesafe-actions";
import { IServer } from "../../servers";
import { RequestsActionTypes } from "./types";

export interface ILoadServerRequestsAction {
  type: RequestsActionTypes.LOAD_SERVER_REQUESTS;
  payload: {
    serverName: string;
    server: IServer;
  };
}

export const loadServerRequests = (
  server: IServer
): ILoadServerRequestsAction =>
  action(RequestsActionTypes.LOAD_SERVER_REQUESTS, {
    serverName: server.name,
    server
  });

export interface ILoadServerRequestsRequestAction {
  type: RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST;
  payload: {
    serverName: string;
    server: IServer;
  };
}

export const loadServerRequestsRequest = (
  server: IServer
): ILoadServerRequestsRequestAction =>
  action(RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST, {
    serverName: server.name,
    server
  });

export interface ILoadServerRequestsSuccessAction {
  type: RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS;
  payload: {
    serverName: string;
    server: IServer;
    requests: any[];
  };
}

export const loadServerRequestsSuccess = (
  server: IServer,
  requests: any[]
): ILoadServerRequestsSuccessAction =>
  action(RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS, {
    serverName: server.name,
    server,
    requests
  });

export type RequestsAction =
  | ILoadServerRequestsAction
  | ILoadServerRequestsRequestAction
  | ILoadServerRequestsSuccessAction;
