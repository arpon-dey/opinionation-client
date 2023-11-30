import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import payment from '../../../assets/others/payment.jpg';
import SectionTitle from "../../../components/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)

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