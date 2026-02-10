const axios = require("axios");

// ---------------- FIBONACCI ----------------
function getFibonacci(n) {
  if (typeof n !== "number" || n <= 0) return [];
  if (n === 1) return [0];

  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

// ---------------- PRIME ----------------
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getPrimes(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter((n) => typeof n === "number" && isPrime(n));
}

// ---------------- HCF ----------------
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function getHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr.reduce((acc, curr) => gcd(acc, curr));
}

// ---------------- LCM ----------------
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function getLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr.reduce((acc, curr) => lcm(acc, curr));
}

// ---------------- AI (GROQ) ----------------
async function getAIResponse(question, apiKey) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `${question}. Answer in exactly one word.`,
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;
    return text.trim().split(/\s+/)[0];

  } catch (error) {
    console.error("GROQ ERROR:", error.response?.data || error.message);
    throw new Error("AI service unavailable");
  }
}


module.exports = {
  getFibonacci,
  getPrimes,
  getHCF,
  getLCM,
  getAIResponse,
};
