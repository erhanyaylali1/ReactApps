import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Button } from 'antd';
import { Divider } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

const Login = (props) => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const onFinish = ({email, password}) => {
        axios({
            method: 'post',
            url: "https://us-central1-socialony.cloudfunctions.net/api/login",
            headers: {}, 
            data: {
                email,
                password
            }
        })
        .then((user) => {
            dispatch(login(user.data));
            props.history.push("/");
        })
        .catch((e) => console.log(e));
    };


	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item xs={1} lg={3}/>
				<Grid item xs={10} lg={6}>
					<Typography variant="body1" align="center" className={classes.login}>
						Login
					</Typography>
					<Divider />
					<Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        className={classes.form}
                        onFinish={onFinish}
                    >
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
                            <Button type="primary" htmlType="submit">
                                Submit
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

export default withRouter(Login)


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