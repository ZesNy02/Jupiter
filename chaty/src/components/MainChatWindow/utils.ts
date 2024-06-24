const BASE_URL = "http://localhost:3000/";

export const sendRequest = async (
  route: string,
  data: { prompt: string } | { id: number; rating: number }
) => {
  const TIMEOUT = 120 * 1000; // 120 seconds

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve({ status: "timeout" }), TIMEOUT);
  });

  const fetchPromise = fetch(BASE_URL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Network error:", error);
      return { status: "network error" };
    });

  const result = await Promise.race([fetchPromise, timeoutPromise]);

  if (result.status === "timeout") {
    console.log("Request timed out");
    return null;
  }

  if (result.status === "network error") {
    console.log("Network error occurred");
    return null;
  }

  return result;
};
