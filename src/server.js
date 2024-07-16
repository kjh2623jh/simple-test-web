const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const notion = new Client({
  auth: "secret_tceQ4JUkB7qfSCdhTstWa5CowlkH1S4cMcxvnwF5G21",
});

const databaseId = "e33d0d3ad5764d6f83572a11508d40b8";

app.get("/notion-data", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
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
