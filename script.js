document.getElementById("demoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const image = document.getElementById("trashImage").files[0];
  if (!image) {
    alert("Please upload an image.");
    return;
  }

  const resultBox = document.getElementById("result");
  resultBox.textContent = "Processing...";

  const response = await fetch("/api/classify", {
    method: "POST",
    body: image,
  });

  const data = await response.json();

  if (data.error) {
    resultBox.textContent = "Error: " + data.error;
  } else {
    resultBox.textContent = "Result: " + data.result;
  }
});