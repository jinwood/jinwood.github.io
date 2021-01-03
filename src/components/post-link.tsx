import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }: any) => (
  <div className=" ">
    <div>
      <h2 className="post-title">
        <Link to={post.frontmatter.path} className="post-link">
          {post.frontmatter.title}
        </Link>
      </h2>
      <div className="post-meta">{post.frontmatter.date}</div>
    </div>
  </div>
);
export default PostLink;
