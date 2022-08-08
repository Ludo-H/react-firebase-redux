import React, {useEffect, useState} from 'react';
import ConnectModal from './components/ConnectModal';
import CreatePost from './components/CreatePost';
import {onAuthStateChanged, signOut} from "firebase/auth";
import { auth} from "./utils/firebase.config";


import Post from './components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './actions/post.action';

const App = () => {

  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const posts = useSelector((state)=> state.postReducer)

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
  })

  const handleLogout = async ()=>{
    await signOut(auth)
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [])
  
  

  return (
    <div>
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={()=>handleLogout()}><i className='fa-solid fa-arrow-right-from-bracket'></i></button>
          </div>
        )}
        {user ? (<CreatePost uid={user.uid} displayName={user.displayName}/>) : (<ConnectModal/>)}
      </div>
      <div className="posts-container">
        {posts.length > 0 && (
          posts
          .sort((a, b)=> b.date - a.date)
          .map((post)=>(
            <Post post={post} key={post.id} user={user}/>
          ))
        )}
      </div>
    </div>
  );
};

export default App;