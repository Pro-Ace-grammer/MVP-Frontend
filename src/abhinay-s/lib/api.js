import axios from "axios";

const PROXY_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_PREFIX = import.meta.env.VITE_API_URL ? "/api/v1" : "/api";

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
    `${PROXY_URL}${API_PREFIX}/franchises/home`,
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
    `${PROXY_URL}${API_PREFIX}/franchises/listing`,
    {
      params: {
        industry: industry?.toLowerCase() || "food", // Default to food if null
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
    `${PROXY_URL}${API_PREFIX}/franchises/detail/${finalSlug}`,
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
    `${PROXY_URL}${API_PREFIX}/franchises/search`,
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

export const fetchIndustries = async () => {
  const response = await axios.get(
    `${PROXY_URL}${API_PREFIX}/franchises/industries`,
    {
      headers: {
        Accept: "application/json",
        "X-Lang": "en",
      },
    }
  );

  return response.data;
};


export { BASE_URL, PROXY_URL, request };