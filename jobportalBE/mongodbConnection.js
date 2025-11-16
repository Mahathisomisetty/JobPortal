var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://faang:hello123@cluster0.oliwn67.mongodb.net/Sample?appName=Cluster0")
.then(()=>{
    console.log("mongodb connected");
}).catch(()=>{
    console.log("not connected");
})