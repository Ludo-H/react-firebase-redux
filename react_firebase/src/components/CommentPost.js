import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { auth} from '../utils/firebase.config';
import CommentCard from './CommentCard';
import { useDispatch } from 'react-redux';
import { addComment } from '../actions/post.action';

const CommentPost = ({post}) => {

    const [user, setUser] = useState(null)

    const commentContent = useRef()

    const dispatch = useDispatch()

    const handleComment =  (e)=>{
        e.preventDefault();

        let data = [];

        if(post.comments === null){
            data =  [
                {
                    commentAuthor : user.displayName,
                    text : commentContent.current.value
                }
            ]
        } else{
            data = [
                ...post.comments,
                {
                    commentAuthor : user.displayName,
                    text : commentContent.current.value
                }
            ]
        }
        
        dispatch(addComment(post.id, data))
        commentContent.current.value = ''
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      }, []);


    return (
        <div className="comment-container">
            <h5 className="comment-title">
                Commentaires
            </h5>

            {post.comments && post.comments.map((comment, index)=>(
                <CommentCard key={index} comment={comment} />
            ))}

            {user ? (
                <form onSubmit={(e)=> handleComment(e)}>
                    <textarea ref={commentContent} placeholder='Envoyer un commentaire'></textarea>
                    <input type="submit" value="Envoyer le commentaire" />
                </form>
            ) : 
            (<p>Vous devez être connecté pour poster un commentaire</p>)}
        </div>
    );
};

export default CommentPost;