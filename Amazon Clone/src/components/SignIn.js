import React, { useState } from 'react';
import './styles/Login.css';
import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import 'antd/dist/antd.css';

const SignIn = (props) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signInFunc = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
        .then(() => showMessage("Signed In","Signing...","success"))
		.catch((error) => showMessage(error.message,"Signing...","fail"))
	}

    const showMessage = async (op2, op1, situation) => {
        const key = "updatable";
        message.loading({ content: op1, key });
        setTimeout(() => {  
            if(situation === "success"){
                message.success({ content: op2, key , duration: 1 });
                setTimeout(() => {
                    props.history.push('/');
                },500)
            } else {
                message.error({ content: op2, key, duration: 3 });
            }
        }, 1000);
    }

	return (
		<div className="login">
			<Link to='/'>
				<img 
					className="login__logo"
					src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
					alt="brand-logo"
				/>
			</Link>
			<div className="login__container">
				<h1>Sign In</h1>
				<form onSubmit={signInFunc}>
					<h5>E-Mail</h5>
					<input 
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input 
						type="password" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button  
						className="signIn__button" 
						type="submit"
						onClick={signInFunc}					
					>
                        Sign In
                    </button>
					<p>
						By signing-in you are agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and out Interest Based Ads Notice.
					</p>
					<a className="register__button" href="/signup">
						Create your Amazon Account
					</a>

				</form>
			</div>
		</div>
	);
}
export default withRouter(SignIn)