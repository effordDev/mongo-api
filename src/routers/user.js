const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const sharp = require('sharp')
const multer = require('Multer')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg, jpeg, or png'))
        }

        cb(undefined, true)
    }
})

router.get('/users/me', auth, async (req, res) => {

   res.send(req.user)
})

router.post('/users', async (req, res) => {
    
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken() 
        res.status(201).send({user, token}) 
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login' , async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('You have logged out of this device.')
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/users/logoutAll', auth, async (req, res) => {

    try {
        req.user.tokens = []

        await req.user.save()

        res.send('You have logged out of all devices.')
    } catch (error) {
        res.status(500).send(error)
    }

})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates =['name', 'email', 'password', 'age']

    const isValidOperation = updates.every(update => allowedUpdates.includes(update)) 

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid updates'})
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save()
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async ( req, res) => {
    try {
        
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.send(200)
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send(200)
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router