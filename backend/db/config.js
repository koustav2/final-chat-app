
const {connect} = require('mongoose');

const connectDB = async () => {
    try {
        const instance = await connect(`${process.env.MONGODB_URI}`);
       
        console.log(instance.connection.readyState);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = { connectDB };
