const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicdir = path.join(__dirname, '../public')
const templatesDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',templatesDir)
hbs.registerPartials(partialsPath)

//Setup for static pages
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'tejal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, {temperature, condition,  rain}) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                temperature,
                condition,
                rain,
                place,
                address: req.query.address
            })

        })

    })

})





app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('server is running')
})
