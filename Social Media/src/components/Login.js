import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Form, Input } from 'antd';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

const Login = () => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item xs={1} lg={3}/>
				<Grid item xs={10} lg={6}>
					<Typography variant="body1" align="center" className={classes.login}>
						Login
					</Typography>
					<Divider />
					<Form className={classes.form}>
						<Form.Item
							className={classes.formInput}
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input 
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							className={classes.formInput}
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password 
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Item>

						<Form.Item className={classes.button}>						
							<Button variant="contained" size="medium" color="primary" htmlType="submit">
								Register
							</Button>
						</Form.Item>
					</Form>
					<Divider horizontal>OR</Divider>
					<Typography align="center" varianth="body1" className={classes.register}>
						New To Socialony?
					</Typography>
					<Typography align="center" varianth="body1" className={classes.link}>
						<Link to="/register">
							Create an Account
						</Link>
					</Typography>
				</Grid>
				<Grid item xs={1} lg={3}/>
			</Grid>
		</div>
	)
}

export default Login


const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "50px"
	},
	formInput: {
		marginBottom: "25px"
	},
	login: {
		fontSize: "2rem",
		color: "#555555",
		fontWeight: "700"
	},
	form: {
		paddingTop: "15px"
	},
	button: {
		textAlign: "end"
	},
	register: {
		marginTop: "30px",
		fontSize: "1.5rem"
	},
	link: {
		marginTop: "10px",
		fontSize: "1.3rem"
	}
}));