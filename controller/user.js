require('express-async-errors');
const User = require('../model/user');

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.destroy({
            where: {
                id,
            },
        });

        if (!user) throw new Error('user with id not find');

        res.status(204).json({});
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        let user = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        user = await User.findByPk(user[0]);

        if (!user) throw new Error('user with id not find');

        res.status(200).json(user);
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
    const offset = (page - 1) * limit;
    const user = await User.findAndCountAll({
        limit,
        offset,
    });
    res.status(200).json({
        page,
        per_page: limit,
        total: user.count,
        total_pages: Math.ceil(user.count / limit),
        data: user.rows,
    });
};

exports.getOne = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({});
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
