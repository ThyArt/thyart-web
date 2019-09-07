import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import thyartApp from "./reducers";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    thyartApp,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
