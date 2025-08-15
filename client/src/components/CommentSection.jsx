import { useEffect, useState } from "react"
import CommentForm from "./CommentForm";
import commentService from "../services/commentService.js";
import Comment from "./Comment.jsx";
const CommentSection = ({articleId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await commentService.getAllComments(articleId);
                console.log(res);
                if(res){
                    setComments(res);
                }
            }
            catch(error) {
                console.log("Error fetching comments", error);
            }
        }
        fetchComments();
    }, [articleId]);

    const addComment = async (comment) => {
        try {
            const addedComment = await commentService.addComment(articleId, comment);
            setComments(prevComments => [...prevComments,addedComment])
            console.log(addedComment)
            return addedComment;
        } catch (error) {
            console.log("Error adding a comment", error);
        }

    }

    return (
        <div className="mt-8 border-t pt-8" >
            <h3 className="text-2xl font-bold mb-4"> Responses</h3>
            <CommentForm articleId={articleId} addComment={addComment}/>
            {comments.map(comment => 
                
                <Comment key={comment._id} comment={comment} />
            
            )}
        </div>

    );
}

export default CommentSection;