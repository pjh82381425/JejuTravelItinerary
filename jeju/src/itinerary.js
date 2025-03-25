import React, { useEffect, useState } from "react";
import "./App.css";

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

export function Aquarium() {
    useThemeColor("#ffffff");
    return <div>해양수족관</div>;
}

export function Plaza() {
    useThemeColor("#ffffff");
    return <div>해안광장</div>;
}

export function Arena() {
    useThemeColor("#ffffff");
    return <div>아레나공연</div>;
}

export function Railbike() {
    useThemeColor("#ffffff");
    return <div>레일바이크</div>;
}

export function Oreum() {
    useThemeColor("#ffffff");
    return <div>용눈이오름</div>;
}

export function Jet() {
    useThemeColor("#ffffff");
    return <div>제주제트</div>;
}

export function Peacepark() {
    useThemeColor("#ffffff");
    return <div>43평화공원</div>;
}

export function Jeolmul() {
    useThemeColor("#ffffff");
    return <div>절물휴양림</div>;
}

export function Jusangjeolli() {
    useThemeColor("#ffffff");
    return <div>주상절리</div>;
}

export function Dongmun() {
    useThemeColor("#ffffff");
    return <div>동문시장자율식사체험</div>;
}

export function Seolloc() {
    useThemeColor("#ffffff");
    return <div>오!설록</div>;
}

export function Gokart() {
    useThemeColor("#ffffff");
    return <div>카트체험</div>;
}

export function Seongsan() {
    useThemeColor("#ffffff");
    return <div>성산일출봉</div>;
}

export function Musium() {
    useThemeColor("#ffffff");
    return <div>본태박물관</div>;
}