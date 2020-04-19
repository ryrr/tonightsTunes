const ColorThief = require('colorthief');
const colors = async (img) => {

    let color = await ColorThief.getPalette(img, 5)
    console.log(color)
}
colors('https://i.scdn.co/image/ab67616d0000b2733009007708ab5134936a58b3')