import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserFeedback = () => {
    const axiosSecure = useAxiosSecure()
    const { data: reports = [] } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/report')
            console.log(res.data);
            return res.data;
        }
    })

    const handleModal = () => {
        Swal.fire({
            icon: "info",
            html: reports.map((item) => `<div>${item.report}</div>`).join(''),
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: `<i className="fa fa-thumbs-up"></i> Okay`,
            cancelButtonColor: "#F0B20A",
            cancelButtonText: `Take action`,
          
        });
    };

    return (
        <div>

            <div className="overflow-x-auto ">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>No.</th>
                            <th>Email</th>
                            <th>Survey Id</th>
                            <th>Feedback</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((item, index) => <tr key={item._id}>

                                <td>{index + 1}</td>

                                <td className="font-semibold text-md">
                                    {item.reporterEmail}
                                </td>
                                <td className="font-semibold text-md">
                                    {item.surveyId}
                                </td>


                                <td className=" ">
                                    <button onClick={handleModal} className="btn btn-xs btn-success text-white"> See Feedback</button>

                                </td>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default UserFeedback;