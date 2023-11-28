import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useSurvey from '../../../Hooks/useSurvey';
import SectionTitle from '../../../components/SectionTitle';

const MostVoted = () => {

    const axiosSecure = useAxiosSecure()
    const [survey] = useSurvey()
    console.log(survey);
    const { data: vote = [], } = useQuery({
        queryKey: ['vote'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vote')
            return res.data;
        }
    })


    const getSurveyVoteCounts = () => {
        return vote.reduce((counts, v) => {
            const { surveyId, query1, query2 } = v;
            const lowerCaseQuery1 = query1.toLowerCase();
            const lowerCaseQuery2 = query2.toLowerCase();

            if (!counts[surveyId]) {
                const matchingSurvey = survey.find(item => item._id === surveyId);
                counts[surveyId] = { name: matchingSurvey ? matchingSurvey.name : ' ', yes: 0, no: 0, total: 0 };
            }

            if (lowerCaseQuery1 === 'yes') {
                counts[surveyId].yes++;
            } else if (lowerCaseQuery1 === 'no') {
                counts[surveyId].no++;
            }

            if (lowerCaseQuery2 === 'yes') {
                counts[surveyId].yes++;
            } else if (lowerCaseQuery2 === 'no') {
                counts[surveyId].no++;
            }

            counts[surveyId].total = counts[surveyId].yes + counts[surveyId].no;
            return counts;
        }, {});
    };

    const [surveyVoteCounts, setSurveyVoteCounts] = useState(getSurveyVoteCounts());

    useEffect(() => {
        setSurveyVoteCounts(getSurveyVoteCounts());
    }, [vote]);
    console.log(surveyVoteCounts);


    const sortedSurveys = Object.entries(surveyVoteCounts)
        .map(([surveyId, counts]) => ({
            surveyId,
            yes: counts.yes,
            name: counts.name,
            no: counts.no,
            total: counts.total,
        }))
        .sort((a, b) => b.total - a.total);
    console.log(sortedSurveys);

    return (
        <div className='mb-8'>
            <SectionTitle heading='Most voted' subHeading='interactive'></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {sortedSurveys.slice(0,6).map((surveyItem) => (
                    <div key={surveyItem._id} className="card w-96   bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{surveyItem?.name ? surveyItem.name : 'Name is coming'}</h2>
                            <p>Total vote: {surveyItem.total}</p>

                            <div className="card-actions justify-end">
                                <Link to={`/survey/${surveyItem?._id}`} className="btn btn-accent">Join in survey</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
};

export default MostVoted;