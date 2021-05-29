const path = require('path')
const express = require('express')
const hbs = require('hbs')

//requiring geocode
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Antonio Chelala'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Antonio Chelala'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is the help section.',
        name: 'Antonio Chelala'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    // = {} is the empty object default value

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'Sunny',
    //     location: 'New york',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // by using return we are stopping the function
            error: 'You must provide a search term'
        })
    } // or we could add an else to avoid the error "Cannot set headers after they are sent to the client"
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Antonio Chelala',
        errorMessage: 'Help article not found'
    })
})

//match anything that has not been matched so far => this is the meaning of the wildcard *
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Antonio Chelala',
        errorMessage: 'Page not found',
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})