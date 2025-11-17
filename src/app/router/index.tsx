import { createBrowserRouter } from "react-router";
import { Layout } from "../layout";
import SignIn from "@/pages/sign-in";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "companies", element: <div>Companies</div> },
      { path: "users", element: <div>Users</div> },
      { path: "devices", element: <div>Devices</div> },
      { path: "groups", element: <div>Groups</div> },
      { path: "meters", element: <div>Meters</div> },
      { path: "readings", element: <div>Readings</div> },
      { path: "webhooks", element: <div>Webhooks</div> },
    ],
  },
  { path: "/sign-in", element: <SignIn /> },
]);
