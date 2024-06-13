const mongoose = require("mongoose");
const URL = process.env.DATA_BASE_URL

const dbConnect = async () => {
    try {
        const conn = mongoose.connect(URL);
        console.log(`Database connected to host:${(await conn).connection.host}`)
    } catch (error) {
        console.log("Error => ", error)
    }
}

module.exports = dbConnect;