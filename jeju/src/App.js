import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import test from "./component/test";
import "./App.css";

const teams = {
    team1: [
      { day: "day1", title: "1일차 일정 변수 내용", first: "나도 몰라" },
      { day: "day2", title: "2일차 일정 변수 내용" },
      { day: "day3", title: "3일차 일정 변수 내용" },
      { day: "day4", title: "4일차 일정 변수 내용" },
    ],
    team2: [
      { day: "day1", title: "2팀 1일차 일정 내용" },
      { day: "day2", title: "2팀 2일차 일정 내용" },
      { day: "day3", title: "2팀 3일차 일정 내용" },
      { day: "day4", title: "2팀 4일차 일정 내용" },
    ],
    team3: [
      { day: "day1", title: "3팀 1일차 일정 내용" },
      { day: "day2", title: "3팀 2일차 일정 내용" },
      { day: "day3", title: "3팀 3일차 일정 내용" },
      { day: "day4", title: "3팀 4일차 일정 내용" },
    ],
    team4: [
      { day: "day1", title: "4팀 1일차 일정 내용" },
      { day: "day2", title: "4팀 2일차 일정 내용" },
      { day: "day3", title: "4팀 3일차 일정 내용" },
      { day: "day4", title: "4팀 4일차 일정 내용" },
    ],
  };

function AnimatedContainer({ children, className }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <motion.div
            className={className}
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function Home() {
    const navigate = useNavigate();

    return (
        <div className="app">
            <video className="background-video" autoPlay muted loop>
                <source src="/background.mp4" type="video/mp4" />
                브자우저가 비디오 태그를 지원하지 않습니다.
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
    const [selectedDay, setSelectedDay] = useState(null);

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">1팀</div>
            <div className="day-menu">
                <button onClick={() => handleDayClick("day1")} className="day-button">1일차</button>
                <button onClick={() => handleDayClick("day2")} className="day-button">2일차</button>
                <button onClick={() => handleDayClick("day3")} className="day-button">3일차</button>
                <button onClick={() => handleDayClick("day4")} className="day-button">4일차</button>
            </div>

            {selectedDay === "day1" && <AnimatedContainer className="day-box">{teams['team1'].find(item => item.day === 'day1')?.title}, 첫번째 일정: {teams['team1'].find(item => item.day === 'day1')?.first}</AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
        </AnimatedContainer>
    );
}


function Itinerary2() {
    const [selectedDay, setSelectedDay] = useState(null);

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">2팀</div>
            <div className="day-menu">
                <button onClick={() => handleDayClick("day1")} className="day-button">1일차</button>
                <button onClick={() => handleDayClick("day2")} className="day-button">2일차</button>
                <button onClick={() => handleDayClick("day3")} className="day-button">3일차</button>
                <button onClick={() => handleDayClick("day4")} className="day-button">4일차</button>
            </div>

            {selectedDay === "day1" && <AnimatedContainer className="day-box">1일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">2일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">3일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">4일차 일정 내용</AnimatedContainer>}
        </AnimatedContainer>
    );
}

function Itinerary3() {
    const [selectedDay, setSelectedDay] = useState(null);

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">3팀</div>
            <div className="day-menu">
                <button onClick={() => handleDayClick("day1")} className="day-button">1일차</button>
                <button onClick={() => handleDayClick("day2")} className="day-button">2일차</button>
                <button onClick={() => handleDayClick("day3")} className="day-button">3일차</button>
                <button onClick={() => handleDayClick("day4")} className="day-button">4일차</button>
            </div>

            {selectedDay === "day1" && <AnimatedContainer className="day-box">1일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">2일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">3일차 일정 내용</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">4일차 일정 내용</AnimatedContainer>}
        </AnimatedContainer>
    );
}

function MainApp() {
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
            <MainApp />
        </BrowserRouter>
    );
}

export default Main;