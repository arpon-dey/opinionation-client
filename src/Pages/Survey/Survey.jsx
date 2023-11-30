import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../components/SectionTitle";
import SurveyCard from "./SurveyCard";

const Survey = () => {
    const axiosPublic = useAxiosPublic()

    const { user } = useAuth()
    const { data: survey = [] } = useQuery({
        queryKey: ['survey', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            // cnsole.log(res.data);
            return res.data;
        }

    })


    const [sortBy, setSortBy] = useState(null);
    // const category = ['health', 'entertainment', 'food', 'technology', 'environment']

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };

    const sortSurveys = (survey, criteria) => {
        return [...survey].sort((a, b) => {
            if (criteria === 'name') {
                return a.name.localeCompare(b.name);
            }else if (criteria === 'category') {
                return a.category.localeCompare(b.category);
            }
            
            return 0;
        });
    };
    return (
        <div className="relative top-24">
            <SectionTitle heading='All survey' subHeading='choose survey to survey ☺️'> </SectionTitle>
            <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-4 ">
                <p>Filter by : </p>
                <button onClick={() => handleSort('name')} className="btn btn-sm btn-info text-white">name</button>
                <button onClick={() => handleSort('category')} className="btn btn-sm btn-success text-white">Category</button>
                <button className="btn btn-sm btn-warning text-white">vote</button>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {sortSurveys(survey, sortBy).map(item => (
                    <SurveyCard key={item._id} SurveyCard={item} />
                ))}
            </div>
        </div>
    )


};

export default Survey;