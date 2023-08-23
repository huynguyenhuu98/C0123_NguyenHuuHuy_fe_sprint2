import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {BrowserRouter} from "react-router-dom";
import IntlProvider from "react-intl/lib/src/components/provider";
import {Provider} from "react-redux";
import store from "./components/redux/store";

ReactDOM.render(
    <IntlProvider locale="en">
        <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
        </Provider>
    </IntlProvider>,
  document.getElementById("root")
)
