import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const openai = new OpenAI({ apiKey: process.env.AIAPIKEY });

    // Get uploaded image from request body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const imageBuffer = Buffer.concat(chunks);

    // Send image to OpenAI Vision model
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Classify this trash: recycling, compost, landfill only." },
            { type: "input_image", image: imageBuffer.toString("base64") }
          ]
        }
      ]
    });

    const answer = response.choices[0].message.content;
    res.status(200).json({ result: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI classification failed" });
  }
}
