const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiczlpcGVyMSIsImEiOiJja3d3M3N1cGQyNjQzMnhtbm5kMG81bnF6In0.2dTWzs-zy9Vr3-huJotjiA&limit=1'
    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback("please check the coordinates",  undefined);

        } else {
            if(body.features.length > 0) {
                const lattitude = body.features[0].center[1]
                const longitude = body.features[0].center[0]
                // console.log(lattitude)
                // console.log(longitude)
                callback(undefined, {lattitude: body.features[0].center[1], longitude: body.features[0].center[0], location: body.features[0].place_name })

            } else {
                callback('Wrong location entered, Try another location', undefined)

            }
        }
    })
}
module.exports = geocode