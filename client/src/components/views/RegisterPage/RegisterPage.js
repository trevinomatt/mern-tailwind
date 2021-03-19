import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter, Link } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNamedHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('Password and ConfirmPassword should be equal.');
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to Sign Up Error')
                }
            })

    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-center w-full h-screen">
            <form className="w-full max-w-screen-sm" onSubmit={onSubmitHandler}>
                <div className="bg-white shadow-lg rounded px-8 pt-8 pb-8 flex flex-col">
                    <h1 className="mb-6 text-3xl text-center font-bold">Sign Up</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm" htmlFor="email">
                            Email:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="email" type="email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm" htmlFor="name">
                            Name:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="name" type="text" placeholder="Name" value={Name} onChange={onNamedHandler} />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm" htmlFor="password">
                            Password:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="password" type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm" htmlFor="confirm-password">
                            Confirm Password:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="confirm-password" type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                        </label>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                        Create Account
                    </button>
                </div>
            </form>
            <div className="text-gray-700 mt-6">
                Already have an account? <Link to="/login" className="no-underline border-b border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600">Log in</Link>.
            </div>
        </div>
    )
}

export default withRouter(RegisterPage);