import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import DynamicButtons from "./component/dynamicbutton";
import "./App.css";

const teams = {
    team1: [
        { day: "day1", t1: "9:30~10:30", i1: "✈️ 공항집결", t2: "11:30~12:30", i2: "🛫 김해출발 🛬 제주도착", t3: "13:00~14:00", i3: "🍽️ 중식 - 현지식", t4: "15:00~16:20", i4: "🚴 레일바이크", t5: "16:30~17:30", i5: "🌿 용눈이오름", t6: "18:00", i6: "🏨 숙소도착 - 객실입실", t7: "18:30", i7: "🍽️ 석식" },
        { day: "day2", t1: "9:00", i1: "🐟 아쿠아플라넷 - 해양수족관", t2: "10:00", i2: "🌊 아쿠아플라넷- 해안광장", t3: "10:50", i3: "🎤 아쿠아플라넷 - 아레나공연", t4: "13:00", i4: "🍽️ 중식 - 현지식", t5: "14:30", i5: "🏎️ 카트체험", t6: "16:00", i6: "⛰️ 성산일출봉", t7: "18:00", i7: "🏨 숙소도착" },
        { day: "day3", t1: "7:00", i1: "🍽️ 조식 / 8:30: 출발", t2: "9:40", i2: "🚤 제주제트", t3: "10:30", i3: "🪨 주상절리", t4: "12:00", i4: "🍽️ 중식 - 현지식", t5: "13:20", i5: "🌿 오! 설록", t6: "15:30", i6: "🏛️ 본태박물관", t7: "18:00", i7: "🏨 숙소도착" },
        { day: "day4", t1: "8:20", i1: "출발", t2: "9:00~9:50", i2: "🕊️ 4.3평화공원", t3: "10:20~11:20", i3: "🌲 절물휴양림", t4: "11:40~13:20", i4: "🍽️ 동문시장 - 자율식사체험", t5: "15:00~16:00", i5: "🛫 제주출발 - 🛬 김해도착"},
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
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}

function AnimatedContainer2({ children, className }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function Home() {
    const navigate = useNavigate();

    return (
        <AnimatedContainer2 className="app">
            <div className="bg-video">
                <video className="bg-video__content" autoPlay loop muted playsInline>
                    <source src="/background.mp4" type="video/mp4" />
                    브자우저가 비디오 태그를 지원하지 않습니다.
                </video>
            </div>
            <AnimatedContainer2>
                <div className="container">
                    <div className="title">일정을 선택하세요</div>
                    <div className="team-container">
                    <div className="line" />
                        <button onClick={() => navigate("/itinerary1")} className="team-button">1팀</button>
                        {/* <div className="line" /> */}
                        <button onClick={() => navigate("/itinerary2")} className="team-button">2팀</button>
                        {/* <div className="line" /> */}
                        <button onClick={() => navigate("/itinerary3")} className="team-button">3팀</button>
                    </div>
                </div>
            </AnimatedContainer2>
            <div className="bottom"><a href="https://kr.freepik.com/free-video/sea-waves-breaking-rocky-shore_170909?log-in=google#fromView=keyword&page=1&position=11&uuid=0f0a43d9-e147-43e9-aea0-0da7efa24731">Video: freepik</a></div>
        </AnimatedContainer2>
    );
}

function Itinerary1() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const day1 = teams['team1'].find(item => item.day === 'day1');
    const day2 = teams['team1'].find(item => item.day === 'day2');
    const day3 = teams['team1'].find(item => item.day === 'day3');
    const day4 = teams['team1'].find(item => item.day === 'day4');

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
                            {num}일차
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && <AnimatedContainer className="day-box">
                <div className="day-detail-box">
                    <div>{day1.t1}: {day1.i1}</div>
                    <div>{day1.t2}: {day1.i2}</div>
                    <div>{day1.t3}: {day1.i3}</div>
                    <div id="detail" >{day1.t4}: {day1.i4}</div>
                    <div id="detail" >{day1.t5}: {day1.i5}</div>
                    <div>{day1.t6}: {day1.i6}</div>
                    <div>{day1.t7}: {day1.i7}</div>
                </div>
            </AnimatedContainer>}

            {selectedDay === "day2" && <AnimatedContainer className="day-box">
                <div className="day-detail-box">
                    <div id="detail" >{day2.t1}: {day2.i1}</div>
                    <div id="detail" >{day2.t2}: {day2.i2}</div>
                    <div id="detail" >{day2.t3}: {day2.i3}</div>
                    <div>{day2.t4}: {day2.i4}</div>
                    <div id="detail" >{day2.t5}: {day2.i5}</div>
                    <div id="detail" >{day2.t6}: {day2.i6}</div>
                    <div>{day2.t7}: {day2.i7}</div>
                </div>
            </AnimatedContainer>}

            {selectedDay === "day3" && <AnimatedContainer className="day-box">
                <div className="day-detail-box">
                    <div>{day3.t1}: {day3.i1}</div>
                    <div>{day3.t2}: {day3.i2}</div>
                    <div>{day3.t3}: {day3.i3}</div>
                    <div>{day3.t4}: {day3.i4}</div>
                    <div>{day3.t5}: {day3.i5}</div>
                    <div>{day3.t6}: {day3.i6}</div>
                    <div>{day3.t7}: {day3.i7}</div>
                </div>
            </AnimatedContainer>}

            {selectedDay === "day4" && <AnimatedContainer className="day-box">
                <div className="day-detail-box">
                    <div>{day4.t1}: {day4.i1}</div>
                    <div>{day4.t2}: {day4.i2}</div>
                    <div>{day4.t3}: {day4.i3}</div>
                    <div>{day4.t4}: {day4.i4}</div>
                    <div>{day4.t5}: {day4.i5}</div>
                </div>
            </AnimatedContainer>}

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
            {/* <>예시: </>
            <>현재 일정:</>
            <>1팀: 공항</>
            <div className="br" />
            <>도착까지 약 2분</> */}
            <MainApp />
        </BrowserRouter>
    );
}

export default Main;