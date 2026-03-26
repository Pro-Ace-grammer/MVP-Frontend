import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

const BASE_URL = "http://3.109.151.16:8080/api/v1/franchises";
const AUTH_BASE_URL = "http://3.109.151.16:8080/api/v1/auth";

app.use(express.json()); // Enable JSON body parsing for login requests

// 🔑 Auth endpoints
app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Auth Login Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Login failed" });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/logout`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Auth Logout Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Logout failed" });
  }
});


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


// 5️⃣ Industries endpoint
app.get("/api/franchises/industries", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/industries`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch industries" });
  }
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`✅ Proxy running on http://localhost:${PORT}`);
});