//Import Required Modules:
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


console.log("--- DEBUG: index.js loaded and running! ---");

//Setup Express App:
const app = express();
const port = 3000;
const API_URL = "https://api.coingecko.com/api/v3/simple/price";

// Add a simple healthcheck endpoint (KEEP THIS ONE)
app.get("/health", (req, res) => {
    res.status(200).send("OK - Healthcheck");
});

// --- REMOVE THE app.get("/", (req, res, next) => { ... }); BLOCK HERE ---
// Make sure your original app.get("/") is the only one for root.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

//Create Endpoint to Fetch and Display Bitcoin Price:
// This should be your ONLY app.get("/") handler
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

app.listen(port, '0.0.0.0', () => {
    console.log(`BTC API app listening on port ${port} with healthcheck!`);
});