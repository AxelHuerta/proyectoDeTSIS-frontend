import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./routes/LoginPage.tsx";
import LoginStudent from "./routes/login/LoginStudent.tsx";
import LoginPsychiatrist from "./routes/login/LoginPsychiatrist.tsx";
import Services from "./routes/Services.tsx";
import ServicesContainer from "./routes/Psychiatrist/services/ServicesContainer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/student",
    element: <LoginStudent />,
  },
  {
    path: "/login/psychiatrist",
    element: <LoginPsychiatrist />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/servicestest",
    element: <ServicesContainer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
