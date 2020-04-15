const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const bodyParser = require("body-parser");
const logic = require('./logic.js')

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data

//GET GENERAL TOKEN
app.get('/token', async (req, res) => {
    const token = await logic.getToken();
    res.send(token);
});

//RECOMMENDATIONS
app.post("/search", async (req, res) => {
    const id = await logic.getArtistId(req.body.token, req.body.artist);
    const recomendations = await logic.getRecs(req.body.token, id, req.body.filters);
    res.send(recomendations);
})

//LOCATION BASED TRACKS
app.post('/nearby', async (req, res) => {
    try {
        console.log(req.body.location)
        let locationResp = await logic.getLocationID(req.body.location)
        let artistsResp = await logic.getNearbyArtists(locationResp, req.body.token)
        let tracksResp = await logic.getTracks(artistsResp, req.body.token)
        res.send(tracksResp)
    }
    catch (error) { console.log(error) }
})

app.listen(3000, () => console.log('Server listening on port 3001'));
