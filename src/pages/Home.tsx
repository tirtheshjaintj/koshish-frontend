import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"; // To navigate to quiz page
import axiosInstance from "../config/axiosConfig";
import Chatbot from "../components/ChatBot";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate(); // To navigate to the quiz page
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
    }, []);

    return (
        <>

            <Navbar />
            <div className="min-h-screen pt-10 bg-transparent">
                <Chatbot />
             
            </div>
        </>

    );
}

export default Home;
