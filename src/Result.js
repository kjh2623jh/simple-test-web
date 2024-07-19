import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./css/Result.css";

function Result() {
  const { result } = useParams();
  const [json, setJson] = useState();

  // notion api. fetch filtered json
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/notion-data/${result}`
      )
        .then((response) => response.json())
        .catch((error) =>
          console.error("데이터를 가져오는 중 오류가 발생했습니다.", error)
        );
      setJson(response);
    })();
  }, []);

  return (
    <div className="Result">
      <h1>결과!!</h1>
      {json ? (
        <div>
          {json?.results?.map((route) => (
            <div key={route.id} className="body">
              {/* 이미지 */}
              <div className="img"></div>

              {/* 등산로 이름 */}
              <div className="text">
                {JSON.stringify(
                  route.properties["산-등산로"].title[0].plain_text
                ).slice(1, -1)}
              </div>

              {/* 등산로 정보 */}
              <div className="description">
                {/* 소요시간 */}
                <div className="item">
                  <img></img>
                  <div>
                    {JSON.stringify(route.properties["소요시간"].select.name)
                      .split("(")[0]
                      .slice(1)}
                  </div>
                </div>

                {/* 난이도 */}
                <div className="item">
                  <img></img>
                  <div>
                    {
                      ["매우쉬움", "쉬움", "보통", "어려움", "매우어려움"][
                        Number(
                          JSON.stringify(
                            route.properties["난이도(경사)"].select.name
                          )
                            .split("(")[0]
                            .slice(1)
                        ) - 1
                      ]
                    }
                  </div>
                </div>

                {/* 정상여부 */}
                <div className="item">
                  <img></img>
                  <div>
                    {JSON.stringify(
                      route.properties["정상포함"].select.name
                    ).slice(1, -1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 로딩 상태
        <div>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Link to="/">back</Link>
    </div>
  );
}

export default Result;
