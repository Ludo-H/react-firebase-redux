import React, { useRef, useState } from 'react';
import {auth} from '../utils/firebase.config'

const SignUp = () => {

    const [displayName, setDisplayName] = useState('')

    const registerEmail = useRef();
    const registerPassword = useRef();

    const handleRegister = (e)=>{
        e.preventDefault();

        try {
            auth.createUserWithEmailAndPassword(registerEmail.current.value, registerPassword.current.value)
            .then(async (userAuth)=>{
                await userAuth.user.updateProfile({
                    displayName : displayName
                })
                // on refraichi pour avoir le pseudo à la connexion (sinon displayname reste null dans firebase)
                window.location.reload()
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h3>S'inscrire</h3>
                <form onSubmit={(e)=>handleRegister(e)}>
                    <input
                        type="text"
                        placeholder='Pseudo'
                        onChange={(e)=>setDisplayName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        ref={registerEmail}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Mot de passe'
                        required
                        ref={registerPassword}
                    />
                    <input type="submit" value='Valider inscription' />
                </form>
            </div>
        </div>
    );
};

export default SignUp;