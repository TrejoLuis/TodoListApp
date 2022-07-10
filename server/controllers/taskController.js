const errorHandler = require('../middlewares/errorHandler');
const Task = require('../models/taskModel');

//@ route GET /api/tasks
const getAllTasks = async (req, res) => {
    try{
        const tasks =  await Task.find();
        res.status(200).json(tasks);
    } catch(error){
        res.status(500).json({ 'message': error.message});
    }
}

//@ route GET /api/tasks/:id
const getTask  = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findById(id);
        if(!task)
            return res.status(204).json({message: `Task ID ${id} not found.`});
        
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({message: error.message});
    }

}

//@ route POST  /api/tasks
const createNewTask = async (req, res) => {
    if(!req.body.text){
        return res.status(400).json({message: 'text is required'});
    }
    try{
        const task = await Task.create({
            text: req.body.text
        });
        res.status(201).json(task);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

//@ route PUT /tasks/:id
const updateTask = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findById(id);
        if(!task)
            return res.status(204).json({message: `Task ID ${id} not found.`});
        await Task.findByIdAndUpdate(id,
            req.body, {
                new: true
            });
        res.status(200).json({ message: `Update task ${id}`});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

}

//@ route DELETE /tasks/:id
const deleteTask = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findById(id);
        if(!task){
            return res.status(204).json({message: `Task ID ${id} not found.`});
        }

        await Task.deleteOne(task);

        res.status(200).json({message:`Delete task ${id}`});

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
    getTask
};