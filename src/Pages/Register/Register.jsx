import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import signup from '../../assets/logup/signups.png';

const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser, googleSignIn } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser);
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,


                        }
                        axiosPublic.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "Updated profile and user created",
                                        icon: "success"
                                    });
                                    navigate('/')

                                }
                            })

                    })
                    .catch(error => console.log(error.message))

            })
    }

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            if (res.user) {
                reset()
                Swal.fire({
                    title: "Good job!",
                    text: "Google login successfull",
                    icon: "success"
                });
                navigate('/')

            }
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    return (
        <div className='absolute '>
        <div className="hero  my-24">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-7/12">
                    <img src={signup} className='w-10/12' alt="" />
                </div>
                <div className="card px-4 py-4 w-full max-w-sm shadow-2xl bg-base-100">
                <div className='flex gap-4 justify-center my-4'>
                        <Link to='/login' className='btn btn-success w-40  text-white font-semibold'>Login</Link>
                        <Link to='/signUp' className='btn btn-accent w-40  text-white font-semibold'>Register</Link>
                    </div>
                    <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">

                            <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
                            {errors.name?.type === "required" && (
                                <p className='text-red-600'>Name is required</p>
                            )}
                        </div>
                        <div className="form-control">

                            <input type="text" {...register("photoURL", { required: true })} name='photoURL' placeholder="photoURL" className="input input-bordered" />
                            {errors.photoURL?.type === "required" && (
                                <p className='text-red-600'>photoURL is required</p>
                            )}
                        </div>
                        <div className="form-control">

                            <input type="email" {...register("email")} name='email' placeholder="email" className="input input-bordered" />
                            {errors.email?.type === "required" && (
                                <p className='text-red-600'>Email is required</p>
                            )}
                        </div>

                        <div className="form-control">

                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/,
                            })} name='password' placeholder="password" className="input input-bordered" required />
                            {errors.password?.type === "required" && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === "minLength" && <p className='text-red-600'>Password must be 6 characters</p>}
                            {errors.password?.type === "maxLength" && <p className='text-red-600'>Password must be under 20 characters</p>}
                            {errors.password?.type === "pattern" && <p className='text-red-600'>Password must have one uppercase, one lower case, and one number and one special character.</p>}


                        </div>

                        <div className="form-control mt-6">
                            <input type="submit" value="Register" className="btn bg-emerald-500" />

                        </div>
                        <button onClick={handleGoogleSignIn} className=' btn btn-block bg-cyan-500'>Google sign in</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;