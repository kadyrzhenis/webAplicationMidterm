import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
export function PostItem({ post,index }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/post/" + index)} className="cool-post-box">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{post?.author}</p>
    <div className="likes-wrap">
        <div>
    {post.likes}<ThumbUpOffAltIcon />
        </div>
        <div>
        {post.dislike}<ThumbDownIcon/>
        </div>
    </div>
    </div>
  );
}