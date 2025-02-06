import Chatbot from "../components/ChatBot";
import Navbar from "../components/Navbar";

function Home() {


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
