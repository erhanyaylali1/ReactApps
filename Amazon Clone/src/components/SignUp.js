import React, { useState } from 'react';
import { message } from 'antd';
import { auth, db } from '../FirebaseConfig';
import { Link } from 'react-router-dom';
import './styles/Login.css';
import './styles/SignUp.css';
import { withRouter } from 'react-router-dom';

function SignUp(props) {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [name, setName] = useState('');
	const [username, setUsername] = useState('');
    const [address, setaddress] = useState('');
    const [number, setNumber] = useState('');
    

    const register = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const userId = user.user.uid;
            showMessage("Registered!","Registering...","success")
            .then(() => {
                db.collection('users').doc(userId).set({
                    userId,
                    username,
                    number,
                    name,
                    email,
                    password,
                    address
                });
            });
        })
		.catch((error) => showMessage(error.message,"Registering...","fail"))
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
        <div className="register">
            <Link to='/'>
				<img 
					className="login__logo"
					src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
					alt="brand-logo"
				/>
			</Link>
			<div className="login__container">
				<h1>Sign Up</h1>
				<form onSubmit={register}>
                    <h5>Name, Surname</h5>
					<input 
						type="text" 
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
                    <h5>Username</h5>
					<input 
						type="username" 
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
                    <h5>Phone Number</h5>
					<input 
						type="number" 
						value={number}
						onChange={(e) => setNumber(e.target.value)}
					/>
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
                    <h5>Address</h5>
					<input 
						type="text" 
						value={address}
						onChange={(e) => setaddress(e.target.value)}
					/>
					<button onClick={register}>
						Create
					</button>

				</form>
			</div>
        </div>
    )
}

export default withRouter(SignUp)
