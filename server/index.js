// index.cjs (CommonJS syntax)
import generate from "./generate.js";

const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

  
app.post("/generate", async (req, res) => {
    const queryDescription = req.body.queryDescription;
    try {
        const sqlQuery = await generate(queryDescription);
        res.json({ sqlQuery });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
