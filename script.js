const form = document.getElementById("demoForm");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trashName = document.getElementById("trashName").value;
  const file = document.getElementById("trashImage").files[0];

  if (!file) return alert("Upload an image");

  // Convert image to base64
  const reader = new FileReader();
  reader.onload = async () => {
    const imageBase64 = reader.result.split(",")[1];

    const res = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashName, imageBase64 })
    });

    const data = await res.json();
    resultBox.textContent = data.result || data.error;
  };
  reader.readAsDataURL(file);
});
