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

const notion = new Client({
  auth: "secret_tceQ4JUkB7qfSCdhTstWa5CowlkH1S4cMcxvnwF5G21",
});
const databaseId = "e33d0d3ad5764d6f83572a11508d40b8";
const conditions = [
  {
    property: "소요시간",
    select: {
      equals: "1시간(-500kcal)",
    },
  },
  {
    property: "난이도(경사)",
    select: {
      equals: "2 (무난한 숲길)",
    },
  },
  {
    property: "노면상태",
    multi_select: {
      contains: "흙길 경사로",
    },
  },
  {
    property: "접근성",
    select: {
      equals: "역.버스정류장 도보10분내",
    },
  },
  {
    property: "정상포함",
    select: {
      equals: "정상포함+정상석",
    },
  },
];

app.get("/notion-data", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: conditions,
      },
      /*
      sorts: [
        {
          timestamp: "소요시간",
          direction: "descending",
        },
      ],
      */
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
