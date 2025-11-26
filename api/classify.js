import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const openai = new OpenAI({ apiKey: process.env.AIAPIKEY });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { trashName, imageBase64 } = req.body;

    if (!trashName || !imageBase64) {
      return res.status(400).json({ error: "Missing trash name or image" });
    }

    // Send image + text to GPT-4o-mini
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Classify this trash: ${trashName}. Options: recycling, compost, landfill. Image is provided.`
        }
      ],
      // new field for the image
      input_image: imageBase64
    });

    const answer = response.choices[0].message.content;
    res.status(200).json({ result: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI classification failed", details: err.message });
  }
}

