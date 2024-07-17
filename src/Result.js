import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./css/Result.css";

function Result() {
  const { result } = useParams();
  const [json, setJson] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/notion-data`)
        .then((response) => response.json())
        .catch((error) =>
          console.error("데이터를 가져오는 중 오류가 발생했습니다.", error)
        );
      setJson(response);
    })();
  }, []);

  return (
    <div className="Result">
      <div>aa</div>
      <div>{result}</div>

      <div>
        {json?.results?.map((route) => (
          <div key={route.id}>
            {JSON.stringify(route.properties["산-등산로"].title[0])}
          </div>
        ))}
      </div>
      <Link to="/">back</Link>
    </div>
  );
}

export default Result;
