const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");

const app = express();
const port = 3001;
const corsOptions = {
  origin: [, "http://localhost:3000", `http://localhost:${port}`],
};

app.use(cors(corsOptions));
app.use(express.json());

// API Key, database id
const notion = new Client({
  auth: "secret_tceQ4JUkB7qfSCdhTstWa5CowlkH1S4cMcxvnwF5G21",
});
const databaseId = "e33d0d3ad5764d6f83572a11508d40b8";

// properties
const properties = [
  "5시간 이상(2500kcal-)",
  "4시간(-2000kcal)",
  "3시간(-1500kcal)",
  "2시간(-1000kcal)",
  "1시간(-500kcal)",
  "1 (아주평탄산책코스)",
  "2 (무난한 숲길)",
  "3 (약간경사의 등산로)",
  "4 (가파른 등산로)",
  "5 (매우가파른 등산로)",
  "흙길 경사로",
  "목재계단",
  "돌계단",
  "가파른 암릉",
  "역.버스정류장 도보10분내",
  "역.버스정류장 도보30분내",
  "차.택시.안내버스 이용",
  "정상포함(정상석X)",
  "정상포함+정상석",
  "미포함",
];
const sections = ["소요시간", "난이도(경사)", "노면상태", "접근성", "정상포함"];

app.get("/notion-data/:result", async (req, res) => {
  const result = req.params.result;
  let conditions = [[], [], [], [], []];

  // result에 따른 condition filter
  for (let i = 0; i < result.length; i += 2) {
    const idx = Number(result[i]) - 1;
    const propertyIdx = parseInt(result[i + 1], 20);

    // 받아온 result값에 따라 filter condition 채우기
    if (idx == 2) {
      // "노면상태" 인 경우 multi_select 를 써야함
      conditions[idx].push({
        property: sections[idx],
        multi_select: {
          contains: properties[propertyIdx],
        },
      });

      continue;
    }
    conditions[idx].push({
      property: sections[idx],
      select: {
        equals: properties[propertyIdx],
      },
    });
  }

  const filter = {
    and: conditions.map((conditions) => ({ or: conditions })),
  };

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: filter,
      page_size: 4, // 결과 최대 갯수
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Notion API에서 데이터를 가져오는 중 오류가 발생했습니다.");
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
