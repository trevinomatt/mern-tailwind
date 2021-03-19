import React from 'react';
import { Link } from 'react-router-dom';
import { TailwindNavbar } from 'tailwind-navbar-react';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(props) {
    const links = [
        {
            name: "Sign In",
            link: "/login"
        },
        {
            name: "Sign Up",
            link: "/register"
        }
    ];

    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed');
            }
        });
    }

    if(user.userData && !user.userData.isAuth) {
        return (
            <TailwindNavbar
                brand={
                    <img
                    src="https://media.discordapp.net/attachments/694834406493257762/729067815499202651/matthew_border.png"
                    width="40"
                    height="40"
                    alt="Brand logo"
                    />
                }
                className="py-1"
            >
                <nav>
                    <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0">
                        {links.map(link => {
                            return (
                            <li key={link.name.toString()}>
                                <Link to={link.link} className="block px-0 py-3 border-b border-transparent lg:p-4 hover:border-white transition-all duration-200">{link.name}</Link>
                            </li>
                            );
                        })}
                    </ul>
                </nav>
            </TailwindNavbar>
        )
    } else {
        return (
            <TailwindNavbar
                brand={
                    <img
                    src="https://media.discordapp.net/attachments/694834406493257762/729067815499202651/matthew_border.png"
                    width="40"
                    height="40"
                    alt="Brand logo"
                    />
                }
                className="py-1"
            >
                <nav>
                    <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0">
                        <a href="/login" onClick={logoutHandler} className="block px-0 py-3 border-b border-transparent lg:p-4 hover:border-white transition-all duration-200">Logout</a>
                    </ul>
                </nav>
            </TailwindNavbar>
        )
    }


}

export default withRouter(NavBar);
