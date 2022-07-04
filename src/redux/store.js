// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import rpm from "redux-promise-middleware";

// import reducers from "./reducers";

// const enhancers = applyMiddleware(rpm, logger);
// const store = createStore(reducers, enhancers);

// export default store;

import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rpm from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(pReducer, enhancers);
const persistor = persistStore(store);

export { store, persistor };
