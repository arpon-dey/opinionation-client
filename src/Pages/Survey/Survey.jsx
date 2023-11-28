import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../components/SectionTitle";
import SurveyCard from "./SurveyCard";

const Survey = () => {
    const axiosPublic = useAxiosPublic()

    const { user } = useAuth()
    const {  data: survey = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            // cnsole.log(res.data);
            return res.data;
        }

    })

    return (
        <div className="relative top-24">
            <SectionTitle heading='All survey' subHeading='choose survey to survey ☺️'> </SectionTitle>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'> 
            {
                survey.map(item=><SurveyCard key={item._id} SurveyCard={item}></SurveyCard>)
            }
        </div>
        </div>
        )


};

export default Survey;