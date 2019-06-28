import React, { Component } from "react";
import axios from "../../axios";
import "./Blog.css";
import Posts from "./Posts/Posts";

class Blog extends Component {
    componentDidMount() {
        axios
            .get("/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: "Max"
                    };
                });
                this.setState({ posts: updatedPosts });
                // console.log( response );
            })
            .catch(error => {
                // console.log(error);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/new-post">New Post</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Posts />
            </div>
        );
    }
}

export default Blog;