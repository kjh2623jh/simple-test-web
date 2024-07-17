import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./css/Result.css";

function Result() {
  const { result } = useParams();
  const [json, setJson] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3001/notion-data`);
        const data = await response.json();
        setJson(data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    })();
  }, []);

  return (
    <div className="Result">
      <div>aa</div>
      <div>{result}</div>
      <div>{JSON.stringify(json)}</div>
      <Link to="/">back</Link>
    </div>
  );
}

export default Result;
