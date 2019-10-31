const request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url1 = 'https://api.darksky.net/forecast/4b4400f1032c505007f46918b86e9004/'+latitude+','+longitude+'?units=si'

    request({url: url1, json:true}, (error, {body}) => {
        if(error){
            callback('Error unable to connect to the weather services', undefined)
        }else if(body.code){
            callback('Error invalid input', undefined)
        }else {
            callback(undefined, {
                temperature: 'It is currently ' + body.currently.temperature + ' degree Celcius out.',
                rain: body.currently.precipProbability,
                place: body.timezone,
                condition: body.currently.summary
            })
        }
    })

}


module.exports = forecast