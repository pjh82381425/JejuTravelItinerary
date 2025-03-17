import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="app">
            <video className="background-video" autoPlay muted loop>
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="container">
                <div className="title">일정을 선택하세요</div>
                <div className="team-container">
                    <button onClick={() => navigate("/itinerary1")} className="team-button">1팀</button>
                    <button onClick={() => navigate("/itinerary2")} className="team-button">2팀</button>
                    <button onClick={() => navigate("/itinerary3")} className="team-button">3팀</button>
                </div>
            </div>
        </div>
    );
}

function Itinerary1() {
    return (
        <div className="app-itiner">
            1
        </div>
    );
}

function Itinerary2() {
    return (
        <div className="app-itiner">
            2
        </div>
    );
}

function Itinerary3() {
    return (
        <div className="app-itiner">
            3
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itinerary1" element={<Itinerary1 />} />
            <Route path="/itinerary2" element={<Itinerary2 />} />
            <Route path="/itinerary3" element={<Itinerary3 />} />
        </Routes>
    );
}

function Main() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Main;
