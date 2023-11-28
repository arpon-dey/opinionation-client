import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useSurvey from "../../../Hooks/useSurvey";
import SurveyChart from "./SurveyChart";


const AllVote = () => {
    const axiosSecure = useAxiosSecure()
    const [survey] = useSurvey()
    console.log(survey);
    // const time = Date()
    const { data: votes = [] } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vote')
            console.log(res.data);
            return res.data;
        }
    })
   
   

    const surveyVotes = [];

    // Iterate through the votes array and populate the object
    votes.forEach((vote) => {
        const surveyId = vote.surveyId;
        const query1YesCount = vote.query1 === "yes" ? 1 : 0;
        const query1NoCount = vote.query1 === "no" ? 1 : 0;
        const query2YesCount = vote.query2 === "yes" ? 1 : 0;
        const query2NoCount = vote.query2 === "no" ? 1 : 0;

        surveyVotes[surveyId] = {
            yes: (surveyVotes[surveyId]?.yes || 0) + query1YesCount + query2YesCount,
            no: (surveyVotes[surveyId]?.no || 0) + query1NoCount + query2NoCount,
        };
    });

    console.log("Survey Votes:", surveyVotes);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="overflow-x-auto ">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Voted</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes.map((voter,) => <tr key={survey._id}>


                                <td className="font-semibold text-md">
                                    {voter.surveyorName}.
                                </td>
                                <td className="font-semibold text-md">
                                    {voter.voterEmail}
                                </td>
                                <td className="font-semibold text-md">
                                    {voter.time}
                                </td>

                                <td className=" ">
                                    <button className="btn btn-xs btn-success text-white"> yes</button>
                                </td>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
            <div className="">
            {Object.keys(surveyVotes).length > 0 && <SurveyChart surveyVotes={surveyVotes} />}
            </div>
        </div>
    );
};

export default AllVote;