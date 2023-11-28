import { FaHome, FaInfo, FaList, FaListOl, FaMoneyCheck } from "react-icons/fa";
import { FaCircleInfo, FaFileCirclePlus, FaListCheck } from "react-icons/fa6";

import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from "../Hooks/useAdmin";
import useSurveyor from "../Hooks/useSurveyor";

const Dashboard = () => {
    // const isSurveyor = true
    const [isAdmin] = useAdmin()
    const [isSurveyor] = useSurveyor()
    console.log('is surveyor', isSurveyor);
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-gradient-to-r from-teal-700 to-teal-400 text-white font-semibold">
                <ul className="menu">
                    {   isSurveyor ? (<>
                        <li>
                            <NavLink to='/dashboard/surveyorHome'>
                                <FaHome></FaHome>
                                Surveyor home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/createSurvey'>
                            <FaFileCirclePlus />
                                Create survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/allSurvey'>
                                <FaList></FaList>
                                All survey
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/allVote'>
                                <FaListCheck></FaListCheck>
                                Survey response
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/bookings'>
                                <FaCircleInfo></FaCircleInfo>
                                Admin feedback
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/reports'>
                                <FaInfo></FaInfo>
                                Users feedback
                            </NavLink>
                        </li>
                        

                    </>) : 
                        isAdmin?  (<>
                        <li>
                            <NavLink to='/dashboard/adminHome'>
                                <FaHome></FaHome>
                                Admin home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/users'>
                                <FaListCheck></FaListCheck>
                                Manage users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/allVote'>
                                <FaList></FaList>
                               Survey responses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/allPayment'>
                            <FaMoneyCheck />
                                Payment history
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/unpublish'>
                                <FaListOl></FaListOl>
                               All Survey
                            </NavLink>
                        </li>

                    </>)

                        :


                        <>
                            <li>
                                <NavLink to='/dashboard/userHome'>
                                    <FaHome></FaHome>
                                    User home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/reservation'>
                                    <FaMoneyCheck></FaMoneyCheck>
                                    My payment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/payment'>
                                    <FaListCheck></FaListCheck>
                                   My survey
                                </NavLink>
                            </li>
                           
                            </>
                    }

                    {/*shared nav links */}

                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/survey'>
                            Survey
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            About us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8
            ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;