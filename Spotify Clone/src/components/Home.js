import React from 'react'
import './styles/Home.css';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';

const Home = () => {

	return (
		<div className="home">
            <div className="home__body">
                <Sidebar />
                <Body />
            </div>            
            <Footer />
		</div>
	)
}

export default Home