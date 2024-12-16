import {Dropbox } from 'dropbox';

require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env['CLIENTID'],
  clientSecret: process.env['CLIENTSECRET'],
  refreshToken: process.env['REFRESHTOKEN'],
  fetch
})

export default async function (req, res) {
    let path = req.query.filepath.replace(/<>/g, '/')
    //console.log(path)
    let link = await dbx.filesGetTemporaryLink({path: path})
    res.send({link: link.result.link})
}