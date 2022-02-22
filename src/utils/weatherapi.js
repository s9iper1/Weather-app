const request = require('postman-request')

const apirequest = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f3bffa3359d87e05a261377a561ce2ff&query='+latitude+','+longitude+'&units=m'
    // console.log(url)

    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('unable to connect to api service.', undefined)
        } else {
            console.log(body.success)
            if(body.hasOwnProperty('success')) {
                callback("please check coordinates", undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0]+' There is ' +body.current.temperature + ' degree outside and it feels like '+body.current.feelslike+' degree and '
                +body.current.precip+ '% chance of rain and humidity is ' + body.current.humidity + '% ')
            }
        }
    })
}

module.exports = apirequest