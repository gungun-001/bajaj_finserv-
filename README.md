# BFHL API Backend

This is a Node.js/Express backend for the Bajaj Finserv Health Ltd (BFHL) qualifier task.

## Features

- **GET /health**: Returns operational status.
- **POST /bfhl**: Handles specific operations based on input keys:
    - `fibonacci`: Returns the first N numbers of the Fibonacci series.
    - `prime`: Returns prime numbers from an input array.
    - `lcm`: Returns the LCM of an input array.
    - `hcf`: Returns the HCF of an input array.
    - `AI`: Returns a single-word answer to a question using Google Gemini AI.

## Setup Instructions

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    - Build a `.env` file in the root directory.
    - Add the following variables:
        ```env
        PORT=3000
        EMAIL=user@chitkara.edu.in
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    - **Note**: Get your Gemini API key from [Google AI Studio](https://aistudio.google.com).

4.  **Run the server**:
    ```bash
    npm start
    ```
    The server will start at `http://localhost:3000`.

## API Usage Examples

### 1. Health Check
**Request:** `GET /health`
**Response:**
```json
{
  "is_success": true,
  "official_email": "user@chitkara.edu.in"
}
```

### 2. Fibonacci
**Request:** `POST /bfhl`
```json
{ "fibonacci": 7 }
```

### 3. Prime Numbers
**Request:** `POST /bfhl`
```json
{ "prime": [2, 4, 7, 9, 11] }
```

### 4. AI Question
**Request:** `POST /bfhl`
```json
{ "AI": "What is the capital of France?" }
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "user@chitkara.edu.in",
  "data": "Paris"
}
```

## Deployment

### Vercel
1.  Install Vercel CLI: `npm _i -g vercel`
2.  Run `vercel` and follow prompts.

### Render
1.  Connect your GitHub repository.
2.  Set Build Command: `npm install`
3.  Set Start Command: `node index.js`
