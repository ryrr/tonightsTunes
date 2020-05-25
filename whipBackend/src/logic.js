const config = require('./config.json')
const got = require('got')
const ColorThief = require('colorthief');
const moment = require('moment')

exports.getToken = async () => {
    console.log('getting token....')
    let options = config.spotify.tokenOptions
    let tokenUrl = config.spotify.tokenURL
    try {
        let resp = await got.post(tokenUrl, options)
        result = JSON.parse(resp.body)
        let token = result['access_token']
        return { token: token }
    }
    catch (error) { console.log(error) }
}

exports.getLocationID = async (locationString) => {
    console.log(locationString)
    locationString = replaceAll(locationString, " ", "_")
    locationIDQuery = `https://api.songkick.com/api/3.0/search/locations.json?query=${locationString}&apikey=${config.songKick.apiKey}`

    let locationObj = {}
    try {
        let resp = await got(locationIDQuery)
        result = JSON.parse(resp.body)
        if (result.resultsPage.results.location) {
            let id = result.resultsPage.results.location[0].metroArea.id
            let locationName = result.resultsPage.results.location[0].metroArea.displayName
            let locationState = result.resultsPage.results.location[0].metroArea.state.displayName
            locationObj = { name: locationName, state: locationState, id: id }
            return JSON.stringify(locationObj)
        }
        else { return undefined }
    }
    catch (error) { console.log(error) }
}
exports.getArtistInfo = async (artist, token) => {
    let artist_string = replaceAll(artist, ' ', '%20')
    let artistQuery = `https://api.spotify.com/v1/search?q=${artist_string}&type=artist`
    let artistObj = {}
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    try {
        let resp = await got(artistQuery, { headers: headers });
        result = JSON.parse(resp.body)
        if (result.artists.items) {
            if (result.artists.items[0]) {
                artistObj = {
                    name: result.artists.items[0].name,
                    id: result.artists.items[0].id,
                    genres: result.artists.items[0].genres,
                    popularity: result.artists.items[0].popularity
                }
                return artistObj
            }
        }
    }
    catch (error) {
        console.log(error)
        return artistObj
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function getDates(length) {
    let query = ''
    let today = moment().format('YYYY-MM-DD')
    let week = moment().add(7, 'days').format('YYYY-MM-DD')
    if (length === 'day') {
        query = '&min_date=' + today + '&max_date=' + today
    }
    else if (length === 'week') {
        query = '&min_date=' + today + '&max_date=' + week
    }
    return query
}

function formatDate(dateStr) {
    //console.log(dateStr)
    let blah = new Date(dateStr)
    let hours = moment(dateStr).hour();
    dateStr = blah.toISOString()
    console.log(dateStr)
    if (!dateStr || !hours) {
        return null
    }
    else {
        let minutes = moment(dateStr).minute();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        let thingy = moment(dateStr).month() + "/" + moment(dateStr).date() + " @ " + strTime
        thingy = thingy.toString()
        console.log(typeof thingy)
        return thingy
    }
}

exports.getNearbyArtists = async (locationObj, token, length) => {
    locationObj = JSON.parse(locationObj)
    let dateStr = getDates(length)
    let eventQuery = `https://api.songkick.com/api/3.0/metro_areas/${locationObj.id}/calendar.json?apikey=${config.songKick.apiKey}${dateStr}`
    try {
        let resp = await got(eventQuery)
        result = JSON.parse(resp.body)
        let rawEvents = result.resultsPage.results.event
        if (!rawEvents) {
            return null
        }
        else {
            let events = []
            for (let event of rawEvents) {
                if (event.performance[0]) {
                    artistObj = await this.getArtistInfo(event.performance[0].artist.displayName, token)
                    if (artistObj) {
                        let dateStr = formatDate(event.start.datetime)
                        let date2 = new Date(event.start.datetime)
<<<<<<< HEAD
                        date2 = date2.toISOString()
                        console.log('date2:' + date2)
                        //console.log(dateStr)
=======
			date2 = date2.toISOString()
			console.log('date2: '+date2)
>>>>>>> ce8f0798c706b5dd6e42e2e5a0fa1c78601251c4
                        eventObj = {
                            event: {
                                link: event.uri,
                                popularity: event.popularity,
                                status: event.status,
                                date: event.start.datetime,
<<<<<<< HEAD
                                date2: date2,
=======
				date2 : date2,
>>>>>>> ce8f0798c706b5dd6e42e2e5a0fa1c78601251c4
                                dateStr: dateStr,
                                artist: event.performance[0].artist.displayName,
                                venue: { name: event.venue.displayName, link: event.venue.uri },
                                location: event.location.city,
                            },
                            artist: artistObj
                        }
                        events.push(eventObj)
                    }
                }
            }
            let eventsObj = { events: events }
            return eventsObj
        }
        //console.log(rawEvents)
    }
    catch (error) { console.log(error) }
}

exports.getTracks = async (artistObj, token) => {
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    let completeObject = artistObj
    for (let obj of artistObj.events) {
        if (obj.artist) {
            let trackQuery = `https://api.spotify.com/v1/artists/${obj.artist.id}/top-tracks?country=US`
            try {
                let resp = await got(trackQuery, { headers: headers })
                let result = JSON.parse(resp.body)
                let tracks = []
                /*
                for (let track of result.tracks) {
                    let artURL = track['album']['images'][0]['url']
                    let colors = await ColorThief.getPalette(artURL, 5)
                    let trackObj = { name: track['name'], artist: track['album']['artists'][0]['name'], album: track['album']['name'], art: track['album']['images'][0]['url'], duration: track['duration_ms'], popularity: track['popularity'], audio: ['preview_url'], colors: colors }
                    tracks.push(trackObj)
                }
                */
                let randTrack = Math.floor(Math.random() * (result.tracks).length);
                let track = result.tracks[randTrack]
                let artURL = track['album']['images'][0]['url']
                let colors = await ColorThief.getPalette(artURL, 5)
                let trackObj = { name: track['name'], artist: track['album']['artists'][0]['name'], album: track['album']['name'], art: track['album']['images'][0]['url'], duration: track['duration_ms'], popularity: track['popularity'], uri: track['uri'], audio: track['preview_url'], colors: colors }
                tracks.push(trackObj)
                obj['tracks'] = tracks
            }
            catch (error) { console.log(error) }
        }
    }
    return artistObj
}
