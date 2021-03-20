import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter, Link } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-center w-full h-screen">
            <form className="w-full max-w-screen-sm" onSubmit={onSubmitHandler}>
                <div className="bg-white shadow-lg rounded px-8 pt-8 pb-8 flex flex-col">
                    <h1 className="mb-6 text-3xl text-center font-bold">Sign In</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm" htmlFor="email">
                            Email:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="email" type="email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm" htmlFor="password">
                            Password:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600 mb-3"
                                id="password" type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
                        </label>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-1 rounded" type="submit">
                        Sign In
                    </button>
                    <div className="flex items-center justify-end">
                        <Link to="/forgotpassword" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-600">Forgot Password?</Link>
                    </div>
                </div>
            </form>
            <div className="text-gray-700 mt-6">
                Don't have an account? <Link to="/register" className="no-underline border-b border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600">Register Now</Link>.
            </div>

        </div>
    )
}

export default withRouter(LoginPage)