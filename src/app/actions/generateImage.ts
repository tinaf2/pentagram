"use server";

export async function generateImage(text: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/generate-image`, {
      // Making fetch request to internal API
      method: "POST",
      headers: {
        // Can't see headers if running on the server (as opposed to the client) - more secure
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY || "",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}
