import React, { useContext, useState } from 'react';
import { userContext } from '../../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import BasicButton from '../../Components/BasicButton';
import { saveUser } from '../../Config/SaveUser';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { createUser, updateUserDetails, setLoading, signInWithGoogle } = useContext(userContext)
    const navigate = useNavigate()
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);


    if (token) {
        navigate('/');
    }

    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target.name.value
        const role = event.target.role.value;
        const email = event.target.email.value
        const password = event.target.password.value

        // Image Upload
        const image = event.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB}`

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                // Create User
                createUser(email, password)
                    .then(result => {
                        saveUser(result.user, role);
                        updateUserDetails(name, imageData.data.display_url)
                            .then(() => {
                                toast.success('Registration Successfull')
                                navigate('/login');
                            })
                            .catch(err => console.log(err))
                    })

                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                    })
            })
            .catch(err => console.log(err))
    }



    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                saveUser(result.user);
                setCreatedUserEmail(result.user.email);
            })
    }

    return (
        <div className='flex justify-center items-center py-8'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Signup</h1>
                    <p className='text-sm text-gray-400'>Create a new account</p>
                </div>
                <form
                    className='space-y-12 ng-untouched ng-pristine ng-valid'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                required
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label className='block mb-2 text-sm'>
                                You Want to Buy or Sale?
                            </label>
                            <select name='role' defaultValue={'buyer'} className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'>
                                <option value="buyer" selected>I Want to Buy</option>
                                <option value="seller" >I Want to Sale</option>
                            </select>
                        </div>



                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='password' className='text-sm'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            <BasicButton>Signup</BasicButton>
                        </div>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Log in with Google
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleLogin} className='flex justify-center space-x-4'>
                    <button className='p-3 rounded-sm'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 32 32'
                            className='w-5 h-5 fill-current'
                        >
                            <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
                        </svg>
                    </button>
                </div>
                <p className='px-6 text-sm text-center text-accent'>
                    Already have an account yet?{' '}
                    <Link to='/login' className='hover:underline text-primary'>
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Signup;