const path = require('path')
const express = require('express');
const { set } = require('express/lib/application');
const hsb = require('hbs');
const res = require('express/lib/response');
const geocode = require('./utils/geocoding')
const apirequest = require('./utils/weatherapi')

const app = express()

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

//Define paths for express config
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hsb.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App", 
        name: "Bilal"
    })
} )

app.get('/about', (req,res) =>{
    res.render('about', {
        title: "About Page", 
        name: 'Bilal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page', 
        name: 'Bilal',
        title1: 'Title One', 
        description1: 'This is title one description',
        title2: 'Title Two', 
        description2: 'This is title Two description', 
        title3: 'Title Three', 
        description3: 'This is title Three description', 
        title4: 'Title Four', 
        description4: 'This is title Four description'
    })
})

// app.get('', (req, res) => {
//     res.send("<h1>Weather</h1>")
// })


// app.get('/api/help', (req, res) => {
//     res.send({
//         name: 'bilal', 
//         age: 29,
//         education: '16 yrs'
//     })
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>")
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please enter address'
        })
    } else {
        geocode(req.query.address, (error, {lattitude, longitude} = {})=> {
            if (error) {
                return res.send({
                    error
                })
            }
            // console.log("geocode error "+error, lattitude)
            // console.log("geocode error "+error, longitude)
            apirequest(lattitude, longitude, (error, data) => {
                console.log("error "+error);
                console.log("data "+data);
                if (error) {
                    return res.send({
                        error
                    })
                }
                return res.send({
                    data: data,
                    address: req.query.address
                })
            })
        })
    }
})


app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'you must provide the search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*' , (req, res) => {
    res.render('404', {
        title: "404 Not Found", 
        message: 'Help article ', 
        name: ' Bilal'
    })
})

app.get('*' , (req, res) => {
    res.render('404', {
        title: "404 Not found", 
        message: 'Target Page ', 
        name: ' Bilal'
    })
})

app.listen(3000, '0.0.0.0',() => {
    console.log("Server is up and running at port 3000")
})
