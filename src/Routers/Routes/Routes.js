import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import ManageDoctor from "../../Pages/Dashboard/ManageDoctor/ManageDoctor";
import MyAppointment from "../../Pages/Dashboard/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/LogIn/SignUp";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import AdminRoute from "../PrivateRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/appointment',
                element: <PrivateRoute><Appointment /></PrivateRoute>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <MyAppointment />
                    },
                    {
                        path: '/dashboard/allUsers',
                        element: <AdminRoute><AllUsers /></AdminRoute>
                    },
                    {
                        path: '/dashboard/addDoctor',
                        element: <AdminRoute><AddDoctor /></AdminRoute>
                    },
                    {
                        path: '/dashboard/manageDoctor',
                        element: <AdminRoute><ManageDoctor /></AdminRoute>
                    },
                    {
                        path: '/dashboard/payment/:id',
                        element: <AdminRoute><Payment /></AdminRoute>,
                        errorElement: <ErrorPage />,
                        loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
                    },
                ]
            },
            {
                path: '/logIn',
                element: <LogIn />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
        ]
    }
]);

export default router;