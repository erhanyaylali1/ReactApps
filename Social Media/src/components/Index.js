import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../features/userSlice';

const Index = () => {

    const user = useSelector(getUser);  

    return (
		<div>
			{`${user?.name} WELCOME`}
		</div>
	)
}

export default Index