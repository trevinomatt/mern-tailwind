import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../_actions/user_action';
import { withRouter, Link } from 'react-router-dom';

function ForgotPasswordPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);
    const [showNullError, setShowNullError] = useState(false);
    const [messageFromServer, setMessageFromServer] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onSendEmailHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email
        }

        if (Email === '') {
            setMessageFromServer('');
            setShowError(false);
            setShowNullError(true);
        } else {
            dispatch(forgotPassword(body))
                .then(response => {
                    if (response.payload.sentEmailSuccess) {
                        setShowError(true);
                        setMessageFromServer(response.payload.message);
                    } else {
                        setShowError(false);
                        setMessageFromServer(response.payload.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-center w-full h-screen">
            <form className="w-full max-w-screen-sm" onSubmit={onSendEmailHandler}>
                <div className="bg-white shadow-lg rounded px-8 pt-8 pb-8 flex flex-col">
                    <h1 className="mb-6 text-3xl text-center font-bold">Forgot Password</h1>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm" htmlFor="email">
                            Email:
                            <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mt-2 text-gray-600"
                                id="email" type="email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                        </label>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-1 rounded" type="submit">
                        Forgot Password
                    </button>
                </div>
            </form>
            {showNullError && (
                <div className="text-red-500 mt-6">
                    The email address cannot be null.
                </div>
            )}
            {showError && (
                <div className="text-red-500 mt-6">
                    That email address isn't recognized. Please try again or register for a new account. <Link to="/register" className="no-underline border-b border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600">Register Now</Link>
                </div>
            )}
            {messageFromServer === 'Recovery email sent.' && (
                <div className="text-gray-700 mt-6">
                    Password Rest Email Successfully Sent!
                </div>
            )}
            <Link to="/" className="no-underline text-blue-500 hover:text-blue-600 mt-6">Go Home</Link>

        </div>
    )
}

export default withRouter(ForgotPasswordPage)