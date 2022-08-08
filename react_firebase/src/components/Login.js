import React, { useRef, useState } from 'react';
import { auth } from '../utils/firebase.config';
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {

    const [error, setError] = useState(false)

    const loginEmail = useRef()
    const loginPassword = useRef()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail.current.value, loginPassword.current.value);

            console.log(user)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h3>Se connecter</h3>
                <form className='form-login' onSubmit={(e)=>handleSubmit(e)}>
                    <input type="email" placeholder='Email' ref={loginEmail} required />
                    <input type="password" placeholder='Mot de passe' ref={loginPassword} required />
                    <input type="submit" value='Se connecter' />
                    <span>{error && "Mail ou mot de passe incorrect(s)"}</span>
                </form>
            </div>
        </div>
    );
};

export default Login;