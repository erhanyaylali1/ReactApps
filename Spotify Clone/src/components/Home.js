import React from 'react'
import './styles/Home.css';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../features/userSlice';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';

const Home = ({ spotify }) => {

    const user = useSelector(getUserInfo);
	return (
		<div className="home">
            <div className="home__body">
                <Sidebar />
                <Body/>
            </div>            
            <Footer />
		</div>
	)
}

export default Home