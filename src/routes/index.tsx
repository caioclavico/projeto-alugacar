import { Routes as Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { LoginAuth } from "./LoginAuth";
import { RequireAuth } from "./RequireAuth";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" element={<Home />} />
            <Route
                path="/login"
                element={
                    <LoginAuth>
                        <Login />
                    </LoginAuth>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
        </Switch>
    );
};
