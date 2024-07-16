import { useState, useEffect } from "react";
import "./css/Test.css";

function Test() {
  const [section, setSection] = useState(0);
  const [json, setJson] = useState("a");
  const [result, setResult] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/notion-data");
        const data = await response.json();
        setJson(data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    })();
  }, []);

  const selections = [
    {},
    {
      text: "선호하는 총 소요시간",
      q: [
        "5시간 이상 (-25000kcal)",
        "4시간 (-2000kcal)",
        "3시간 (-1500kcal)",
        "2시간 (-1000kcal)",
        "1시간 (-500kcal)",
      ],
    },
    {
      text: "선호 경사도(난이도)",
      q: [
        "아주 평탄한 산책로",
        "평탄한 숲길",
        "약간 경사의 등산로",
        "심한 경사의 등산로",
        "아주 심한 경사의 등산로",
      ],
    },
    {
      text: "선호 등산로 노면상태",
      q: [
        "흙길경사로 (산책인가 등산인가)",
        "목재계단 (발이 편하다)",
        "돌계단 (삐죽삐죽)",
        "가파른 돌길 (꽉잡아!)",
      ],
    },
    {
      text: "등산로의 접근성",
      q: [
        "역,버스정류장에서 도보 10분내",
        "역,버스정류장에서 도보 30분내",
        "차,안내버스 이용",
      ],
    },
  ];

  const Select = (event) => {
    if (section + 1 >= selections.length) {
      result = true;
    } else {
      setSection(section + 1);
    }
  };

  return (
    <div className="Test">
      <div id="options">
        {section ? (
          <div>
            <div className="text">{selections[section].text}</div>
            <hr />
            {selections[section].q.map((question) => (
              <div>
                <button className="btn option" onClick={Select}>
                  {question}
                </button>
                <br /> <br />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="Title">테스트!</h1>
            <button
              className="btn start"
              onClick={() => setSection(section + 1)}
              style={{ width: "130px" }}
            >
              <span>시작하기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
