import ErrorHandler from '../middlewares/error.js';
import {Task} from '../models/task.js'

export const newTask = async (req, res, next) =>{
    try {
        const {title, description} = req.body;
    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: "Task Added Succesfully"
    })
    } catch (error) {
        next(error)
    }
};


export const getMyTask = async(req, res, next)=>{
    try {
        const userId = req.user._id;
    const task = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        task,
    }) 
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req, res, next)=>{
    try {
        
    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task Not Found", 404))

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        messege: "task updted!",
    }) 
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async(req, res, next)=>{

    try {
        const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task Not Found", 404))

    await task.deleteOne();

    res.status(200).json({
        success: true,
        messege: "task deleted!",
    }) 
    } catch (error) {
        next(error);
    }
}