//Import Required Modules:
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Setup Express App:
const app = express();
const port = 3000;
const API_URL = "https://api.coingecko.com/api/v3/simple/price";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

//Create Endpoint to Fetch and Display Bitcoin Price:
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}?ids=bitcoin&vs_currencies=usd`);
        const btcPrice = response.data.bitcoin.usd;
        res.render("index.ejs", { price: btcPrice });
    } catch (error) {
        console.error("Error fetching Bitcoin price:", error.response ? error.response.data : error.message);
        res.render("index.ejs", { price: "Error fetching price" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
