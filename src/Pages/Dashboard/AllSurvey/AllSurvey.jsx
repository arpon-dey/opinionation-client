import { Link } from "react-router-dom";
import useSurvey from "../../../Hooks/useSurvey";

const AllSurvey = () => {
    const [survey] = useSurvey()
    console.log(survey);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {
                survey.map((item) => <div key={item._id} className="">
                    <div className="card card-compact w-96 bg-base-100 shadow-xl h-96">
                        <figure><img src={item?.image} alt="Shoes" /></figure>
                        <div className=" flex items-center justify-between px-4 mt-8">
                            <div>
                                <h2 className="card-title">{item.name}</h2>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/dashboard/survey/update/${item._id}`}><button className="btn btn-warning btn-xs">Update</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default AllSurvey;