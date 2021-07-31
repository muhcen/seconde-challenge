require('express-async-errors');
const User = require('../model/auth');

exports.register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) throw new Error('Missing password or email');
        const user = await User.create(req.body);
        await user.save();
        const token = await user.createJwt();
        res.status(200).json({
            id: user.id,
            token,
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            error: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Missing password or email');
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password)))
            throw new Error('email or password not match');

        const token = await user.createJwt();
        res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message,
        });
    }
};

exports.getAll = async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 6;
    const delay = req.query.delay ? req.query.delay : 0;
    const offset = (page - 1) * limit;
    const user = await User.findAndCountAll({
        limit,
        offset,
    });
    setTimeout(() => {
        res.status(200).json({
            page,
            per_page: limit,
            total: user.count,
            total_pages: Math.ceil(user.count / limit),
            data: user.rows,
        });
    }, delay * 1000);
};

exports.getOne = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) throw new Error('user with id not found');
        res.status(200).json({
            date: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message,
        });
    }
};
