const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task =  mongoose.model('Task', taskSchema);

module.exports = Task;
