const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const bodyParser = require("body-parser");
const logic = require('./logic.js')
const db = require('./db.js')
const cors = require('cors')

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data
app.use(cors())
//GET GENERAL TOKEN
app.get('/token', async (req, res) => {
    const token = await logic.getToken();
    res.send(token);
});
/*
//RECOMMENDATIONS
app.post("/search", async (req, res) => {
    const id = await logic.getArtistId(req.body.token, req.body.artist);
    const recomendations = await logic.getRecs(req.body.token, id, req.body.filters);
    res.send(recomendations);
})
*/

//LOCATION BASED TRACKS
app.post('/nearby', async (req, res) => {
    try {
        console.log('request recieved for ' + req.body.location)
        let length = req.body.span
        let locationResp = await logic.getLocationID(req.body.location)
        if (!locationResp) {
            console.log('location not found')
            res.send({ err: 'location not found' })
        }
        else {
            let locationObj = JSON.parse(locationResp)
            let cachedResults = await db.check({ length: req.body.span, code: (locationObj.id).toString() })
            if (cachedResults) {
                console.log('cache hit!')
                res.send(cachedResults)
            }
            else {
                console.log('cache miss')
                let artistsResp = await logic.getNearbyArtists(locationResp, req.body.token, length)
                let tracksResp = await logic.getTracks(artistsResp, req.body.token)
                tracksResp['length'] = req.body.span
                tracksResp['location'] = (locationObj.id).toString()
                let success = await db.insert(tracksResp)
                if (success) {
                    console.log('upload success')
                    res.send(tracksResp)
                }
                else {
                    console.log('upload failed')
                    res.send({ err: 'upload failed' })
                }
            }
        }
    }
    catch (error) { console.log(error) }
})

app.listen(3001, () => console.log('Server listening on port 3001'));





/*
fs.writeFile("./testData.json", JSON.stringify(tracksResp), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
*/