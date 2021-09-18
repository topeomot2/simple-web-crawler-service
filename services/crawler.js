const axios = require('axios')

async function getContent(url) { 
    try {
        let response  = await axios(url)
        return response.data
    } catch (error) {
        return null
    }
    
    
 }

 module.exports = {
     getContent
 }