import React, { useState,useEffect } from "react";
import axios from "axios";
import './css/compose.css'
import { useNavigate } from "react-router-dom";
function Compose({user,url}){
    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const author=user.name;
    function handleSubmit(e){
        e.preventDefault();
        axios.post(url+'/compose',{title,content,author},{withCredentials:true})
        .then(response=>{
            alert(response.data);
            navigate("/");
        })
        .catch(error=>{
            alert(error)
        })
    }
    return(
        <div className="base-container">
            <h1>Compose</h1>
            <h2>Compose Posts here, {user.name}</h2>
            <form method="post" className="compose-form" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text"
                 maxLength={50}
                 required
                 name="title"
                 onChange={(e)=>{setTitle(e.target.value)}} />
                 <br />
                 <label className="contentn">Content:</label>
                 <textarea name="content"
                 cols={90}
                 rows={10}
                 maxLength={500}
                required
                onChange={(e)=>{setContent(e.target.value)}} ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Compose;