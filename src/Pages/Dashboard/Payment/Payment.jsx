import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import payment from '../../../assets/others/payment.jpg';
import SectionTitle from "../../../components/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)



    const { data: gems = [] } = useQuery({
        queryKey: ['gems'],
        queryFn: async () => {
            const res = await axiosPublic.get('/vote')
            return res.data;
        }

    })
    console.log('gems: ', gems);

    const userGemsObjects = gems.filter(item => item.voterEmail === user?.email);
    console.log('User Gems Objects: ', userGemsObjects);
    const userGemsValues = userGemsObjects.map(item => item.gems ?? 0);
    console.log('User Gems Values: ', userGemsValues);
    const totalUserGemsValue = userGemsValues.reduce((total, value) => total + value, 0);
    console.log('Total User Gems Value: ', totalUserGemsValue);
  

    const handleMadeProUser = async () => {
        if (totalUserGemsValue >= 50) {
            await axiosSecure.patch(`/users/proUser/${user.email}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Congratulations!',
                            text: `You are now a Pro user with ${totalUserGemsValue} gems!`,
                        });
                        console.log(`User ${user.name} has been made a Pro user`);
                    }
                })
                .catch(error => {
                    console.error('Error updating user role:', error);
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Insufficient Gems',
                text: `You need at least 50 gems to become a Pro user. Current gems: ${totalUserGemsValue}`,
            });
        }
    };
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Pay to became pro user'}></SectionTitle>
            <div>
                <div className="mb-8">
                    <div className="card md:card-side  bg-gradient-to-b from-teal-600 to-gray-800  shadow-xl">
                        <figure className="md:w-5/12"><img src={payment} className="w-96 rounded-xl" alt="Movie" /></figure>
                        <div className="card-body text-white md:w-7/12">
                            <h2 className="card-title">Upgrade to Pro Membership: Unlock Exclusive Benefits!</h2>
                            <p className="text-slate-200">Unlock exclusive benefits, early survey access, and an ad-free interface with Pro Membership. Support our community growth and enjoy a seamless, enhanced platform experience. Upgrade now for premium features and make your voice count!</p>
                            <div className="card-actions md:justify-end">
                                <button className="btn btn-info text-2xl text-white">Pay : $500</button>
                                <button onClick={handleMadeProUser} className="btn  bg-yellow-500 border-0 text-2xl text-black">Use 50 💎</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Elements stripe={stripePromise} >
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;