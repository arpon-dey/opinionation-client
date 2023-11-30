import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [ sortedUsers, setSortedUsers] = useState([])
  

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')


            return res.data;
        }
    })


    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                console.log('make admin', res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", `User ${user.name} has been made an Admin`, 'success', 1500);
                    refetch()
                }
            })
    }
    const handleMakeSurveyor = (user) => {
        axiosSecure.patch(`users/surveyor/${user._id}`)
            .then(res => {
                console.log('make surveyor', res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", `User ${user.name} has been made an Surveyor`, 'success', 1500);
                    refetch()
                }
            })
    }


    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleFilter = () => {
        // Define the order of roles
        const roleOrder = ['admin', 'proUser', 'user', 'surveyor'];

        // Sort users based on their roles
        const sortedUsers = users.slice().sort((a, b) => {
            const roleA = roleOrder.indexOf(a.role) !== -1 ? roleOrder.indexOf(a.role) : Infinity;
            const roleB = roleOrder.indexOf(b.role) !== -1 ? roleOrder.indexOf(b.role) : Infinity;
            return roleA - roleB;
        });

        console.log(sortedUsers);
        setSortedUsers(sortedUsers)
    };
    


    return (
        <div>
            <SectionTitle heading='users' subHeading='all users'></SectionTitle>
            <div className="flex justify-end ">
                <button onClick={handleFilter} className="btn btn-info btn-sm text-gray-100">Filter <FaAngleDown></FaAngleDown></button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>

                            <th>Give Role</th>
                            <th>Current role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user, index) => (
                                <tr key={user._id}>
                                <td>{index + 1}</td>

                                <td className="font-semibold text-md">
                                    {user.name}
                                </td>
                                <td className="font-semibold text-md">
                                    {user.email}
                                </td>
                                <td className="font-semibold">
                                    {user.role ? user.role :

                                        <><button className="btn btn-xs btn-success mr-2" onClick={() => handleMakeAdmin(user)}>
                                            admin
                                        </button>
                                            <button className="btn btn-xs btn-warning " onClick={() => handleMakeSurveyor(user)}>
                                                surveyor
                                            </button>
                                        </>
                                    }
                                </td>
                                <td className="font-semibold">

                                    {user.role ? user.role : 'User'}

                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-error bg-red-400 font-semibold text-white btn-xs">
                                        delete
                                    </button>
                                </th>
                            </tr>
                            ))
                        ) : (
                            // If sortedUsers is empty, render the original unsorted users
                            users.map((user, index) => (
                                <tr key={user._id}>
                                <td>{index + 1}</td>

                                <td className="font-semibold text-md">
                                    {user.name}
                                </td>
                                <td className="font-semibold text-md">
                                    {user.email}
                                </td>
                                <td className="font-semibold">
                                    {user.role ? user.role :

                                        <><button className="btn btn-xs btn-success mr-2" onClick={() => handleMakeAdmin(user)}>
                                            admin
                                        </button>
                                            <button className="btn btn-xs btn-warning " onClick={() => handleMakeSurveyor(user)}>
                                                surveyor
                                            </button>
                                        </>
                                    }
                                </td>
                                <td className="font-semibold">

                                    {user.role ? user.role : 'User'}

                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-error bg-red-400 font-semibold text-white btn-xs">
                                        delete
                                    </button>
                                </th>
                            </tr>
                            ))
                        )}
                       

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllUsers;