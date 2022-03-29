import { render } from "react-dom";
import "./css/index.css";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { persistor } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,

  document.querySelector("#root")
);
