import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import gem from '../../../assets/others/diamond.png';


const Navbar = () => {
    const [finalValue, setFinalValue] = useState(0)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user, logout } = useAuth()

    const { data: gems = [] } = useQuery({
        queryKey: ['gems'],
        queryFn: async () => {
            const res = await axiosPublic.get('/vote')
            return res.data;
        }

    })
    console.log('gems: ', gems);
    const { data: userRole = [] } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user-role')


            return res.data;
        }
    })
    console.log('user-role is ', userRole.role);
    const isProUser = userRole.role === 'proUser'



    const userGemsObjects = gems.filter(item => item.voterEmail === user?.email);
    console.log('User Gems Objects: ', userGemsObjects);
    const userGemsValues = userGemsObjects.map(item => item.gems ?? 0);
    console.log('User Gems Values: ', userGemsValues);
    const totalUserGemsValue = userGemsValues.reduce((total, value) => total + value, 0);
    console.log('Total User Gems Value: ', totalUserGemsValue);

    useEffect(() => {
        if (isProUser) {
            const newFinalValue = totalUserGemsValue - 50;
            setFinalValue(newFinalValue);
        } else {
            setFinalValue(totalUserGemsValue);
        }
    }, [isProUser, totalUserGemsValue]);


    const handleSignOut = () => {
        logout()
    }
    const navItems = <>
        <li><Link to='/'> Home</Link></li>
        <li><Link to='/'> About us</Link></li>
        <li><Link to='/survey'> Surveys</Link></li>
        <li><Link to='/dashboard/payment'>Pro</Link></li>
        <li><Link to='/order/salad'>Contact </Link></li>
        <li><Link to='/dashboard'>Dashboard </Link></li>
        {
            user ? <><li> <Link onClick={handleSignOut} className="">Logout</Link></li></> :
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signUp'>SignUp</Link></li>
                </>
        }



    </>


    return (
        <div>
            <div className="navbar rounded-b-lg fixed z-50 bg-black lg:text-white text-black bg-opacity-30 md:max-w-screen-xl max-w-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">OpinioNation</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">

                    <div>
                        {
                            user ? <div className="flex items-center">
                                <div className="mr-2">
                                    <button className="flex btn btn-sm rounded-2xl bg-gray-200 border-0">
                                        <img src={gem} className="w-6" alt="" />
                                        <p>{finalValue}</p>
                                    </button>
                                </div>
                                <div className="flex gap-4 items-center mr-4">
                                    <p className="font-bold">{user.displayName}</p>
                                    <img src={user?.photoURL} className="w-10 rounded-full" alt="" />
                                </div></div> : <></>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;