import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { persistor, store } from './store/store'
import { StyledEngineProvider } from "@mui/material";
import App from "./App";
import "./user/variables.scss";
import { GlobalFallback } from "./shared/errors/GlobalFallback";
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={GlobalFallback}>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  </StrictMode>,
)

