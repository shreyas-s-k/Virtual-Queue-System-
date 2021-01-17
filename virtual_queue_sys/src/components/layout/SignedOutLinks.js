import React from 'react';
const SignedOutLinks = () => {
    return (
        <ul className="list-inline py-1 my-1">
            <li className="list-inline-item mx-2"><a className="navigation" href='/signin'><button type="button" className="btn btn-outline-light">Sign In</button></a></li>
            <li className="list-inline-item mx-2"><a className="navigation" href='/signup'><button type="button" className="btn btn-outline-light">Sign Up</button></a></li>

        </ul>

    )
}
export default SignedOutLinks;