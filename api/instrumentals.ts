import { VercelRequest, VercelResponse } from '@vercel/node';
import {Dropbox } from 'dropbox';

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

export default async function (req: VercelRequest, res: VercelResponse) {
    let sol1:any = []
    let sol2:any = []
    let hc23:any = []
    let somh1:any = []
    sol1 = (await getSongsFrom("Songs of Love 1 - Instrumental"))
    sol2 = (await getSongsFrom("Songs of Love 2 - Instrumental"))
    hc23 = (await getSongsFrom("Hymnal Collection 2023 Instrumental"))
    somh1 = (await getSongsFrom("Songs of My Heart 1 2018 - Instrumental"))
    res.send({sol1: sol1, sol2: sol2, hc23: hc23, somh1: somh1})
}