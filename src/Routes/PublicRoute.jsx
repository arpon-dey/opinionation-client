import {
    createBrowserRouter
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AllPayment from "../Pages/Dashboard/AllPayment/AllPayment";
import AllSurvey from "../Pages/Dashboard/AllSurvey/AllSurvey";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllVote from "../Pages/Dashboard/AllVote/AllVote";
import CreateSurvey from "../Pages/Dashboard/CreateSurvey/CreateSurvey";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UnpublishSurvey from "../Pages/Dashboard/UnpublishSurvey/UnpublishSurvey";
import UpdateSurvey from "../Pages/Dashboard/UpdateSurvey/UpdateSurvey";
import UserFeedback from "../Pages/Dashboard/UsersFeedback/UserFeedback";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Survey from "../Pages/Survey/Survey";
import SurveyDetails from "../Pages/Survey/SurveyDetails";
import AdminRoute from "./AdminRoute";
import PrivateRoute from './PrivateRoute';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/survey',
                element: <Survey></Survey>
            },
            {
                path: '/survey/:id',
                element:<PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://opinio-nation-server.vercel.app/survey/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <Register></Register>
            },
            {
                path: '*',
                element: <div>404 not found</div>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [


            //User

            {
                path: 'payment',
                element: <Payment></Payment>
            },
            // surveyor
            {
                path: 'createSurvey',
                element: <CreateSurvey></CreateSurvey>
            },
            {
                path: 'allSurvey',
                element: <AllSurvey></AllSurvey>
            },
            {
                path: 'survey/update/:id',
                element:<UpdateSurvey />,
                loader: ({ params }) => fetch(`https://opinio-nation-server.vercel.app/survey/update/${params.id}`),
            },
            {
                path: 'reports',
                element: <UserFeedback></UserFeedback>,
               
            },

            //Admin

            {
                path: 'users',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'allVote',
                element: <PrivateRoute><AllVote></AllVote></PrivateRoute>
            },
            {
                path: 'allPayment',
                element: <AdminRoute><AllPayment></AllPayment></AdminRoute>
            },
            {
                path: 'unpublish',
                element: <AdminRoute><UnpublishSurvey></UnpublishSurvey></AdminRoute>
            },
            {
                path: '*',
                element: <div>404 not found</div>
            }

        ]
    }
]);

export default router;