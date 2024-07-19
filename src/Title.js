import "./Title.css";
import logo from "./logo.webp";

function Title({ section, setSection }) {
  return (
    <div className="index_main">
      <div className="index_main_content">
        <h2 className="Title">나에게 맞는 등산로 찾기!</h2>
        <div className="index_main_image">
          <img src={logo} className="App-logo" alt="React" />
        </div>
        <div className="index_main_text1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="#75787B"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-7a7 7 0 0 0-5.468 11.37C7.242 15.226 8.805 14 12 14s4.757 1.225 5.468 2.37A7 7 0 0 0 12 5Z"
              fill="#75787B"
            ></path>
          </svg>
          <p>하이커스</p>

          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.25 6.462c0-.766.842-1.195 1.474-.828l9.544 5.538.002.001a.953.953 0 0 1 0 1.654h-.002l-9.544 5.539c-.632.367-1.474-.062-1.474-.828V6.462ZM16.704 12 7.25 6.515v10.97L16.704 12Z"
              fill="#75787B"
            ></path>
          </svg>
          <p>약 1분</p>

          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="7.5" stroke="#75787B"></circle>
            <path
              d="M11.208 13.093V8.208h1.125v4.452l2.658 2.587-.785.764-2.998-2.918Z"
              fill="#75787B"
            ></path>
          </svg>
          <p>1.5만</p>
        </div>

        <div className="index_main_text2">
          <p>나에게 딱 맞는 등산로는 어디일까?⛰️</p>
          <p>지금 바로 테스트하고 알아보자!😎</p>
        </div>
        <div className="index_main_btn">
          <button
            className="btn start"
            onClick={() => setSection(section + 1)}
            style={{ width: "130px" }}
          >
            <span>시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Title;
