import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
const app = express();

const webhookURL = "https://discord.com/api/webhooks/1089726987104428062/AnZ-7kUxSVKBq3Yo6eqlsWc3gCHn243zfFadgC5ZDKrfbbfuT5y_7vyq_Mlji5x4a11v";

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.post('/send_data', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  //  message embed
  const embed = {
    "title": "Thông tin người dùng",
    "description": `Tên: ${name}\nTuổi: ${age}`,
    "color": 16711680 // Red
  };

  const payload = {
    "embeds": [embed]
  };

  // Send 
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

