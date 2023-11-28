import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation() 
    const noNavFoot = location.pathname.includes('login' )|| location.pathname.includes('signUp');
    return (
        <div className="font-Space">
            {noNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noNavFoot || <Footer></Footer>}
        </div>
    );
};

export default Main;