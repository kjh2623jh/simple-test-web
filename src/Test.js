import { useState } from "react";
import "./css/Test.css";

function Test() {
  const [section, setSection] = useState(0);
  // let section = 0;
  const selections = [
    {},
    {
      text: "등산 경력",
      q: ["고수(5년이상)", "중수(2~4년차)", "등린이(1년이하)"],
    },
    {
      text: "선호하는 소요시간",
      q: [
        "4시간 이상 타야 등산로라고 할 수 있다",
        "2~3시간이 적당히 힘들고 재밌다",
        "1시간 가볍게 다녀오고 싶다",
      ],
    },
    {
      text: "원하는 등산로 스타일",
      q: [
        "경사로 (산책인가 등산인가)",
        "나무계단 (잘 정비되어 편함)",
        "돌계단 (삐죽삐죽 불규칙한 재미)",
        "가파른 돌길 (꽉잡아!)",
      ],
    },
  ];

  const Select = (event) => {
    setSection(section + 1);
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
