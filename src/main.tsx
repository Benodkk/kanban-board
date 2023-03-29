import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import store from "./redux/reducer";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { GlobalStyle } from "./styles/Global";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
