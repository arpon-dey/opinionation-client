import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllPayment = () => {
    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')


            return res.data;
        }
    })
    console.log(payments);
    
    return (
        <div>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Price</th>

                        <th>Trns. Id</th>
                        <th>Payment date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map((payment, index) => <tr key={payment._id}>
                            <td>{index + 1}</td>

                            
                            <td className="font-semibold text-md">
                                {payment.email}
                            </td>
                            <td className="font-semibold text-md">
                                {payment.price}
                            </td>
                            
                            <td className="font-semibold">
                            {payment.transactionId}

                            </td>
                            <th>
                                <button
                                    className="btn btn-error bg-teal-400 border-0 font-semibold text-white btn-xs">
                                    {payment.date.slice(0,10)}
                                </button>
                            </th>
                        </tr>)
                    }

                </tbody>


            </table>
        </div>
    </div>
    );
};

export default AllPayment;