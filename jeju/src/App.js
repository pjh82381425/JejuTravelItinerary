import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Aquarium, Plaza, Arena, Railbike, Oreum, Jet, Peacepark, Jeolmul, Jusangjeolli, Dongmun, Seolloc, Gokart, Seongsan, Musium } from "./itinerary";
import "./App.css";

const teams = {
    team1: [
        { day: "day1", t1: "9:30~10:30", i1: "✈️ 공항집결", t2: "11:30~12:30", i2: "🛫 김해출발 🛬 제주도착", t3: "13:00~14:00", i3: "🍽️ 중식 - 현지식", t4: "15:00~16:20", i4: "🚴 레일바이크", t5: "16:30~17:30", i5: "⛰️ 용눈이오름", t6: "18:00", i6: "🏨 숙소도착 - 객실입실", t7: "18:30", i7: "🍽️ 석식" },
        { day: "day4", t1: "8:20", i1: "출발", t2: "9:00~9:50", i2: "🕊️ 4.3평화공원", t3: "10:20~11:20", i3: "🌲 절물휴양림", t4: "11:40~13:20", i4: "🍽️ 동문시장 - 자율식사체험", t5: "15:00~16:00", i5: "🛫 제주출발 - 🛬 김해도착"},
    ],
    team2: [
        { day: "day1", title: "2팀 1일차 일정 내용", first: "나도 몰라" },
        { day: "day4", title: "2팀 4일차 일정 내용", first: "나도 몰라" },
    ],
    team3: [
        { day: "day1", title: "3팀 1일차 일정 내용", first: "나도 몰라" },
        { day: "day4", title: "3팀 4일차 일정 내용", first: "나도 몰라" },
    ],
    day23A: [
        { t1: "23a" }
    ],
    day23B: [
        { t1: "23b" }
    ]
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

const useThemeColor = (color = "#ffffff") => {
    useEffect(() => {
      let themeColorMeta = document.querySelector("meta[name='theme-color']");
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta");
        themeColorMeta.name = "theme-color";
        document.head.appendChild(themeColorMeta);
      }
      themeColorMeta.content = color;
    }, [color]);
};

function Home() {
    useThemeColor("#aac4df");
    const navigate = useNavigate();
    const [videoReady, setVideoReady] = useState(false);

    const handleVideoReady = () => {
        setVideoReady(true);
    };

    return (
        <div className="app">
            <div className="bg-video">
            <video
            className={`bg-video__content ${videoReady ? 'show' : ''}`}
            autoPlay
            muted
            playsInline
            onCanPlayThrough={handleVideoReady}>
                    <source src="/background.mp4" type="video/mp4" />
                    브자우저가 비디오 태그를 지원하지 않습니다.
                </video>
            </div>
                <div className="container">
                    <div className="title">일정을 선택하세요</div>
                    <div className="team-container">
                    <div className="line" />
                        <button onClick={() => navigate("/1팀일정")} className="team-button">1팀</button>
                        {/* <div className="line" /> */}
                        <button onClick={() => navigate("/2팀일정")} className="team-button">2팀</button>
                        {/* <div className="line" /> */}
                        <button onClick={() => navigate("/3팀일정")} className="team-button">3팀</button>
                    </div>
                </div>
            <div className="bottom"><a href="https://kr.freepik.com/free-video/sea-waves-breaking-rocky-shore_170909?log-in=google#fromView=keyword&page=1&position=11&uuid=0f0a43d9-e147-43e9-aea0-0da7efa24731">영상출처: freepik</a><p>made by 김호진</p></div>
        </div>
    );
}

function Itinerary1() {
    useThemeColor("#ffffff");
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null);
    const [hovered, setHovered] = useState(null);

    const day1 = teams['team1'].find(item => item.day === 'day1');
    const day2 = teams['day23A'];
    const day3 = teams['day23B'];
    const day4 = teams['team1'].find(item => item.day === 'day4');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">1팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${hovered === `button${num}` ? "hovered" : ""} ${selectedDay === `day${num}` ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setHovered(`button${num}`)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {num}일차
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day1.t1}: {day1.i1}</div>
                        <div>
                            {day1.t2}: {day1.i2}
                        </div>
                        <div>
                            {day1.t3}: {day1.i3}
                        </div>
                        <div onClick={() => navigate("/레일바이크")} className="detail" >
                            {day1.t4}: {day1.i4}
                        </div>
                        <div onClick={() => navigate("/용눈이오름")} className="detail">
                            {day1.t5}: {day1.i5}
                        </div>
                        <div>{day1.t6}: {day1.i6}</div>
                        <div>{day1.t7}: {day1.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day2" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div onClick={() => navigate("/해양수족관")} className="detail">
                            {day2.t1}: {day2.i1}
                        </div>
                        <div onClick={() => navigate("/해안광장")} className="detail">
                            {day2.t2}: {day2.i2}
                        </div>
                        <div onClick={() => navigate("/아레나공연")} className="detail">
                            {day2.t3}: {day2.i3}
                        </div>
                        <div>{day2.t4}: {day2.i4}</div>
                        <div onClick={() => navigate("/카트체험")} className="detail">
                            {day2.t5}: {day2.i5}
                        </div>
                        <div onClick={() => navigate("/성산일출봉")} className="detail">
                            {day2.t6}: {day2.i6}
                        </div>
                        <div>{day2.t7}: {day2.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day3" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day3.t1}: {day3.i1}</div>
                        <div onClick={() => navigate("/제주제트")} className="detail">
                            {day3.t2}: {day3.i2}
                        </div>
                        <div onClick={() => navigate("/주상절리")} className="detail">
                            {day3.t3}: {day3.i3}
                        </div>
                        <div>{day3.t4}: {day3.i4}</div>
                        <div onClick={() => navigate("/오!설록")} className="detail">
                            {day3.t5}: {day3.i5}
                        </div>
                        <div onClick={() => navigate("/본태박물관")} className="detail">
                            {day3.t6}: {day3.i6}
                        </div>
                        <div>{day3.t7}: {day3.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day4" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day4.t1}: {day4.i1}</div>
                        <div onClick={() => navigate("/43평화공원")} className="detail">
                            {day4.t2}: {day4.i2}
                        </div>
                        <div onClick={() => navigate("/절물휴양림")} className="detail">{day4.t3}: {day4.i3}</div>
                        <div onClick={() => navigate("/동문시장자율식사체험")} className="detail">
                            {day4.t4}: {day4.i4}
                        </div>
                        <div>{day4.t5}: {day4.i5}</div>
                    </div>
                </AnimatedContainer>
            )}
        </AnimatedContainer>
    );
}

function Itinerary2() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [hovered, setHovered] = useState(null);

    const day1 = teams['team2'].find(item => item.day === 'day1');
    const day2 = teams['team2'].find(item => item.day === 'day2');
    const day3 = teams['team2'].find(item => item.day === 'day3');
    const day4 = teams['team2'].find(item => item.day === 'day4');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">2팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${hovered === `button${num}` ? "hovered" : ""} ${selectedDay === `day${num}` ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setHovered(`button${num}`)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {num}일차
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day1.t1}: {day1.i1}</div>
                        <div>
                            {day1.t2}: {day1.i2}
                        </div>
                        <div>
                            {day1.t3}: {day1.i3}
                        </div>
                        <div className="detail" >
                            {day1.t4}: {day1.i4}
                        </div>
                        <section className="hidden-box">
                            <Railbike />
                        </section>
                        <div className="detail">
                            {day1.t5}: {day1.i5}
                        </div>
                        <section className="hidden-box">
                            <Oreum />
                        </section>
                        <div>{day1.t6}: {day1.i6}</div>
                        <div>{day1.t7}: {day1.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day2" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div className="detail">
                            {day2.t1}: {day2.i1}
                        </div>
                        <section className="hidden-box">
                            <Aquarium />
                        </section>
                        <div
                            className="detail"
                        >
                            {day2.t2}: {day2.i2}
                        </div>
                        <section className="hidden-box">
                            <Plaza />
                        </section>
                        <div className="detail">
                            {day2.t3}: {day2.i3}
                        </div>
                        <section className="hidden-box">
                            <Arena />
                        </section>
                        <div>{day2.t4}: {day2.i4}</div>
                        <div className="detail">
                            {day2.t5}: {day2.i5}
                        </div>
                        <section className="hidden-box">
                            <Gokart />
                        </section>
                        <div className="detail">
                            {day2.t6}: {day2.i6}
                        </div>
                        <section className="hidden-box">
                            <Seongsan />
                        </section>
                        <div>{day2.t7}: {day2.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day3" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day3.t1}: {day3.i1}</div>
                        <div className="detail">
                            {day3.t2}: {day3.i2}
                        </div>
                        <section className="hidden-box">
                            <Jet />
                        </section>
                        <div className="detail">
                            {day3.t3}: {day3.i3}
                        </div>
                        <section className="hidden-box">
                            <Jusangjeolli />
                        </section>
                        <div>{day3.t4}: {day3.i4}</div>
                        <div className="detail">
                            {day3.t5}: {day3.i5}
                        </div>
                        <section className="hidden-box">
                            <Seolloc />
                        </section>
                        <div className="detail">
                            {day3.t6}: {day3.i6}
                        </div>
                        <section className="hidden-box">
                            <Musium />
                        </section>
                        <div>{day3.t7}: {day3.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day4" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day4.t1}: {day4.i1}</div>
                        <div
                            className="detail"
                        >
                            {day4.t2}: {day4.i2}
                        </div>
                        <section className="hidden-box">
                            <Peacepark />
                        </section>
                        <div className="detail">{day4.t3}: {day4.i3}</div>
                        <section className="hidden-box">
                            <Jeolmul />
                        </section>
                        <div
                            className="detail"
                        >
                            {day4.t4}: {day4.i4}
                        </div>
                        <section className="hidden-box">
                            <Dongmun />
                        </section>
                        <div>{day4.t5}: {day4.i5}</div>
                    </div>
                </AnimatedContainer>
            )}
        </AnimatedContainer>
    );
}

function Itinerary3() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [hovered, setHovered] = useState(null);

    const day1 = teams['team3'].find(item => item.day === 'day1');
    const day2 = teams['team3'].find(item => item.day === 'day2');
    const day3 = teams['team3'].find(item => item.day === 'day3');
    const day4 = teams['team3'].find(item => item.day === 'day4');

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">3팀 일정</div>
            <div className="day-menu">
                <div className="button-container">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`button ${hovered === `button${num}` ? "hovered" : ""} ${selectedDay === `day${num}` ? "selected" : ""}`}
                            onClick={() => handleDayClick(`day${num}`)}
                            onMouseEnter={() => setHovered(`button${num}`)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {num}일차
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day1.t1}: {day1.i1}</div>
                        <div>
                            {day1.t2}: {day1.i2}
                        </div>
                        <div>
                            {day1.t3}: {day1.i3}
                        </div>
                        <div className="detail" >
                            {day1.t4}: {day1.i4}
                        </div>
                        <section className="hidden-box">
                            <Railbike />
                        </section>
                        <div className="detail">
                            {day1.t5}: {day1.i5}
                        </div>
                        <section className="hidden-box">
                            <Oreum />
                        </section>
                        <div>{day1.t6}: {day1.i6}</div>
                        <div>{day1.t7}: {day1.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day2" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div className="detail">
                            {day2.t1}: {day2.i1}
                        </div>
                        <section className="hidden-box">
                            <Aquarium />
                        </section>
                        <div
                            className="detail"
                        >
                            {day2.t2}: {day2.i2}
                        </div>
                        <section className="hidden-box">
                            <Plaza />
                        </section>
                        <div className="detail">
                            {day2.t3}: {day2.i3}
                        </div>
                        <section className="hidden-box">
                            <Arena />
                        </section>
                        <div>{day2.t4}: {day2.i4}</div>
                        <div className="detail">
                            {day2.t5}: {day2.i5}
                        </div>
                        <section className="hidden-box">
                            <Gokart />
                        </section>
                        <div className="detail">
                            {day2.t6}: {day2.i6}
                        </div>
                        <section className="hidden-box">
                            <Seongsan />
                        </section>
                        <div>{day2.t7}: {day2.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day3" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day3.t1}: {day3.i1}</div>
                        <div className="detail">
                            {day3.t2}: {day3.i2}
                        </div>
                        <section className="hidden-box">
                            <Jet />
                        </section>
                        <div className="detail">
                            {day3.t3}: {day3.i3}
                        </div>
                        <section className="hidden-box">
                            <Jusangjeolli />
                        </section>
                        <div>{day3.t4}: {day3.i4}</div>
                        <div className="detail">
                            {day3.t5}: {day3.i5}
                        </div>
                        <section className="hidden-box">
                            <Seolloc />
                        </section>
                        <div className="detail">
                            {day3.t6}: {day3.i6}
                        </div>
                        <section className="hidden-box">
                            <Musium />
                        </section>
                        <div>{day3.t7}: {day3.i7}</div>
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day4" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        <div>{day4.t1}: {day4.i1}</div>
                        <div
                            className="detail"
                        >
                            {day4.t2}: {day4.i2}
                        </div>
                        <section className="hidden-box">
                            <Peacepark />
                        </section>
                        <div className="detail">{day4.t3}: {day4.i3}</div>
                        <section className="hidden-box">
                            <Jeolmul />
                        </section>
                        <div
                            className="detail"
                        >
                            {day4.t4}: {day4.i4}
                        </div>
                        <section className="hidden-box">
                            <Dongmun />
                        </section>
                        <div>{day4.t5}: {day4.i5}</div>
                    </div>
                </AnimatedContainer>
            )}
        </AnimatedContainer>
    );
}

function Ready() {
    useThemeColor("#ffffff");
    return <div className="ready">준비중...</div>;
}

function MainApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1팀일정" element={<Itinerary1 />} />
            <Route path="/2팀일정" element={<Itinerary2 />} />
            <Route path="/3팀일정" element={<Itinerary3 />} />
            <Route path="/레일바이크" element={<Railbike />} />
            <Route path="/용눈이오름" element={<Oreum />} />
            <Route path="/해양수족관" element={<Aquarium />} />
            <Route path="/해안광장" element={<Plaza />} />
            <Route path="/아레나공연" element={<Arena />} />
            <Route path="/카트체험" element={<Gokart />} />
            <Route path="/성산일출봉" element={<Seongsan />} />
            <Route path="/제주제트" element={<Jet />} />
            <Route path="/오!설록" element={<Seolloc />} />
            <Route path="/본태박물관" element={<Musium />} />
            <Route path="/43평화공원" element={<Peacepark />} />
            <Route path="/절물휴양림" element={<Jeolmul />} />
            <Route path="/동문시장자율식사체험" element={<Dongmun />} />
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