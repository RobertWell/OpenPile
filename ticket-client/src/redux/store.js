import { createStore, applyMiddleware } from "redux";
import allReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "client",
  storage,
};
const persistedReducer = persistReducer(persistConfig, allReducer);

const middleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

const store =()=> {
  let store = createStore(persistedReducer, middleware);
  let persistor = persistStore(store);
  return { store, persistor };
}
export default store