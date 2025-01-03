const { Dropbox } = require('dropbox');

require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env['CLIENTID'],
  clientSecret: process.env['CLIENTSECRET'],
  refreshToken: process.env['REFRESHTOKEN'],
  fetch
})

async function getSongsFrom(name) {
    let path = "/Demo Songs/" + name
    let data = await dbx.filesListFolder(
        {path:path}
    )
    return data.result.entries.filter((item)=>{
        return  item['.tag'] === "file"
    })
}

module.exports = async function (req,res) {
    let hymninstrumentals = []
    let guitarcovers = []
    hymninstrumentals = (await getSongsFrom("Hymn Instrumentals"))
    guitarcovers = (await getSongsFrom("Guitar Covers"))
    res.send({hymninstrumentals:hymninstrumentals, guitarcovers:guitarcovers})
}