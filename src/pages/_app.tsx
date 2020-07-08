import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux, { AppProps } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import makeStore from "../store/reducers";
import "../assets/styles/main.css";

export default withRedux(makeStore)(
    class extends App<AppProps> {
        render() {
            const { Component, pageProps, store } = this.props;
            return (
                <Provider store={store}>
                    <PersistGate
                        persistor={(store as any).__PERSISTOR}
                        loading={null}
                    >
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            );
        }
    }
);
