import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSurvey = () => {
    const axiosSecure = useAxiosSecure()

    const {data: survey = [], isPending: loading, refetch} = useQuery({
        queryKey: ['survey'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/survey')
            return res.data;

        }
    })

    return [survey, loading,refetch ]
};

export default useSurvey;