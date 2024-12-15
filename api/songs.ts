// import { VercelRequest, VercelResponse } from '@vercel/node';
// import {Dropbox } from 'dropbox';

const { VercelRequest, VercelResponse } = require('@vercel/node');
const { Dropbox } = require('dropbox');

require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env['CLIENTID'],
  clientSecret: process.env['CLIENTSECRET'],
  refreshToken: process.env['REFRESHTOKEN'],
  fetch
})

async function getSongsFrom(name:string) {
    let path = "/English Hymnals/" + name
    let data = await dbx.filesListFolder(
        {path:path}
    )
    return data.result.entries.filter((item:any)=>{
        return  item['.tag'] === "file"
    })
}

module.exports = async function (req:any,res:any) {
    let sol1:any = []
    let sol2:any = []
    let gfh2:any = []
    let hc23:any = []
    let hc24:any = []
    sol1 = (await getSongsFrom("Songs of Love 1"))
    sol2 = (await getSongsFrom("Songs of Love 2"))
    gfh2 = (await getSongsFrom("Hymnal 2"))
    hc23 = (await getSongsFrom("Hymnal Collection 2023"))
    hc24 = (await getSongsFrom("Hymnal Collection 2024"))
    res.send({sol1: sol1, sol2: sol2, gfh2: gfh2, hc23: hc23, hc24: hc24})
}