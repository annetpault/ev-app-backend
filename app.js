const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://annet-paul:annet123@ac-rrnjxoo-shard-00-00.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-01.bcqym4j.mongodb.net:27017,ac-rrnjxoo-shard-00-02.bcqym4j.mongodb.net:27017/evdb?ssl=true&replicaSet=atlas-stpu0i-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("mongodb connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)


const Vehicle=mongoose.model("Vehicles",new mongoose.Schema(
    {
        bookId: String,
        ownerName: String,
        email: String,
        phone: String,
        regNo: String,
        vehBrand: String,
        vehModel: String,
        battery: String,
        type: String,
        date: String,
        time: String,
        units: String,
        bayNum: String
    }
))

app.post("/view-vehicle",async(req,res)=> {
    const vehicles=await Vehicle.find()
    res.json(vehicles);
});

app.post("/add-vehicle",async (req,res) => {
    await Vehicle.create(req.body)
    res.json({"status":"success"});
});

app.listen(4000, ()=> {
    console.log("server started")
});