import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useSurvey from "../../../Hooks/useSurvey";
import SectionTitle from "../../../components/SectionTitle";

const FeaturedSurvey = () => {
    const axiosSecure = useAxiosSecure()
    const [survey] = useSurvey()
    console.log(survey);
    const { data: votes = [] } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vote')
            return res.data;
        }
    })
    console.log(votes);


    // Function to count total votes (yes + no) for each survey
    const countVotesForSurveys = () => {
        // Create an object to store counts for each survey
        const surveyVoteCounts = {};

        // Iterate through the votes array
        votes.forEach(vote => {
            const { surveyId, query1, query2 } = vote;
            const lowerCaseQuery1 = query1.toLowerCase();
            const lowerCaseQuery2 = query2.toLowerCase();

            // Initialize counts if surveyId is not present in the object
            if (!surveyVoteCounts[surveyId]) {
                surveyVoteCounts[surveyId] = { total: 0 };
            }

            // Count votes based on query values
            if (lowerCaseQuery1 === 'yes') {
                surveyVoteCounts[surveyId].total++;
            } else if (lowerCaseQuery1 === 'no') {
                surveyVoteCounts[surveyId].total++;
            }

            if (lowerCaseQuery2 === 'yes') {
                surveyVoteCounts[surveyId].total++;
            } else if (lowerCaseQuery2 === 'no') {
                surveyVoteCounts[surveyId].total++;
            }
        });

        return surveyVoteCounts;
    };

    const surveyVoteCounts = countVotesForSurveys();
    console.log(surveyVoteCounts);


    const sortedSurveys = Object.entries(surveyVoteCounts)
        .map(([surveyId, counts]) => {
            const matchingSurvey = survey.find(item => item._id === surveyId)
            return {
                surveyId,
                name: matchingSurvey ? matchingSurvey.name : 'A helpful survey',
                total: counts.total,
            }
        })
        .sort((a, b) => b.total - a.total);
    console.log('sorted survey', sortedSurveys);


    return (
        <div className="md:mx-8 lg:mb-16">
            <SectionTitle heading='Most voted' subHeading='featured surveys'></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    sortedSurveys.slice(0, 6).map(item => <div key={item._id}>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl h-28  ">
                            <div className=" flex items-center justify-between p-4">
                                <div className="mb-8">
                                    <h2 className="card-title">{item?.name || 'Name not found'}</h2>
                                    <p>Total vote: {item.total}</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FeaturedSurvey;