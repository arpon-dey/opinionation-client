import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SurveyCard = ({ SurveyCard }) => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {  data: vote = [] } = useQuery({
        queryKey: ['vote', user?.email, SurveyCard?._id],

        queryFn: async () => {
            const res = await axiosSecure.get(`/vote?email=${user?.email}&surveyId=${SurveyCard?._id}`)
            return res.data;
        }
    })
    console.log(vote);
   
    
    return (
        <div>
            <div className="card w-96 h-96  bg-base-100 shadow-xl">
                <figure><img src={SurveyCard?.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{SurveyCard?.name}</h2>
                    <p>{SurveyCard?.description.slice(0, 40)}... <span className="text-red-500 font-semibold">read more</span> </p>
                   
                    <div className="card-actions justify-end">
                        <Link to={`/survey/${SurveyCard?._id}`} className="btn btn-accent">Join in survey</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyCard;