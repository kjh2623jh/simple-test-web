import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Test.css";
import Title from "./Title";

function Test() {
  const [section, setSection] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const selections = [
    {},
    {
      text: "1. 선호하는 총 등산 소요시간은?",
      q: [
        "5시간 이상 (-25000kcal)",
        "4시간 (-2000kcal)",
        "3시간 (-1500kcal)",
        "2시간 (-1000kcal)",
        "1시간 (-500kcal)",
      ],
    },
    {
      text: "2. 얼마나 경사진 걸 좋아하시나요?",
      q: [
        "아주 평탄한 산책로",
        "평탄한 숲길",
        "약간 경사의 등산로",
        "심한 경사의 등산로",
        "아주 심한 경사의 등산로",
      ],
    },
    {
      text: "3. 좋아하는 노면 상태는?",
      q: [
        "흙길경사로 (산책인가 등산인가)",
        "목재계단 (발이 편하다)",
        "돌계단 (삐죽삐죽)",
        "가파른 돌길 (꽉잡아!)",
      ],
    },
    {
      text: "4. 어떻게 이동하고 싶으신가요?",
      q: [
        "역,버스정류장에서 도보 10분내",
        "역,버스정류장에서 도보 30분내",
        "차,안내버스 이용",
      ],
    },
    {
      text: "5. 정상까지 올라가는 코스가 좋으신가요?",
      q: ["정상포함 (정상석x)", "정상포함 (정상석o)", "미포함"],
    },
  ];

  const Submit = (event) => {
    console.log(answer);
    event.preventDefault();

    let newAnswer = "";
    const len = selections[section].q.length;

    // 뒤로가기 (버그) 앞으로갔다가 뒤로갔다가 하면 버그남
    if (event.nativeEvent.submitter.id === "back") {
      setSection(section - 1);
      setAnswer(answer.slice(0, -1));
      setCounter(Math.max(counter - len, 0));

      return;
    }

    // create newAnswer. 유저의 답변이 여러개일 수 있으니 for문으로 확인함
    for (let index = 0; index < len; index++) {
      const element = event.target[index];
      if (element.checked) {
        newAnswer += section.toString() + element.labels[0].id;
        element.checked = false;
      }
    }

    // 아무것도 선택하지 않으면 submit 하지 않음
    if (newAnswer === "") {
      return;
    }

    // answer 에 newAnswer 붙이기
    if (section + 1 >= selections.length) {
      navigate(`/result/${[...answer, newAnswer].join("")}`);
    } else {
      setAnswer([...answer, newAnswer]);
      setCounter(counter + len);
      setSection(section + 1);
    }
  };

  return (
    <div className="Test">
      {section ? (
        // 설문 페이지
        <div>
          {/* 진행바 */}
          <div className="progressBar">
            <div
              className="progress"
              style={{ width: `${((section - 1) / 5) * 100}%` }}
            ></div>
          </div>

          {/* 질문 */}
          <div className="question">{selections[section].text}</div>
          <div className="questionDescription">*중복 선택 가능합니다.</div>

          {/* 답변들 */}
          <form onSubmit={Submit}>
            {selections[section].q.map((question, idx) => (
              <div key={idx}>
                <input type="checkbox" id={`check${idx}`}></input>
                <label
                  htmlFor={`check${idx}`}
                  className="btn option"
                  id={(counter + idx).toString(20)} // 20진수로 변환하여 한 자릿수로 만듦.
                  style={{ height: "25px", userSelect: "none" }}
                >
                  {question}
                </label>
                <br /> <br />
              </div>
            ))}
            <br />

            {/* 뒤로가기 */}
            <button type="submit" className="button" id="back">
              뒤로가기
            </button>

            {/* 답변 제출 */}
            <button type="submit" className="button">
              확인
            </button>

            <div style={{ color: "red", fontSize: "12px" }}>
              *1개 이상의 선택지를 선택해야합니다.
            </div>
          </form>
        </div>
      ) : (
        // 시작 페이지
        <Title section={section} setSection={setSection} />
      )}
    </div>
  );
}

export default Test;
