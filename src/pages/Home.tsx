import React from 'react';
import {Link} from "react-router-dom";

const Home = (props: { name: string }) => {
    let menu;

    if (props.name === '') {
        menu = (<p>You are not logged in</p>)
    } else {
        menu = (
            <ul>
                <li>
                    <Link to="/add_monument" className="nav-link">Add Monument</Link>
                </li>
            </ul>
        )
    }

    return (
        <div>
            {menu}
        </div>
    );
};

export default Home;