const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user").then(() => {
    console.log("connected to mongoDB");
})

app.use(express.json())

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: Number
    },
})

const userModel = mongoose.model("userdata", userSchema)

app.get("/alluser", async (req, res) => {
    const data = await userModel.find({})
    res.json({ status: "success", data })
})

app.post("/adduser", async (req, res) => {
    const data = userModel.create(req.body)
    res.json({ status: "success" })
})

app.put("/updateuser/:id", async (req, res) => {
    try {
        const data = await userModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

app.delete("/deleteuser/:id", async (req, res) => {
    const data = await userModel.findByIdAndDelete({ _id: req.params.id })
    res.json({ success: "deleted successfully", data })
})

app.listen(4000, () => {
    console.log("server started on port 4000");
})