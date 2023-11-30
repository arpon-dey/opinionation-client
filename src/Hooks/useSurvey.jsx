import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSurvey = () => {
    const axiosSecure = useAxiosSecure()

    const {data: survey = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['survey'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/survey')
            // console.log('Survey Data:', res.data);
            return res.data;

        }
    })

    return [survey, loading,refetch ]
};

export default useSurvey;