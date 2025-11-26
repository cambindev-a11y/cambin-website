const form = document.getElementById("demoForm");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trashName = document.getElementById("trashName").value;
  const file = document.getElementById("trashImage").files[0];

  if (!file) return alert("Please upload an image!");

  // Show processing message immediately
  resultBox.textContent = "Processing...";

  const reader = new FileReader();
  reader.onload = async () => {
    const imageBase64 = reader.result.split(",")[1];

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trashName, imageBase64 })
      });

      const data = await res.json();

      if (data.result) {
        resultBox.textContent = data.result;
      } else if (data.error) {
        resultBox.textContent = `Error: ${data.error}`;
      }
    } catch (err) {
      resultBox.textContent = "Error contacting AI API";
      console.error(err);
    }
  };

  reader.readAsDataURL(file);
});
