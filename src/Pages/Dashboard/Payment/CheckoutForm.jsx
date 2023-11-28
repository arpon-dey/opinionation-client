import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAdmin from '../../../Hooks/useAdmin';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useSurveyor from '../../../Hooks/useSurveyor';

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [isAdmin] = useAdmin()
    const [isSurveyor] = useSurveyor()
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: userRole = [] } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user-role')


            return res.data;
        }
    })
    console.log('user-role is ', userRole.role);
    const isProUser = userRole.role === 'proUser'
  
   
    
    


    const totalPrice = 500



    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirmation error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                await axiosSecure.patch(`/users/proUser/${user.email}`)
                    .then(res => {
                        console.log('make proUser', res.data)
                        if (res.data.modifiedCount > 0) {
                            console.log(`User ${user.name} has been made a Pro user`);
                        }
                    })
                    .catch(error => {
                        console.error('Error updating user role:', error);
                    });
            } else {
                console.log(error);
            }

            //now save the payment in the database.
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: 'pending',

            }
            const res = await axiosSecure.post('/payments', payment)
            console.log(res.data);
            if (res.data?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment done successfully ",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form w-1/2 mx-auto ">

                <div className='  ' id="card-element">
                    <CardElement
                        className='bg-gradient-to-b from-slate-600 to-slate-400 p-4 rounded-lg'
                        options={{

                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#ffffff',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>


                <div>
                    <button  className='btn btn-success btn-sm my-4' disabled={!stripe || !clientSecret || isProUser || isAdmin || isSurveyor} type="submit" >
                        Pay
                    </button>
                </div>
            </div>


            {/* disabled={!stripe || !clientSecret } */}

            <p className='text-red-500'>{error}</p>
            <p  className='text-teal-500 text-2xl font-semibold '>Trns id: {transactionId}</p>
        </form>
    );
};

export default CheckoutForm;