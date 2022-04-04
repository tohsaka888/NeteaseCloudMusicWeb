import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import { Layout } from "antd";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <ChakraProvider>
      <Layout>
        <App />
      </Layout>
    </ChakraProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
