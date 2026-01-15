const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_PATH = path.join(__dirname, "Data");

/* REGISTER USER */
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    fs.appendFileSync(
        path.join(DATA_PATH, "User Credentials.txt"),
        `${username},${password}\n`
    );

    res.json({ success: true });
});

/* LOGIN (USER OR ADMIN) */
app.post("/login", (req, res) => {
    const { username, password, isAdmin } = req.body;
    const fileName = isAdmin ? "Admin.txt" : "User Credentials.txt";

    const fileData = fs.readFileSync(
        path.join(DATA_PATH, fileName),
        "utf-8"
    );

    const isValid = fileData
        .split("\n")
        .some(line => line.trim() === `${username},${password}`);

    res.json({ success: isValid });
});

/* SUBMIT VOTE */
app.post("/vote", (req, res) => {
    const { username, vote } = req.body;

    fs.appendFileSync(
        path.join(DATA_PATH, "Votes.txt"),
        `${username},${vote}\n`
    );

    res.json({ success: true });
});

/* ADMIN VIEW VOTES */
app.get("/votes", (req, res) => {
    const votes = fs.readFileSync(
        path.join(DATA_PATH, "Votes.txt"),
        "utf-8"
    );
    res.send(votes);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
