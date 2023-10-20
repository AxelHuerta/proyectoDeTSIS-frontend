import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./routes/LoginPage.tsx";
import LoginStudent from "./routes/login/LoginStudent.tsx";
import LoginPsychiatrist from "./routes/login/LoginPsychiatrist.tsx";
import ServicesContainer from "./routes/services/ServicesContainer.tsx";
import Patients from "./routes/Psychiatrist/Patients.tsx";
import Appointments from "./routes/Psychiatrist/Appointments.tsx";
import AppointmentDetails from "./routes/Psychiatrist/AppointmentDetails.tsx";
import Article1 from "./routes/articles/article1.tsx";
import PatientDetails from "./routes/Psychiatrist/PatientDetails.tsx";

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
    element: <ServicesContainer />,
  },
  {
    path: "/servicestest",
    element: <ServicesContainer />,
  },
  {
    path: "/pacientes",
    element: <Patients />,
  },
  {
    path: "/citas",
    element: <Appointments />,
  },
  {
    path: "/citas/:citaId",
    element: <AppointmentDetails />,
  },
  {
    path: "/patients/:patientId",
    element: <PatientDetails />,
  },
  {
    path: "/article1",
    element: <Article1 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
