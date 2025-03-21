import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import DynamicButtons from "./component/dynamicbutton";
import "./App.css";

const teams = {
    team1: [
        { day: "day1", title: "1팀 1일차 일정", t1: "09:30~10:30", i1: "✈️ 공항집결", t2: "11:30~12:30", i2: "🛫 김해출발 🛬 제주도착", t3: "13:00~14:00", i3: "🍽️ 중식 - 현지식", t4: "15:00~16:20", i4: "🚴 레일바이크", t5: "16:30~17:30", i5: "🌿 용눈이오름", t6: "18:00", i6: "🏨 숙소도착 - 객실입실", t7: "18:30", i7: "🍽️ 석식" },
        { day: "day2", title: "2일차 일정 변수 내용", first: "나도 몰라" },
        { day: "day3", title: "3일차 일정 변수 내용", first: "나도 몰라" },
        { day: "day4", title: "4일차 일정 변수 내용", first: "나도 몰라" },
    ],
    team2: [
        { day: "day1", title: "2팀 1일차 일정 내용", first: "나도 몰라" },
        { day: "day2", title: "2팀 2일차 일정 내용", first: "나도 몰라" },
        { day: "day3", title: "2팀 3일차 일정 내용", first: "나도 몰라" },
        { day: "day4", title: "2팀 4일차 일정 내용", first: "나도 몰라" },
    ],
    team3: [
        { day: "day1", title: "3팀 1일차 일정 내용", first: "나도 몰라" },
        { day: "day2", title: "3팀 2일차 일정 내용", first: "나도 몰라" },
        { day: "day3", title: "3팀 3일차 일정 내용", first: "나도 몰라" },
        { day: "day4", title: "3팀 4일차 일정 내용", first: "나도 몰라" },
    ],
    team4: [
        { day: "day1", title: "4팀 1일차 일정 내용", first: "나도 몰라" },
        { day: "day2", title: "4팀 2일차 일정 내용", first: "나도 몰라" },
        { day: "day3", title: "4팀 3일차 일정 내용", first: "나도 몰라" },
        { day: "day4", title: "4팀 4일차 일정 내용", first: "나도 몰라" },
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
    const [selected, setSelected] = useState(null);
    const day1 = teams['team1'].find(item => item.day === 'day1');
    const day2 = teams['team1'].find(item => item.day === 'day2');
    const day3 = teams['team1'].find(item => item.day === 'day3');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        // console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">1팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${selected === num ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setSelected(num)}
                            onMouseLeave={() => setSelected(null)}
                        >
                            day {num}
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && <AnimatedContainer classame="day-box">
                <div className="day-detail-box">
                    <div>{day1.t1}: {day1.i1}</div>
                    <div>{day1.t2}: {day1.i2}</div>
                    <div>{day1.t3}: {day1.i3}</div>
                    <div id="detail" >{day1.t4}: {day1.i4}</div>
                    <div>{day1.t5}: {day1.i5}</div>
                    <div>{day1.t6}: {day1.i6}</div>
                    <div>{day1.t7}: {day1.i7}</div>
                </div>
            </AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
        </AnimatedContainer>
    );
}


function Itinerary2() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const day1 = teams['team2'].find(item => item.day === 'day1');
    const day2 = teams['team2'].find(item => item.day === 'day2');
    const day3 = teams['team2'].find(item => item.day === 'day3');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        // console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">2팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${selected === num ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setSelected(num)}
                            onMouseLeave={() => setSelected(null)}
                        >
                            day {num}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDay === "day1" && <AnimatedContainer className="day-box">{day1.title}, 첫번째 일정: {day1.first}</AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
        </AnimatedContainer>
    );
}

function Itinerary3() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const day1 = teams['team3'].find(item => item.day === 'day1');
    const day2 = teams['team3'].find(item => item.day === 'day2');
    const day3 = teams['team3'].find(item => item.day === 'day3');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day); // 상태 업데이트
        console.log(`Selected day: ${day}`); // 선택된 일자 확인용
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">3팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${selected === num ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setSelected(num)}
                            onMouseLeave={() => setSelected(null)}
                        >
                            day {num}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDay === "day1" && <AnimatedContainer className="day-box">{day1.title}, 첫번째 일정: {day1.first}</AnimatedContainer>}
            {selectedDay === "day2" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day3" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
            {selectedDay === "day4" && <AnimatedContainer className="day-box">1</AnimatedContainer>}
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
            <>예시: </>
            <>현재 일정:</>
            <>1팀: 공항</>
            <div className="br" />
            <>도착까지 약 2분</>
            <MainApp />
        </BrowserRouter>
    );
}

export default Main;