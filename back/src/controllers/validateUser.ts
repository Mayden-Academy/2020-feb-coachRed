import express = require('express')
import Coach from '../models/coachModel'
import mongoose = require('mongoose')
import * as jwt from 'jsonwebtoken'

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.header('Authorization')) {
        return res.status(403).json({
            status: 'fail',
            message: 'Credentials not recognised - no header'
        })
    }
    const bearerToken = req.header('Authorization').split(' ')[1]
    Coach.findOne({token: bearerToken}).then((coach: any) => {
        try {
            if (bearerToken == coach.token) {
                const tokenData: any = jwt.verify(bearerToken, process.env.SECRET)
                const newToken = jwt.sign({
                    email: tokenData.email, 
                    password: tokenData.password
                }, process.env.SECRET, {
                    expiresIn: 1800
                })
                coach.token = newToken;
                coach.save().then( () => {
                    req.headers['authorization'] = 'Bearer ' + newToken
                    next()
                })
            } else {
                return res.status(403).json({
                    status: 'fail',
                    message: 'Credentials not recognised - jwt failed to verify'
                })
            }
        } catch(err) {
            return res.status(403).json({
                status: 'fail',
                message: 'Credentials not recognised - other error',
                data: {
                    error: err
                }
            })
        }
    })
}