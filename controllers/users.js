import Users from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}