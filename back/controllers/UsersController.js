const prisma = require("../config/prisma");
const { use } = require("../routes/start");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
    async getMyProfile(req, res) {
        const user = req.user;
        return res.status(200).send(user);
    }

    async index(req, res) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    email: true,
                    name: true,
                }
            });
            return res.status(201).send(users);
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }

    async store(req, res) {
        try {
            const body = req.body;
            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: await hashPassword(body.password)
                },
                select: {
                    email: true,
                    name: true,
                }
            })
            return res.status(201).send(user);
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }

    async show(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    email: true,
                    name: true,
                }
            })
            return res.status(201).send(user);
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const body = req.body;
            const id = parseInt(req.params.id);
            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    lastHouse: body.house,
                }
            })
            return res.status(201).send(user);
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }

    async getHouse(req, res){
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })
        return res.status(201).send({
            house: user.lastHouse
        });
    }

    async destroy(req, res) {
        try {
            const body = req.body;
            const id = parseInt(req.params.id);
            const user = await prisma.user.delete({
                where: {
                    id: id,
                },
                select: {
                    email: true,
                    name: true,
                }
            })
            return res.status(201).send("Sucessfully deleted user");
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}

module.exports = new UsersController();