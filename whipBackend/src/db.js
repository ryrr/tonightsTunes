const { MongoClient } = require('mongodb');
const config = require("./config.json")
const client = new MongoClient(config.db.uri)

exports.check = async (search) => {
    try {
        await client.connect();

        let res = await entryExists(client, search);
        console.log(res)
        return res

    } catch (e) {
        console.error(e);
    }
}

const insert = async (item) => {
    try {
        await client.connect();

        let res = await insertItem(client, item);

        return res

    } catch (e) {
        console.error(e);
    }
}

const entryExists = async (client, search) => {
    const db = client.db('whipcache')
    let col = db.collection('tracks')
    try {
        let res = await col.find({ $and: [{ "length": search.length }, { "location": search.code }] }).toArray()
        client.close()
        return res[0]
    }
    catch (err) {
        console.log(err)
    }
    client.close()
    return {}
}

const insertItem = async (client, item) => {
    const db = client.db('whipcache')
    /*
    db.collection('inserts').insertOne(item, (err, res) => {
        if (err) { console.log(err) }
        else { console.log(res) }
        db.close()
        client.close()
    })
    */
    try {
        let res = await db.collection('inserts').insertOne(item)
        //figure out how to extract obj from res, but this works
        console.log(res)
        client.close()
        return res
    }
    catch (err) {
        console.log(err)
    }
    client.close()
    return {}

}

insert({ code: "1112", length: "week" })