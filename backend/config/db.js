import mongoose from "mongoose"

const connetDB = () => {
    mongoose.connect(process.env.PORT_URI)
        .then(() => console.log('Connect to mongoDB'))
        .catch(error => {
            console.log(error)
        })
}

export default connetDB