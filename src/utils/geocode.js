const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaWhhcnNoYWdyYWhhcmkiLCJhIjoiY2p5eXRybTdqMDZnczNobXJ5Z2dwOThiZSJ9.VdO2GI5bPPPr9Zb7F-UhJw&limit=1'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Error unable to connect', undefined)
        }else if(body.features.length === 0){
            callback('Error unable to find location', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode