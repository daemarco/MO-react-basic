import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./store-picker";
import App from "./App";
import NotFound from "./not-found";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route path="/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;