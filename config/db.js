const mongoose = require("mongoose")
const dns = require("node:dns/promises");


const connectDb = async() => {
    try {
        console.log(await dns.getServers());
        dns.setServers(["1.1.1.1"]);
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = connectDb