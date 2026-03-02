import axios from "axios";

const BASE_URL = "https://backend-demo-b36h.onrender.com";
const PROXY_URL = "http://localhost:3001";

async function request(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`API ${resp.status}: ${text || resp.statusText}`);
  }

  return resp.json();
}


// existing APIs
export async function getHomeMetrics() {
  return request("/api/home/metrics");
}

export async function getStartupsData() {
  return request("/api/startups/data");
}

export async function getStartupsFlags() {
  return request("/api/startups/componentFlags");
}

export async function getFranchiseData() {
  return request("/api/franchise/data");
}

export async function getFranchiseFlags() {
  return request("/franchise/componentFlags");
}


// ---------------------------
// NEW PROXY APIs (FIXED)
// ---------------------------

export const fetchFranchiseHome = async () => {
  const response = await axios.get(
    `${PROXY_URL}/api/franchises/home`,
    {
      headers: {
        Accept: "application/json",
        "X-Lang": "en",
      },
    }
  );

  return response.data;
};


export const fetchFranchiseListing = async (industry, page) => {
  const response = await axios.get(
    `${PROXY_URL}/api/franchises/listing`,
    {
      params: {
        industry: industry.toLowerCase() || "fashion",
        page: page || 1,
      },
      headers: {
        Accept: "application/json",
        "X-Lang": "en",
      },
    }
  );

  return response.data;
};

export const fetchFranchiseDetails = async (slug) => {
  const finalSlug = slug || "chai-point";

  const response = await axios.get(
    `${PROXY_URL}/api/franchises/detail/${finalSlug}`,
    {
      headers: {
        Accept: "application/json",
        "X-Lang": "en",
      },
    }
  );

  return response.data;
};

export const searchFranchise = async (query) => {
  const response = await axios.get(
    `${PROXY_URL}/api/franchises/search`,
    {
      params: { query },
      headers: {
        Accept: "application/json",
        "X-Lang": "en",
      },
    }
  );

  return response.data;
};


export { BASE_URL, PROXY_URL, request };