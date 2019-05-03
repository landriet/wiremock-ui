import { RequestsAction } from "./actions";
import { RequestsActionTypes } from "./types";

export interface IRequestsState {
  requests: any[];
  isLoaded: boolean;
}

const initialState: IRequestsState = {
  requests: [],
  isLoaded: false,
};

export const requestsReducer = (
  state: IRequestsState = initialState,
  action: RequestsAction
): IRequestsState => {
  switch (action.type) {
    case RequestsActionTypes.LOAD_SERVER_REQUESTS:
      return state;
    case RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS:
      const { requests } = action.payload;
      return {
        ...state,
        requests,
        isLoaded: true,
      };
  }
  return state;
};
