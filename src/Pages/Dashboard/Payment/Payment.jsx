import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)

    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Pay to became pro user'}></SectionTitle>
            <div>
            <Elements stripe={stripePromise} >
                    <CheckoutForm></CheckoutForm>
                </Elements>
                </div>
        </div>
    );
};

export default Payment;