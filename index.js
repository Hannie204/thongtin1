import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
const app = express();

// Webhook URL
const webhookURL = "https://discord.com/api/webhooks/1089726987104428062/AnZ-7kUxSVKBq3Yo6eqlsWc3gCHn243zfFadgC5ZDKrfbbfuT5y_7vyq_Mlji5x4a11v";

// Serve static files
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Handle GET request for homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Handle POST request for form submission
app.post('/send_data', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  // Create message embed
  const embed = {
    "title": "Thông tin người dùng",
    "description": `Tên: ${name}\nTuổi: ${age}`,
    "color": 16711680 // Red color
  };

  // Create payload with message embed
  const payload = {
    "embeds": [embed]
  };

  // Send webhook
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.status == 204) {
      res.sendFile(path.resolve('public/success.html'));
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send('Internal server error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

