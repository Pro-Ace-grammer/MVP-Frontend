import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

const BASE_URL = "http://3.109.151.16:8080/api/v1/franchises";


// 1️⃣ Listing endpoint
app.get("/api/franchises/listing", async (req, res) => {
  try {
    const { industry, page } = req.query;

    const response = await axios.get(`${BASE_URL}/listing`, {
      params: { industry, page },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});


// 2️⃣ Home endpoint
app.get("/api/franchises/home", async (req, res) => {
  try {
    console.log(`📡 Fetching home data from: ${BASE_URL}/home`);
    const response = await axios.get(`${BASE_URL}/home`);
    console.log("✅ Successfully fetched home data");
    // console.log("Response data sample:", JSON.stringify(response.data).substring(0, 500));
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching home data:", error.message);
    res.status(500).json({ error: "Failed to fetch home data" });
  }
});


// 3️⃣ Search endpoint
app.get("/api/franchises/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch search data" });
  }
});


// 4️⃣ Detail endpoint
app.get("/api/franchises/detail/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const response = await axios.get(`${BASE_URL}/detail/${slug}`);

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch detail data" });
  }
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`✅ Proxy running on http://localhost:${PORT}`);
});