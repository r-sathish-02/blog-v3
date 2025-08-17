import React, { useState, useEffect } from "react";
import Spinner from './Spinner';
import axios from "axios";
import './css/home.css';

function Home({ url, user }) {
    const blogPosts = [
        {
            title: "The Rise of AI",
            content: "Artificial Intelligence (AI) is transforming industries at an unprecedented pace...",
            author: "Joker"
        },
        {
            title: "A Journey Through Space",
            content: "Exploring the vastness of space has always fascinated humankind. From the first moon landing..."
        },
        {
            title: "Healthy Eating Habits",
            content: "Maintaining a balanced diet is essential for good health. This blog covers tips and tricks..."
        },
        {
            title: "The Future of Work",
            content: "Remote work, automation, and the gig economy are reshaping how we think about careers..."
        },
        {
            title: "Traveling on a Budget",
            content: "Discover how to explore the world without breaking the bank. Tips for budget-friendly travel..."
        },
        {
            title: "The Impact of Social Media",
            content: "Social media has revolutionized communication, but it also comes with its own set of challenges..."
        },
        {
            title: "Learning to Code",
            content: "Coding has become a valuable skill in today's digital world. Here are some resources to help you get started..."
        },
        {
            title: "Mindfulness and Meditation",
            content: "In today's fast-paced world, mindfulness and meditation are key practices for reducing stress..."
        },
        {
            title: "The Art of Photography",
            content: "Photography is more than just capturing images; it's about telling a story through your lens..."
        },
        {
            title: "Climate Change and Its Effects",
            content: "Climate change is one of the most pressing issues of our time. Understanding its impacts..."
        }
    ];
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(url+'/posts')
        .then(response=>{
            setPosts(response.data)
        })
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);

        
    }, []
    
);

    if (loading) return <div className="spinner-load"> <Spinner /> </div>;

    return (
        <div className="post-container">
            {user ? <h2>Welcome, {user.name}</h2> : ""}
            <h1>Blog Posts</h1>
            {posts.map((post, index) => {
                return (
                    <div key={index} className="posts">
                        <h2>{post.title}</h2>
                        {post.author && <h3>&nbsp;&nbsp;&nbsp;- {post.author}</h3>}
                        <p>{post.content}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
