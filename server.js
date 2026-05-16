const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname))

mongoose.connect("mongodb://127.0.0.1:27017/brightcorp")
    .then(() => console.log("MongoDB Connected"))


const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
})

app.post("/contact", async (req, res) => {
    try {
        await Contact.create(req.body)
        res.json({ message: "Message Saved Successfully" })
    } catch (err) {
        console.error("Contact save error:", err)
        res.status(500).json({ message: "Error saving data" })
    }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(5000, () => {
    console.log("Running on http://localhost:5000")
})