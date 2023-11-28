import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { Legend, RadialBar, RadialBarChart, Tooltip } from 'recharts';
import Swal from 'sweetalert2';
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useSurveyor from '../../Hooks/useSurveyor';

const SurveyDetails = () => {
    const survey = useLoaderData()

    const { user } = useAuth()
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [like, setLike] = useState(12)
    const [dislike, setDislike] = useState(9)

    const { register, handleSubmit, reset } = useForm()
    const [showChart, setShowChart] = useState(false);
    const [comment, setComment] = useState([]);
    const [isAdmin] = useAdmin()
    const [isSurveyor] = useSurveyor()

    const { refetch, data: vote = [] } = useQuery({
        queryKey: ['vote', user?.email, survey?._id],

        queryFn: async () => {
            const res = await axiosSecure.get(`/vote?email=${user?.email}&surveyId=${survey?._id}`)
            return res.data;
        }
    })


    const { data: userRole = [] } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user-role')


            return res.data;
        }
    })
    console.log('user-role is ', userRole.role);


    const hasVotedForSurvey = vote.some(v => v.surveyId === survey._id && v.voterEmail === user?.email);

    const onSubmit = async (data) => {
        if (isAdmin || isSurveyor) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'Admins and Surveyors cannot participate in the survey',
                timer: 2000,
            });
            return;
        }
        if (hasVotedForSurvey) {
            setShowChart(true);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: false,
                text: "You already voted",
                timer: 1000

            });
            return;
        }
        const time = new Date();
        const formattedTime = time.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        const surveyItem = {
            surveyId: survey._id,
            surveyorName: user.displayName,
            query1: data.query1,
            query2: data.query2,
            voterEmail: user?.email,
            time: formattedTime
        }
        console.log(surveyItem);

        const surveyRes = await axiosSecure.post('/vote', surveyItem)
        console.log(surveyRes.data);

        if (surveyRes.data.insertedId) {
            reset()
            refetch()
            setShowChart(true);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'survey added to the menu successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    const voteCounts = vote.reduce((counts, voter) => {
        const lowerCaseQuery1 = voter.query1.toLowerCase();
        const lowerCaseQuery2 = voter.query2.toLowerCase();

        const surveyId = voter.surveyId;
        if (!counts[surveyId]) {
            counts[surveyId] = { yes: 0, no: 0 };
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

        return counts;
    }, {});
    console.log('Vote Counts:', voteCounts);
    const targetSurveyId = survey._id;
    let targetYesCount = 0;
    let targetNoCount = 0;
    if (voteCounts[targetSurveyId]) {

        targetYesCount = voteCounts[targetSurveyId].yes;
        targetNoCount = voteCounts[targetSurveyId].no;
    }
    console.log(targetYesCount);
    console.log(targetNoCount);

    const data = [
        {
            "name": "no",
            "uv": targetNoCount,
            "fill": "#F67F0E"
        },
        {
            "name": "yes",
            "uv": targetYesCount,
            "fill": "#0ACF58"
        },

    ]



    // comment post and load

    const handleCommentSubmit = async (e) => {
        if (!isProUser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'Admins and Surveyors cannot comment',
                timer: 2000,
            });
            return;
        }
        e.preventDefault();
        const form = e.target
        const comment = form.comment.value
        const surveyComment = {
            surveyId: survey._id,
            comment: comment
        }
        const res = await axiosSecure.post('/comment', surveyComment)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Comment added',
                showConfirmButton: false,
                timer: 1500
            });
            
        }
    }
    const handleReportSubmit = async (e) => {

        e.preventDefault()
        const form = e.target
        const report = form.report.value
        const userReport = {
            report: report,
            reporterEmail: user.email,
            surveyId: survey._id

        }

        const res = await axiosSecure.post('/report', userReport)
        if (isAdmin || isSurveyor) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'Admins and Surveyors cannot report',
                timer: 2000,
            });
            return;
        }
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'report added',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    useEffect(() => {
        axiosSecure.get('/comment')
            .then((res) => {
                setComment(res.data);
            });
    }, []);

    const isProUser = userRole.role === 'proUser'
  
    const [reaction, setReaction] = useState(null);
    const handleReaction = (type) => {
        if (type === 'like' && !reaction) {
            setLike(like + 1);
        } else if (type === 'dislike' && !reaction) {
            setDislike(dislike + 1);
        }
        setReaction(type);
    };


    return (
        <div className='relative pt-24   mx-16'>
            <div className="card   lg:card-side bg-base-100 shadow-xl">
                <figure><img src={survey.image} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{survey.name}</h2>
                    <p>{survey.description}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <p className='border rounded-md p-2 flex justify-between '>
                                {survey.query1}
                                <select defaultValue='default'  {...register("query1", { required: true })}
                                    className="select select-success select-xs  ">
                                    <option disabled value='default'>vote</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </p>
                        </div>
                        <div className='mt-2'>
                            <p className='border rounded-md p-2 flex justify-between '>
                                {survey.query2}
                                <select defaultValue='default'  {...register("query2", { required: true })}
                                    className="select select-success select-xs  ">
                                    <option disabled value='default'>vote</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </p>
                        </div>



                        <div className="card-actions justify-end">
                            <input type="submit"
                                className="btn bg-teal-500 mt-2  hover:bg-teal-600 text-white font-semibold" value='submit' />
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex my-16'>
                <div className='w-4/12'>

                    <div className=' flex justify-between items-center mb-4'>
                        <p className='text-xl  font-semibold bg-slate-200  p-2 rounded-lg '>Give reaction</p>
                        <div>
                            <button
                                onClick={() => handleReaction('like')}
                                className={`btn text-white btn-success btn-sm mr-2 ${reaction === 'like' && 'disabled'}`}
                                disabled={reaction === 'like'}
                            >
                                Like {like}
                            </button>
                            <button
                                onClick={() => handleReaction('dislike')}
                                className={`btn text-white btn-warning btn-sm ${reaction === 'dislike' && 'disabled'}`}
                                disabled={reaction === 'dislike'}
                            >
                                Dislike {dislike}
                            </button>
                        </div>
                    </div>
                    <div className='mb-6 '>
                        <form className='flex gap-4' onSubmit={handleCommentSubmit}>
                            <input type="text" name='comment' placeholder="Add comment if you are pro" className="input input-bordered w-full " required />
                            <input disabled={!isProUser} type="submit" className='btn btn-info' value="comment" />
                        </form>
                    </div>
                    <h1 className='text-xl  font-semibold bg-slate-200 w-4/12 p-2 rounded-lg mb-4'>Comments</h1>

                    <div className='border-2 border-black rounded-lg p-8'>
                        {comment
                            ?.filter((comment) => comment.surveyId === survey._id)
                            .map((comment, index) => (
                                <p key={index}>{`${index + 1}. ${comment.comment}`}</p>
                            ))}
                    </div>
                </div>


                <div className='w-8/12'>
                    <div className='ml-8 mb-2'>
                        <form className='flex gap-4' onSubmit={handleReportSubmit}>
                            <input type="text" name='report' placeholder="Report to this survey with feedback" className="input input-bordered w-full mb-2" required />
                            <input type="submit" className='btn btn-warning' value="Report" />
                        </form>
                    </div>
                    {showChart ?
                        <div>
                            <p className=' text-xl ml-8 font-semibold bg-slate-200 w-3/12 p-2 rounded-lg '>Result of survey</p>
                            <RadialBarChart
                                width={700}
                                height={250}
                                innerRadius="30%"
                                outerRadius="90%"
                                data={data}
                                startAngle={90}
                                endAngle={-180}
                            >
                                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                                <Legend iconSize={10} width={200} height={140} layout='vertical' verticalAlign='middle' align="right" />
                                <Tooltip />
                            </RadialBarChart>
                        </div> : <div><p className=' text-xl ml-8 font-semibold bg-slate-200  p-2 rounded-lg '>Result of survey</p></div>
                    }
                </div>
            </div>

        </div>
    );
};

export default SurveyDetails;