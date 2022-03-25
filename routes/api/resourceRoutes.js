const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/codingresources/codingResources')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All resources
// localhost:3000/resources/ 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/codingresources/codingResources'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/resources', {
                title: 'Coding Resources',
                name: 'Some Coding Resources',
                data
            })
        })
})

// single-Beer 
// localhost:3000/resources/:id 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/codingresources/codingResources/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-resource', {
                    title: `${data.description}`,
                    name: `${data.description}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// localhost:3000/resources/name
// router.get('/resources/:name', (req, res)=> {
//     const name = req.params.name 
//     const URL = 'https://api.sampleapis.com/codingresources/codingResources'

//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             for (let i = 0; i < data.name.length; i++) {
//                 if (resources == data.name[i]) {
//                     res.render('pages/resources', {
//                         title: description,
//                         name: description,
//                         data
//                     })
//                 }
//             }
//         })

// })

module.exports = router