import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import todo from "./modules/todo";
import User from "./modules/user";
import Result from "./modules/result";
export const history = createBrowserHistory();

// 루트리듀서(여러개 모듈을 하나로 묶어서 사용)
const rootReducer = combineReducers({
  router: connectRouter(history),
  todo: todo,
  user: User,
  result: Result,
});

// 미들웨어(thunk로) 설정
const middlewares = [thunk.withExtraArgument({ history: history })];

// 현재환경 (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경 - logger사용설정
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 리덕스 데브툴 사용설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

//미들웨어 적용
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어에 루트리듀서와 미들웨어랑 리덕스데브툴 적용된 enhancer 적용
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
