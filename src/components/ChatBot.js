import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaHistory, FaPaperPlane } from "react-icons/fa";
import axiosInstance from '../config/axiosConfig';
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ sender: 'AI', text: 'Hi, how can I help you today?' }];
    });
    const chatContainerRef = useRef(null);
    const toggleChatbot = () => setIsOpen(!isOpen);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const userMessage = { sender: 'You', text: input };
            const updatedMessages = [...messages, userMessage];
            setMessages(updatedMessages);
            setInput('');
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
            try {
                const response = await axiosInstance.post(`/groq`, {
                    prompt: input,
                    history: JSON.stringify(updatedMessages),
                });
                const botMessage = { sender: 'AI', text: response.data.toString() };
                const updatedMessagesWithBot = [...updatedMessages, botMessage];
                setMessages(updatedMessagesWithBot);
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessagesWithBot));
            }
            catch (error) {
                const errorMessage = { sender: 'AI', text: 'Sorry, an error occurred. Please try again later.' };
                const updatedMessagesWithError = [...updatedMessages, errorMessage];
                setMessages(updatedMessagesWithError);
                console.log(error);
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessagesWithError));
            }
        }
    };
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    const clearChatHistory = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to clear the chat history?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setMessages([{ sender: 'AI', text: 'Hi, how can I help you today?' }]);
                localStorage.removeItem('chatMessages');
                Swal.fire('Cleared!', 'Your chat history has been cleared.', 'success');
            }
        });
    };
    return (_jsxs("div", { className: "text-gray-800 dark:text-gray-200", children: [_jsx("button", { onClick: toggleChatbot, className: "fixed inline-flex z-10 items-center justify-center w-12 h-12 text-white bg-black rounded-full lg:w-14 lg:h-14 bottom-4 right-4 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" }) }) }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: '100%' }, transition: { duration: 0.5 }, className: "fixed bottom-0 right-0 flex flex-col justify-between w-full sm:w-[90%] md:w-[440px] h-[100dvh] sm:h-[80vh] bg-gray-50/30 dark:bg-gray-900/30 backdrop-blur-lg p-2 pt-6 md:p-6 pb-0 rounded-t-lg sm:rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg z-50", children: [_jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("h2", { className: "pr-2 text-lg font-semibold md:text-xl", children: "Placement AI" }), _jsx("button", { onClick: clearChatHistory, className: "text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-200", children: _jsx(FaHistory, { className: "text-xl" }) })] }), _jsx("button", { onClick: toggleChatbot, className: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200", children: "\u2715" })] }), _jsx("div", { ref: chatContainerRef, className: "flex flex-col space-y-4 overflow-y-auto h-[calc(100vh-220px)] sm:h-[calc(100vh-180px)] md:h-[474px] pr-4", children: messages.map((msg, index) => (_jsx("div", { className: `flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`, children: _jsx("div", { className: `flex items-center space-x-2 p-3 rounded-lg ${msg.sender === 'AI'
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`, children: _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "block font-bold", children: msg.sender }), _jsx("pre", { className: "w-full whitespace-pre-wrap text-md md:text-base", children: msg.text })] }) }) }, index))) }), _jsxs("form", { onSubmit: handleSubmit, className: "flex items-center w-[100%] px-4 py-2 mt-6 bg-white border border-gray-200 shadow-md dark:bg-gray-900 lg:mt-4 rounded-xl dark:border-gray-700", children: [_jsx("input", { type: "text", style: { outline: 'none' }, className: "flex-grow p-3 text-base text-gray-900 placeholder-gray-500 bg-transparent border-none rounded-lg outline-none focus:outline-none dark:placeholder-gray-400 dark:text-gray-100", placeholder: "Type your message here...", value: input, onChange: (e) => setInput(e.target.value), required: true }), _jsx("button", { type: "submit", className: "px-4 py-2 ml-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500", children: _jsx("span", { className: "flex items-center space-x-1 text-xl", children: _jsx(FaPaperPlane, {}) }) })] })] })) })] }));
};
export default Chatbot;
