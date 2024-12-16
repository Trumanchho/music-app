// import { VercelRequest, VercelResponse } from '@vercel/node';
// import {Dropbox } from 'dropbox';

//import { VercelRequest, VercelResponse } from "@vercel/node";

const { VercelRequest, VercelResponse } = require('@vercel/node');
const { Dropbox } = require('dropbox');

require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env['CLIENTID'],
  clientSecret: process.env['CLIENTSECRET'],
  refreshToken: process.env['REFRESHTOKEN'],
  fetch
})

async function getSongsFrom(name) {
    let path = "/English Hymnals/" + name
    let data = await dbx.filesListFolder(
        {path:path}
    )
    return data.result.entries.filter((item)=>{
        return  item['.tag'] === "file"
    })
}

module.exports = async function (req,res) {
    let sol1 = []
    let sol2 = []
    let gfh2 = []
    let hc23 = []
    let hc24 = []
    sol1 = (await getSongsFrom("Songs of Love 1"))
    sol2 = (await getSongsFrom("Songs of Love 2"))
    gfh2 = (await getSongsFrom("Hymnal 2"))
    hc23 = (await getSongsFrom("Hymnal Collection 2023"))
    hc24 = (await getSongsFrom("Hymnal Collection 2024"))
    res.send({sol1: sol1, sol2: sol2, gfh2: gfh2, hc23: hc23, hc24: hc24})
}