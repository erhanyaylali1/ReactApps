import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import Login from './Login'
import Loading from '../components/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

	const [user, loading] = useAuthState(auth)

	useEffect(() => {
		if(user) {
			db.collection('users').doc(user.uid).set({
				email: user.email,
				lastSeen: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
				photoUrl: user.photoURL
			}, { merge: true })
		}
	},[user])

	if(loading) return <Loading />
	if(!user) return <Login />
    return <Component {...pageProps} />
}

export default MyApp