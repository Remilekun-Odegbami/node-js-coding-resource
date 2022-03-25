const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch})=> fetch(...args))
router.use(express.static('public'))

const resourceRoutes = require('./api/resourceRoutes')

router.use('/resources', resourceRoutes)

// home route 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/codingresources/codingResources'
    fetch(URL)
        .then(res=> res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Home',
                name: 'resources',
                data
            })
        })
})

router.get('*', (req, res)=> {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error',
            name: '404 Error'
        })
    }
})

module.exports = router