const { MongoClient } = require('mongodb');
const config = require("./config.json")
const client = new MongoClient(config.db.uri, { useUnifiedTopology: true })
client.connect();

exports.check = async (search) => {
    try {
        let res = await entryExists(client, search);
        return res
    } catch (e) {
        console.error(e);
        return undefined
    }
}

exports.insert = async (item) => {
    try {
        let res = await insertItem(client, item);
        return res
    } catch (e) {
        console.log(e);
        return undefined
    }
}

const entryExists = async (client, search) => {
    const db = client.db('whipcache')
    let col = db.collection('tracks')
    try {
        let res = await col.find({ $and: [{ "length": search.length }, { "location": search.code }] }).toArray()
        console.log(search.code)
        return res[0]
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}

const insertItem = async (client, item) => {
    const db = client.db('whipcache')
    try {
        //console.log(item)
        let res = await db.collection('tracks').insertOne(item)
        //figure out how to extract obj from res, but this works
        return true
    }
    catch (err) {
        console.log(err)
        return undefined
    }

}
/*
let main = async () => {
    let poop = await insert('stringus')
    console.log(poop)
}
main()
*/