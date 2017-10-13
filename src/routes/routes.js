import React from "react";
import { Route } from "react-router-dom";
import Configuration from "../core/Configuration";

export default [
  // eslint-disable-next-line react/jsx-key
  <Route exact path="/configuration" component={Configuration} />
];
