import { FaList, FaReact, FaSearch } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";

import SectionTitle from "../../../components/SectionTitle";

const Features = () => {
    return (
        <div className="mb-16">
            <SectionTitle heading='Features' subHeading='special features'></SectionTitle>
            <div className="md:flex grid grid-cols-1 mx-8  justify-center items-center gap-8 ">
            <div className="text-center rounded-xl bg-teal-200 p-8">
                <div className="flex flex-col items-center">
                    <FaList className="mb-4 text-7xl" />
                    <h1 className="text-xl font-semibold mb-2">Dynamic Surveys</h1>
                    <p>Create and customize <br /> surveys effortlessly.</p>
                </div>
            </div>
            <div className="text-center rounded-xl bg-teal-200 p-8">
                <div className="flex flex-col items-center">
                    <FaSearch className="mb-4 text-7xl" />
                    <h1 className="text-xl font-semibold mb-2">Instant Analytics</h1>
                    <p>Instantly view and <br /> analyze survey responses.</p>
                </div>
            </div>
            <div className="w-64  text-center rounded-xl bg-teal-200 p-8">
                <div className="flex flex-col items-center">
                    <FaReact className="mb-4 text-7xl" />
                    <h1 className="text-xl font-semibold mb-2">Interactivity</h1>
                    <p>Engage users with <br /> interactive elements.</p>
                </div>
            </div>
            <div className="w-64 text-center rounded-xl bg-teal-200 p-8">
                <div className="flex flex-col items-center">
                    <FaHouseCircleCheck className="mb-4 text-7xl" />
                    <h1 className="text-xl font-semibold  mb-2">Robust Security</h1>
                    <p>Ensure data privacy <br /> and integrity.</p>
                </div>
            </div>
            
            
           
        </div>
        </div>
    );
};

export default Features;