import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios'

import "./App.css";

const ERROR_LOG_API_KEY = process.env.REACT_APP_API_KEY;

if (!ERROR_LOG_API_KEY) {
    console.error("ERROR_LOG_API_KEY가 설정되지 않았습니다.");
}

export async function saveErrorLog(message, context = {}) {
    try {
        await axios.post(`${window.location.origin}/api/ReactErrorLog`, {
            message,
            context,
            timestamp: new Date().toISOString()
        }, {
            headers: {
                'X-API-KEY': ERROR_LOG_API_KEY
            }
        });
    } catch (err) {
        console.warn('로그를 전송하는 중에 문제가 발생했습니다.', err);
    }
}

const railbike_cid = "CNTS_000000000020139";
const yongnuni_cid = "CONT_000000000500466";
const aqua_planet_cid = "CONT_000000000500565";
const aqua_guidemap_cid = "CONT_000000000500565";
const seongsan_cid = "CONT_000000000500349";
const osulloc_cid = "CONT_000000000500457";
const peace_park_cid = "CONT_000000000500535";
const hamdeok_cid = "CONT_000000000500693";
const camellia_cid = "CNTS_000000000001195";
const jusangjeolli_cid = "CNTS_000000000020476";
const cart_cid = "";
const jet_cid = "";
// const tourist_cid = "https://data.ijto.or.kr/bigdatamap/jeju/widget/main.do";

const TeamGuide = {
    "1": ["teamA", "team1"],
    "2": ["teamC", "team1"],
    "3": ["teamB", "team1"],
    "4": ["teamA", "team1"],
    "5": ["teamB", "team1"],
    "6": ["teamB", "team2"],
    "7": ["teamC", "team2"],
    "8": ["teamB", "team2"],
    "9": ["teamC", "team2"],
    "10": ["teamA", "team2"],
    "11": ["teamC", "team2"],
    "12": ["teamA", "team1"],
}

// const Teams = {
//     "teamA": [
//         {
//             day: "day1",
//             t1: "09:30", i1: "김해공항 집결",
//             t2: "11:25", i2: "김해출발 - BX8183",
//             t3: "12:25", i3: "제주도착",
//             t4: "13:30", i4: "중식 - 현지식",
//             t5: "14:30", i5: "4.3평화공원", t5_cid: "peace_park_cid",
//             t6: "16:00", i6: "용눈이오름", t6_cid: "yongnuni_cid",
//             t7: "18:30", i7: "숙소 도착 및 방배정",
//             t8: "18:40", i8: "석식 - 숙소(뷔페식)",
//             t9: "19:40", i9: "자유시간 및 취침"
//         },
//         {
//             day: "day4",
//             t1: "07:00", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "09:00", i3: "레일바이크", t3_cid: "railbike_cid",
//             t4: "10:30", i4: "함덕해수욕장", t4_cid: "hamdeok_cid",
//             t5: "12:00", i5: "중식 - 현지식",
//             t6: "15:00", i6: "제주출발 - BX8110",
//             t7: "16:00", i7: "김해공항 도착 및 귀가 지도"
//         }
//     ],
//     "teamB": [
//         {
//             day: "day1",
//             t1: "11:30", i1: "김해공항 집결",
//             t2: "13:25", i2: "김해출발 - BX8111",
//             t3: "14:25", i3: "제주도착",
//             t4: "15:00", i4: "중식 - 현지식",
//             t5: "16:30", i5: "4.3평화공원", t5_cid: "peace_park_cid",
//             t6: "18:40", i6: "숙소 도착 및 방배정",
//             t7: "19:00", i7: "석식 - 숙소(뷔페식)",
//             t8: "20:00", i8: "자유시간 및 취침"
//         },
//         {
//             day: "day4",
//             t1: "07:10", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "08:40", i3: "용눈이오름", t3_cid: "yongnuni_cid",
//             t4: "09:30", i4: "레일바이크", t4_cid: "railbike_cid",
//             t5: "11:50", i5: "함덕해수욕장", t5_cid: "hamdeok_cid",
//             t6: "13:20", i6: "중식 - 현지식",
//             t7: "16:30", i7: "제주출발 - BX8112",
//             t8: "17:30", i8: "김해공항 도착 및 귀가 지도"
//         }
//     ],
//     "teamC": [
//         {
//             day: "day1",
//             t1: "12:30", i1: "김해공항 집결",
//             t2: "14:30", i2: "김해출발 - BX8115",
//             t3: "15:30", i3: "제주도착",
//             t4: "16:30", i4: "함덕해수욕장", t4_cid: "hamdeok_cid",
//             t5: "19:00", i5: "숙소 도착 및 방배정",
//             t6: "19:20", i6: "석식 - 숙소(뷔페식)",
//             t7: "20:20", i7: "자유시간 및 취침"
//         },
//         {
//             day: "day4",
//             t1: "07:30", i1: "조식(뷔페식)",
//             t2: "08:50", i2: "숙소 출발",
//             t3: "09:00", i3: "용눈이오름", t3_cid: "yongnuni_cid",
//             t4: "10:00", i4: "레일바이크", t4_cid: "railbike_cid",
//             t5: "11:50", i5: "중식 - 현지식",
//             t6: "13:30", i6: "4.3 평화공원", t6_cid: "peace_park_cid",
//             t7: "16:00", i7: "석식 - 현지식",
//             t8: "18:35", i8: "제주출발 - BX8116",
//             t9: "19:35", i9: "김해공항 도착 및 귀가 지도"
//         }
//     ],
//     "team1": [
//         {
//             day: "day2",
//             t1: "07:00", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "09:40", i3: "오!설록", t3_cid: "osulloc_cid",
//             t4: "11:20", i4: "카멜리아힐", t4_cid: "camellia_cid",
//             t5: "13:00", i5: "중식 - 현지식",
//             t6: "14:50", i6: "주상절리", t6_cid: "jusangjeolli_cid",
//             t7: "15:40", i7: "제트보트", t7_cid: "jet_cid",
//             t8: "18:00", i8: "숙소 도착",
//             t9: "18:30", i9: "석식 - 숙소(뷔페식)",
//             t10: "19:30", i10: "자유시간 및 취침"
//         },
//         {
//             day: "day3",
//             t1: "07:20", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "08:50", i3: "아쿠아플라넷 - 세계해양수족관", t3_cid: "aqua_planet_cid",
//             t4: "10:00", i4: "아쿠아플라넷 - 섭지코지 해변광장", t4_cid: "aqua_planet_cid",
//             t5: "10:50", i5: "아쿠아플라넷 - 아레나공연", t5_cid: "aqua_planet_cid",
//             t6: "12:00", i6: "중식 - 현지식",
//             t7: "13:20", i7: "카트레이싱", t7_cid: "cart_cid",
//             t8: "16:00", i8: "성산일출봉", t8_cid: "seongsan_cid",
//             t9: "18:00", i9: "숙소 도착 & 석식 - 숙소(뷔페식)",
//             t10: "19:30", i10: "레크리에이션",
//             t11: "22:00", i11: "자유시간 및 취침"
//         },
//     ],
//     "team2": [
//         {
//             day: "day2",
//             t1: "07:20", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "08:50", i3: "아쿠아플라넷 - 세계해양수족관", t3_cid: "aqua_planet_cid",
//             t4: "10:00", i4: "아쿠아플라넷 - 섭지코지 해변광장", t4_cid: "aqua_planet_cid",
//             t5: "10:50", i5: "아쿠아플라넷 - 아레나공연", t5_cid: "aqua_planet_cid",
//             t6: "12:20", i6: "중식 - 현지식",
//             t7: "13:50", i7: "카트레이싱", t7_cid: "cart_cid",
//             t8: "16:00", i8: "성산일출봉", t8_cid: "seongsan_cid",
//             t9: "18:30", i9: "숙소 도착",
//             t10: "18:40", i10: "석식 - 숙소(뷔페식)",
//             t11: "19:40", i11: "자유시간 및 취침"
//         },
//         {
//             day: "day3",
//             t1: "07:00", i1: "조식 - 숙소(뷔페식)",
//             t2: "08:30", i2: "숙소 출발",
//             t3: "09:30", i3: "주상절리", t3_cid: "jusangjeolli_cid",
//             t4: "10:40", i4: "제트보트", t4_cid: "jet_cid",
//             t5: "12:30", i5: "중식 - 현지식",
//             t6: "14:00", i6: "카멜리아힐", t6_cid: "camellia_cid",
//             t7: "18:00", i7: "숙소 도착&석식-숙소(뷔페식)",
//             t8: "19:30", i8: "레크리에이션",
//             t9: "22:00", i9: "자유시간 및 취침"
//         },
//     ]
// };

const Teams = {
    "teamA": [
        {
            day: "day1",
            t1: "09:30", i1: "김해공항 집결 ✈️",
            t2: "11:25", i2: "김해출발 - BX8183 🛫",
            t3: "12:25", i3: "제주도착 🛬",
            t4: "13:30", i4: "중식 - 현지식 🍽️",
            t5: "14:30", i5: "4.3평화공원 🌳", t5_cid: "peace_park_cid",
            t6: "16:00", i6: "용눈이오름 ⛰️", t6_cid: "yongnuni_cid",
            t7: "18:30", i7: "숙소 도착 및 방배정 🏨",
            t8: "18:40", i8: "석식 - 숙소(뷔페식) 🍽️",
            t9: "19:40", i9: "자유시간 및 취침 🛏️"
        },
        {
            day: "day4",
            t1: "07:00", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "09:00", i3: "레일바이크 🚋",
            t4: "10:30", i4: "함덕해수욕장 🏖️", t4_cid: "hamdeok_cid",
            t5: "12:00", i5: "중식 - 현지식 🍽️",
            t6: "15:00", i6: "제주출발 - BX8110 🛫",
            t7: "16:00", i7: "김해공항 도착 및 귀가 지도 🛬"
        }
    ],
    "teamB": [
        {
            day: "day1",
            t1: "11:30", i1: "김해공항 집결 ✈️",
            t2: "13:25", i2: "김해출발 - BX8111 🛫",
            t3: "14:25", i3: "제주도착 🛬",
            t4: "15:00", i4: "중식 - 현지식 🍽️",
            t5: "16:30", i5: "4.3평화공원 🌳", t5_cid: "peace_park_cid",
            t6: "18:40", i6: "숙소 도착 및 방배정 🏨",
            t7: "19:00", i7: "석식 - 숙소(뷔페식) 🍽️",
            t8: "20:00", i8: "자유시간 및 취침 🛏️"
        },
        {
            day: "day4",
            t1: "07:10", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "08:40", i3: "용눈이오름 ⛰️", t3_cid: "yongnuni_cid",
            t4: "09:30", i4: "레일바이크 🚋",
            t5: "11:50", i5: "함덕해수욕장 🏖️", t5_cid: "hamdeok_cid",
            t6: "13:20", i6: "중식 - 현지식 🍽️",
            t7: "16:30", i7: "제주출발 - BX8112 🛫",
            t8: "17:30", i8: "김해공항 도착 및 귀가 지도 🛬"
        }
    ],
    "teamC": [
        {
            day: "day1",
            t1: "12:30", i1: "김해공항 집결 ✈️",
            t2: "14:30", i2: "김해출발 - BX8115 🛫",
            t3: "15:30", i3: "제주도착 🛬",
            t4: "16:30", i4: "함덕해수욕장 🏖️", t4_cid: "hamdeok_cid",
            t5: "19:00", i5: "숙소 도착 및 방배정 🏨",
            t6: "19:20", i6: "석식 - 숙소(뷔페식) 🍽️",
            t7: "20:20", i7: "자유시간 및 취침 🛏️"
        },
        {
            day: "day4",
            t1: "07:30", i1: "조식(뷔페식) 🍽️",
            t2: "08:50", i2: "숙소 출발 🚌",
            t3: "09:00", i3: "용눈이오름 ⛰️", t3_cid: "yongnuni_cid",
            t4: "10:00", i4: "레일바이크 🚋",
            t5: "11:50", i5: "중식 - 현지식 🍽️",
            t6: "13:30", i6: "4.3 평화공원 🌳", t6_cid: "peace_park_cid",
            t7: "16:00", i7: "석식 - 현지식 🍽️",
            t8: "18:35", i8: "제주출발 - BX8116 🛫",
            t9: "19:35", i9: "김해공항 도착 및 귀가 지도 🛬"
        }
    ],
    "team1": [
        {
            day: "day2",
            t1: "07:00", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "09:40", i3: "오!설록 🍵", t3_cid: "osulloc_cid",
            t4: "11:20", i4: "카멜리아힐 🌺", t4_cid: "camellia_cid",
            t5: "13:00", i5: "중식 - 현지식 🍽️",
            t6: "14:50", i6: "주상절리 🪨", t6_cid: "jusangjeolli_cid",
            t7: "15:40", i7: "제트보트 🚤", t7_cid: "jet_cid",
            t8: "18:00", i8: "숙소 도착 🏨",
            t9: "18:30", i9: "석식 - 숙소(뷔페식) 🍽️",
            t10: "19:30", i10: "자유시간 및 취침 🛏️"
        },
        {
            day: "day3",
            t1: "07:20", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "08:50", i3: "아쿠아플라넷 - 세계해양수족관 🐠", t3_cid: "aqua_planet_cid",
            t4: "10:00", i4: "아쿠아플라넷 - 섭지코지 해변광장 🐠", t4_cid: "aqua_planet_cid",
            t5: "10:50", i5: "아쿠아플라넷 - 아레나공연 🐠", t5_cid: "aqua_planet_cid",
            t6: "12:00", i6: "중식 - 현지식 🍽️",
            t7: "13:20", i7: "카트레이싱 🏎️", t7_cid: "cart_cid",
            t8: "16:00", i8: "성산일출봉 🌅", t8_cid: "seongsan_cid",
            t9: "18:00", i9: "숙소 도착 & 석식 - 숙소(뷔페식) 🍽️",
            t10: "19:30", i10: "레크리에이션 🎉",
            t11: "22:00", i11: "자유시간 및 취침 🛏️"
        }
    ],
    "team2": [
        {
            day: "day2",
            t1: "07:20", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "08:50", i3: "아쿠아플라넷 - 세계해양수족관 🐠", t3_cid: "aqua_planet_cid",
            t4: "10:00", i4: "아쿠아플라넷 - 섭지코지 해변광장 🐠", t4_cid: "aqua_planet_cid",
            t5: "10:50", i5: "아쿠아플라넷 - 아레나공연 🐠", t5_cid: "aqua_planet_cid",
            t6: "12:20", i6: "중식 - 현지식 🍽️",
            t7: "13:50", i7: "카트레이싱 🏎️", t7_cid: "cart_cid",
            t8: "16:00", i8: "성산일출봉 🌅", t8_cid: "seongsan_cid",
            t9: "18:30", i9: "숙소 도착 🏨",
            t10: "18:40", i10: "석식 - 숙소(뷔페식) 🍽️",
            t11: "19:40", i11: "자유시간 및 취침 🛏️"
        },
        {
            day: "day3",
            t1: "07:00", i1: "조식 - 숙소(뷔페식) 🍽️",
            t2: "08:30", i2: "숙소 출발 🚌",
            t3: "09:30", i3: "주상절리 🪨", t3_cid: "jusangjeolli_cid",
            t4: "10:40", i4: "제트보트 🚤", t4_cid: "jet_cid",
            t5: "12:30", i5: "중식 - 현지식 🍽️",
            t6: "14:00", i6: "카멜리아힐 🌺", t6_cid: "camellia_cid",
            t7: "18:00", i7: "숙소 도착&석식-숙소(뷔페식) 🍽️",
            t8: "19:30", i8: "레크리에이션 🎉",
            t9: "22:00", i9: "자유시간 및 취침 🛏️"
        }
    ]
};

const ThemeColor = (color = "#ffffff") => {
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

function Home() {
    ThemeColor("#aac4df");
    const navigate = useNavigate();
    const [videoReady, setVideoReady] = useState(false);
    const [useFallback, setUseFallback] = useState(false);
    const videoRef = useRef(null);

    // 비디오 로드 완료 시 자동재생 시도
    const handleVideoReady = () => {
        setVideoReady(true);
        videoRef.current
            .play()
            .catch(() => {
                // 재생 실패 시 fallback 모드로 전환
                setUseFallback(true);
            });
    };

    useEffect(() => {
        const vid = videoRef.current;
        if (vid) {
            vid.muted = true;
            vid.playsInline = true;
            vid.loop = false;
            vid.setAttribute("playsinline", "");
            vid.setAttribute("webkit-playsinline", "");
            vid.setAttribute("preload", "auto");
            vid.addEventListener("loadeddata", handleVideoReady);
        }
        return () => {
            if (vid) {
                vid.removeEventListener("loadeddata", handleVideoReady);
            }
        };
    }, []);

    const handleClassSelect = (classNum) => {
        console.log("일정으로 이동:", `${classNum}반`);
        navigate("/일정", { state: { classNum } });
    };

    return (
        <div className="app">
            <div className="bg-video">
                {useFallback ? (
                    <div
                        className="bg-fallback"
                        style={{
                            backgroundImage: 'cid("/fallback.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100vh",
                        }}
                    />
                ) : (
                    <video
                        ref={videoRef}
                        className={`bg-video__content ${videoReady ? "show" : ""}`}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        playsinline
                        webkit-playsinline
                    >
                        <source src="/background.mp4" type="video/mp4" />
                        브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                )}
            </div>

            <div className="container">
                <div className="title">여행 일정을 확인해 보세요</div>
                <div className="team-container">
                    <div className="line" />
                    <div className="class-selector">
                        {Array.from({ length: 12 }, (_, i) => (
                            <button key={i + 1} onClick={() => handleClassSelect(i + 1)}>
                                {i + 1}반
                            </button>
                        ))}
                    </div>
                    <div className="m-class-selector">
                        <select
                            className="class-select-dropdown"
                            defaultValue=""
                            onChange={(e) => handleClassSelect(Number(e.target.value))}
                        >
                            <option value="" disabled>
                                확인하기
                            </option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}반
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
            </div>

            <div className="bottom">
                <a href="https://kr.freepik.com/free-video/sea-waves-breaking-rocky-shore_170909">
                    영상출처: freepik
                </a>
                <p>made by 김호진</p>
            </div>
        </div>
    );
}

function Schedule() {
    ThemeColor("#ffffff");
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null);
    const [hovered, setHovered] = useState(null);

    const location = useLocation();
    const classNum = location.state?.classNum;

    if (!classNum || !TeamGuide[classNum]) {
        return <div>비정상적인 접근입니다.</div>;
    }

    const [teamX, teamY] = TeamGuide[classNum];
    const Itinerary1And4Day = Teams[teamX] || [];
    const Itinerary2And3Day = Teams[teamY] || [];

    const day1 = Itinerary1And4Day[0];
    const day2 = Itinerary2And3Day[0];
    const day3 = Itinerary2And3Day[1];
    const day4 = Itinerary1And4Day[1];

    // 각 일자 클릭 시 호출되는 함수
    const handleDayClick = (day) => {
        console.log("일자로 이동:", `${day}`);
        setSelectedDay(day);
    };

    // 사용 가능한 cid 변수들을 한 곳에 모아둔 맵
    const cidMap = {
        railbike_cid,
        yongnuni_cid,
        aqua_planet_cid,
        aqua_guidemap_cid,
        seongsan_cid,
        jet_cid,
        osulloc_cid,
        peace_park_cid,
        hamdeok_cid,
        camellia_cid,
        jusangjeolli_cid,
        cart_cid
    };

    // cidMap에서 name에 대응되는 cid을 반환
    const getcidVar = (name) => {
        // cidMap에 해당 키가 있으면 그 값을, 없으면 undefined 반환
        return cidMap[name];
    };

    const handleClassSelect = (cid) => {
        console.log("상세일정으로 이동:", `${cid}`);
        navigate("/상세일정", { state: { cid } });
        // axios.get(`/상세일정/${cid}`)
    };

    return (
        <AnimatedContainer className="app-itiner">
            <div className="initer-title">{classNum}반 일정</div>
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
                            {num === 1 ? "수요일" : num === 2 ? "목요일" : num === 3 ? "금요일" : num === 4 ? "토요일" : ""} <p>({num}일차)</p>
                        </button>
                    ))}
                </div>
            </div>
            <div className="br" />

            {selectedDay === "day1" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        {Object.keys(day1)
                            .filter((key) => key.startsWith("t") && !key.includes("_"))
                            .map((tKey) => {
                                const time = day1[tKey];
                                const idx = tKey.substring(1);
                                const info = day1[`i${idx}`];
                                const cidKey = day1[`${tKey}_cid`];
                                const cid = getcidVar(cidKey);            // 실제 cid 변수 값 찾아오기
                                const hascid = typeof cid === "string";
                                const className = hascid ? "detail bt" : "";
                                const onClick = hascid ? () => { handleClassSelect(cid) } : undefined;

                                return (
                                    <div key={tKey} onClick={onClick}>
                                        {time}: {info}
                                        {hascid && (
                                            <span className={className}>더보기</span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day2" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        {Object.keys(day2)
                            .filter((key) => key.startsWith("t") && !key.includes("_"))
                            .map((tKey) => {
                                const time = day2[tKey];
                                const idx = tKey.substring(1);
                                const info = day2[`i${idx}`];
                                const cidKey = day2[`${tKey}_cid`];
                                const cid = getcidVar(cidKey);            // 실제 cid 변수 값 찾아오기
                                const hascid = typeof cid === "string";
                                const className = hascid ? "detail bt" : "";
                                const onClick = hascid ? () => { handleClassSelect(cid) } : undefined;

                                return (
                                    <div key={tKey} onClick={onClick}>
                                        {time}: {info}
                                        {hascid && (
                                            <span className={className}>더보기</span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day3" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        {Object.keys(day3)
                            .filter((key) => key.startsWith("t") && !key.includes("_"))
                            .map((tKey) => {
                                const time = day3[tKey];
                                const idx = tKey.substring(1);
                                const info = day3[`i${idx}`];
                                const cidKey = day3[`${tKey}_cid`];
                                const cid = getcidVar(cidKey);            // 실제 cid 변수 값 찾아오기
                                const hascid = typeof cid === "string";
                                const className = hascid ? "detail bt" : "";
                                const onClick = hascid ? () => { handleClassSelect(cid) } : undefined;

                                return (
                                    <div key={tKey} onClick={onClick}>
                                        {time}: {info}
                                        {hascid && (
                                            <span className={className}>더보기</span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </AnimatedContainer>
            )}

            {selectedDay === "day4" && (
                <AnimatedContainer className="day-box">
                    <div className="day-detail-box">
                        {Object.keys(day4)
                            .filter((key) => key.startsWith("t") && !key.includes("_"))
                            .map((tKey) => {
                                const time = day4[tKey];
                                const idx = tKey.substring(1);
                                const info = day4[`i${idx}`];
                                const cidKey = day4[`${tKey}_cid`];
                                const cid = getcidVar(cidKey);            // 실제 cid 변수 값 찾아오기
                                const hascid = typeof cid === "string";
                                const className = hascid ? "detail bt" : "";
                                const onClick = hascid ? () => { handleClassSelect(cid) } : undefined;

                                return (
                                    <div key={tKey} onClick={onClick}>
                                        {time}: {info}
                                        {hascid && (
                                            <span className={className}>더보기</span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </AnimatedContainer>
            )}
        </AnimatedContainer>
    );
}

function ScheduleDetail() {
    const location = useLocation();
    const cid = location.state?.cid;

    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    ThemeColor("#ffffff");

    // 버튼 클릭 시 열림/닫힘 토글
    const handleToggle = () => {
        setIsOpen(prev => !prev)
    }

    const hiddenImgRef = useRef(null);

    useEffect(() => {
        if (!cid) {
            setError('잘못된 접근입니다.');
            return;
        }

        setLoading(true);
        axios
            .get(`${window.location.origin}/api/content/${cid}`)
            .then((res) => {
                setData(res.data);
                setError('');
            })
            .catch((err) => {
                console.error('API 호출 오류:', err);
                setError('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cid]);

    if (loading) return <div className="loading">로딩 중…</div>;
    if (error) return <div className="error">{error}</div>;
    if (!data || !data.contents || data.contents.length === 0)
        return <div className="error">데이터가 없습니다.</div>;

    const content = data.contents[0];
    const imageUrl = content.image || content.repPhoto?.photoid?.imgpath;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="detail-view-container">
            <div
                className={`detail-view-background-image ${imageLoaded ? 'loaded' : ''}`}
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <img
                    ref={hiddenImgRef}
                    src={imageUrl}
                    alt={`${content.title} - 이미지 로딩 실패`}
                    style={{ display: 'none' }}
                    onLoad={handleImageLoad}
                />
            </div>
            <div className="detail-view">
                <p id="title">{content.title}</p>
                <p>{content.introduction}</p>
                <button className="toggle-btn" onClick={handleToggle}>
                    {isOpen ? '접기' : '더보기'}
                </button>
                <div
                    className={
                        `detail-container ${isOpen ? 'open animate__animated animate__fadeInDown' : ''}`
                    }
                >
                    <div className="detail-content">
                        <p>주소: {content.address}</p>
                        <p>전화: {content.phoneno}</p>
                        <p>위도: {content.latitude}</p>
                        <p>경도: {content.longitude}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Ready() {
    ThemeColor("#ffffff");
    return <div className="ready">준비중...</div>;
}

function MainApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/일정" element={<Schedule />} />
            <Route path="/상세일정" element={<ScheduleDetail />} />
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