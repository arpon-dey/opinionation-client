import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import login from '../../assets/logup/login.png';
const Login = () => {
    const { signIn, googleSignIn } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    const from = location.state?.from?.pathname || '/'


    const handleLogin = (e) => {
        e.preventDefault();
        console.log('login');
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log({ email, password });
        signIn(email, password)
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser);
                navigate(from, { replace: true })
            })

    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })
                if (res.user) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Google login successfull",
                        icon: "success"
                    });
                    navigate('/')

                }
            })
            .catch((err) => {
                console.error(err)
            })
    }




    return (
        <div className='relative '>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row p-8">
                    <div className="w-7/12">
                        <img src={login} className='w-10/12' alt="" />
                    </div>
                    <div className="card  w-full max-w-sm shadow-2xl p-8 bg-base-100">

                        <div className='flex gap-4 justify-center my-4'>
                            <Link to='/login' className='btn btn-success w-40  text-white font-semibold'>Login</Link>
                            <Link to='/signUp' className='btn btn-accent w-40  text-white font-semibold'>Register</Link>
                        </div>
                        <form className="card-body " onSubmit={handleLogin}>
                            <div className="form-control">

                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">

                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn bg-emerald-400" />

                            </div>
                            <button onClick={handleGoogleSignIn} className=' btn btn-block bg-teal-400'>Google sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;