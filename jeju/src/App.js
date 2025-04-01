import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

const railbike_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000020139";
const yongnuni_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500466&menuId=DOM_000001718002000000";
const aqua_planet_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500565";
const aqua_guidemap_url = "https://m.aquaplanet.co.kr/contents/jeju/introduce/gallery/second-floor/aquarium.do";
const seongsan_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500349";
const jet_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000022073";
const osulloc_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500457";
const bonte_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500250";
const peace_park_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500535";
const jeolmul_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500570";
const dongmoon_url = "https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500745";
const tourist_distribution_url = "https://data.ijto.or.kr/bigdatamap/jeju/widget/main.do";

function openLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
}

const teams = {
    team1: [
        { day: "day1", t1: "", i1: "" },
        { day: "day2", t1: "", i1: "" },
        { day: "day3", t1: "", i1: "" },
        { day: "day4", t1: "", i1: "" },
    ],
    team2: [
        { day: "day1", t1: "", i1: "" },
        { day: "day2", t1: "", i1: "" },
        { day: "day3", t1: "", i1: "" },
        { day: "day4", t1: "", i1: "" },
    ],
    team3: [
        { day: "day1", t1: "", i1: "" },
        { day: "day2", t1: "", i1: "" },
        { day: "day3", t1: "", i1: "" },
        { day: "day4", t1: "", i1: "" },
    ],
}

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
}

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
    const day2 = teams['team1'].find(item => item.day === 'day2');
    const day3 = teams['team1'].find(item => item.day === 'day3');
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
                        <div onClick={() => openLink(railbike_url)} className="detail bt" >
                            {day1.t4}: {day1.i4}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
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
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day2.t1}: {day2.i1}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day2.t2}: {day2.i2}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day2.t3}: {day2.i3}
                        </div>
                        <div>{day2.t4}: {day2.i4}</div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day2.t5}: {day2.i5}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
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
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day3.t2}: {day3.i2}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day3.t3}: {day3.i3}
                        </div>
                        <div>{day3.t4}: {day3.i4}</div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day3.t5}: {day3.i5}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
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
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day4.t2}: {day4.i2}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day4.t3}: {day4.i3}
                        </div>
                        <div onClick={() => openLink(railbike_url)} className="detail bt">
                            {day4.t4}: {day4.i4}
                        </div>
                        <div>{day4.t5}: {day4.i5}</div>
                    </div>
                </AnimatedContainer>
            )}
        </AnimatedContainer>
    );
}

// function Itinerary2() {
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [hovered, setHovered] = useState(null);

//     const day1 = teams['team2'].find(item => item.day === 'day1');
//     const day2 = teams['team2'].find(item => item.day === 'day2');
//     const day3 = teams['team2'].find(item => item.day === 'day3');
//     const day4 = teams['team2'].find(item => item.day === 'day4');

//     // 각 일자 클릭 시 호출되는 함수
//     const handleDayClick = (day) => {
//         setSelectedDay(day);
//     };

//     return (
//         <AnimatedContainer className="app-itiner">
//             <div className="initer-title">2팀 일정</div>
//             <div className="day-menu">
//                 <div className="button-container">
//                     {[1, 2, 3, 4].map((num) => (
//                         <button
//                             key={num}
//                             className={`button ${hovered === `button${num}` ? "hovered" : ""} ${selectedDay === `day${num}` ? "selected" : ""}`}
//                             onClick={() => handleDayClick(`day${num}`)}
//                             onMouseEnter={() => setHovered(`button${num}`)}
//                             onMouseLeave={() => setHovered(null)}
//                         >
//                             {num}일차
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <div className="br" />

//             {selectedDay === "day1" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day1.t1}: {day1.i1}</div>
//                         <div>
//                             {day1.t2}: {day1.i2}
//                         </div>
//                         <div>
//                             {day1.t3}: {day1.i3}
//                         </div>
//                         <div className="detail" >
//                             {day1.t4}: {day1.i4}
//                         </div>
//                         <section className="hidden-box">
//                             <Railbike />
//                         </section>
//                         <div className="detail">
//                             {day1.t5}: {day1.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Oreum />
//                         </section>
//                         <div>{day1.t6}: {day1.i6}</div>
//                         <div>{day1.t7}: {day1.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day2" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div className="detail">
//                             {day2.t1}: {day2.i1}
//                         </div>
//                         <section className="hidden-box">
//                             <Aquarium />
//                         </section>
//                         <div
//                             className="detail"
//                         >
//                             {day2.t2}: {day2.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Plaza />
//                         </section>
//                         <div className="detail">
//                             {day2.t3}: {day2.i3}
//                         </div>
//                         <section className="hidden-box">
//                             <Arena />
//                         </section>
//                         <div>{day2.t4}: {day2.i4}</div>
//                         <div className="detail">
//                             {day2.t5}: {day2.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Gokart />
//                         </section>
//                         <div className="detail">
//                             {day2.t6}: {day2.i6}
//                         </div>
//                         <section className="hidden-box">
//                             <Seongsan />
//                         </section>
//                         <div>{day2.t7}: {day2.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day3" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day3.t1}: {day3.i1}</div>
//                         <div className="detail">
//                             {day3.t2}: {day3.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Jet />
//                         </section>
//                         <div className="detail">
//                             {day3.t3}: {day3.i3}
//                         </div>
//                         <section className="hidden-box">
//                             <Jusangjeolli />
//                         </section>
//                         <div>{day3.t4}: {day3.i4}</div>
//                         <div className="detail">
//                             {day3.t5}: {day3.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Seolloc />
//                         </section>
//                         <div className="detail">
//                             {day3.t6}: {day3.i6}
//                         </div>
//                         <section className="hidden-box">
//                             <Musium />
//                         </section>
//                         <div>{day3.t7}: {day3.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day4" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day4.t1}: {day4.i1}</div>
//                         <div
//                             className="detail"
//                         >
//                             {day4.t2}: {day4.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Peacepark />
//                         </section>
//                         <div className="detail">{day4.t3}: {day4.i3}</div>
//                         <section className="hidden-box">
//                             <Jeolmul />
//                         </section>
//                         <div
//                             className="detail"
//                         >
//                             {day4.t4}: {day4.i4}
//                         </div>
//                         <section className="hidden-box">
//                             <Dongmun />
//                         </section>
//                         <div>{day4.t5}: {day4.i5}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}
//         </AnimatedContainer>
//     );
// }

// function Itinerary3() {
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [hovered, setHovered] = useState(null);

//     const day1 = teams['team3'].find(item => item.day === 'day1');
//     const day2 = teams['team3'].find(item => item.day === 'day2');
//     const day3 = teams['team3'].find(item => item.day === 'day3');
//     const day4 = teams['team3'].find(item => item.day === 'day4');

//     // 각 일자 클릭 시 호출되는 함수
//     const handleDayClick = (day) => {
//         setSelectedDay(day);
//     };

//     return (
//         <AnimatedContainer className="app-itiner">
//             <div className="initer-title">3팀 일정</div>
//             <div className="day-menu">
//                 <div className="button-container">
//                     {[1, 2, 3, 4].map((num) => (
//                         <button
//                             key={num}
//                             className={`button ${hovered === `button${num}` ? "hovered" : ""} ${selectedDay === `day${num}` ? "selected" : ""}`}
//                             onClick={() => handleDayClick(`day${num}`)}
//                             onMouseEnter={() => setHovered(`button${num}`)}
//                             onMouseLeave={() => setHovered(null)}
//                         >
//                             {num}일차
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <div className="br" />

//             {selectedDay === "day1" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day1.t1}: {day1.i1}</div>
//                         <div>
//                             {day1.t2}: {day1.i2}
//                         </div>
//                         <div>
//                             {day1.t3}: {day1.i3}
//                         </div>
//                         <div className="detail" >
//                             {day1.t4}: {day1.i4}
//                         </div>
//                         <section className="hidden-box">
//                             <Railbike />
//                         </section>
//                         <div className="detail">
//                             {day1.t5}: {day1.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Oreum />
//                         </section>
//                         <div>{day1.t6}: {day1.i6}</div>
//                         <div>{day1.t7}: {day1.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day2" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div className="detail">
//                             {day2.t1}: {day2.i1}
//                         </div>
//                         <section className="hidden-box">
//                             <Aquarium />
//                         </section>
//                         <div
//                             className="detail"
//                         >
//                             {day2.t2}: {day2.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Plaza />
//                         </section>
//                         <div className="detail">
//                             {day2.t3}: {day2.i3}
//                         </div>
//                         <section className="hidden-box">
//                             <Arena />
//                         </section>
//                         <div>{day2.t4}: {day2.i4}</div>
//                         <div className="detail">
//                             {day2.t5}: {day2.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Gokart />
//                         </section>
//                         <div className="detail">
//                             {day2.t6}: {day2.i6}
//                         </div>
//                         <section className="hidden-box">
//                             <Seongsan />
//                         </section>
//                         <div>{day2.t7}: {day2.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day3" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day3.t1}: {day3.i1}</div>
//                         <div className="detail">
//                             {day3.t2}: {day3.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Jet />
//                         </section>
//                         <div className="detail">
//                             {day3.t3}: {day3.i3}
//                         </div>
//                         <section className="hidden-box">
//                             <Jusangjeolli />
//                         </section>
//                         <div>{day3.t4}: {day3.i4}</div>
//                         <div className="detail">
//                             {day3.t5}: {day3.i5}
//                         </div>
//                         <section className="hidden-box">
//                             <Seolloc />
//                         </section>
//                         <div className="detail">
//                             {day3.t6}: {day3.i6}
//                         </div>
//                         <section className="hidden-box">
//                             <Musium />
//                         </section>
//                         <div>{day3.t7}: {day3.i7}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}

//             {selectedDay === "day4" && (
//                 <AnimatedContainer className="day-box">
//                     <div className="day-detail-box">
//                         <div>{day4.t1}: {day4.i1}</div>
//                         <div
//                             className="detail"
//                         >
//                             {day4.t2}: {day4.i2}
//                         </div>
//                         <section className="hidden-box">
//                             <Peacepark />
//                         </section>
//                         <div className="detail">{day4.t3}: {day4.i3}</div>
//                         <section className="hidden-box">
//                             <Jeolmul />
//                         </section>
//                         <div
//                             className="detail"
//                         >
//                             {day4.t4}: {day4.i4}
//                         </div>
//                         <section className="hidden-box">
//                             <Dongmun />
//                         </section>
//                         <div>{day4.t5}: {day4.i5}</div>
//                     </div>
//                 </AnimatedContainer>
//             )}
//         </AnimatedContainer>
//     );
// }

function Ready() {
    useThemeColor("#ffffff");
    return <div className="ready">준비중...</div>;
}

function MainApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1팀일정" element={<Itinerary1 />} />
            <Route path="/2팀일정" element={<Ready />} />
            <Route path="/3팀일정" element={<Ready />} />
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