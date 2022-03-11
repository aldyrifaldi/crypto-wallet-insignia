const {Prisma, PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
require('dotenv').config()

module.exports = {
    store: async (req,res) => {
        try {

            // create user
            const user = await prisma.User.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password,10)
                },
                 include: {
                    balanceLogs: true, // populate model BalanceLog relation
                    transfers: true, // populate model Transfer relation 
                },
            })

            // generate JWT Token
            const token = 'Bearer ' + jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 86400 //24h expired
            });

            // response if create success
            return res.json({
                status: "success",
                data: {
                    username: user.username,
                    email: user.email,
                    balance: user.balance,
                    transfers: user.transfers,
                    balance_logs: user.balanceLogs,
                    access_token: token,
                }
            },201)
            
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // if prisma validation fail
                if (e.code === 'P2002') {
                    return res.json({
                        status: "validation error",
                        errors: e
                    },402)
                }
            }
            // other error response
            return res.json({
                status: "error",
                errors: e
            },500)
        }
    },
}