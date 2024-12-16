// import 'zone.js/node';

// import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr';
// import express from 'express';
// import { existsSync } from 'node:fs';
// import { join } from 'node:path';
// import AppServerModule from './src/main.server';
// import fetch from "node-fetch";

// require('dotenv').config();

// const Dropbox = require('dropbox').Dropbox;

// const dbx = new Dropbox({
//   clientId: process.env['CLIENTID'],//JSON.parse(process.env['DROPBOX_CONFIG'] as string).clientId, //environment.dropboxConfig.clientId,
//   clientSecret: process.env['CLIENTSECRET'],//JSON.parse(process.env['DROPBOX_CONFIG'] as string).clientSecret, //environment.dropboxConfig.clientSecret,
//   refreshToken: process.env['REFRESHTOKEN'], //JSON.parse(process.env['DROPBOX_CONFIG'] as string).refreshToken, //environment.dropboxConfig.refreshToken
//   fetch
// })


// // The Express app is exported so that it can be used by serverless Functions.
// export function app(): express.Express {
//   const server = express();
//   const distFolder = join(process.cwd(), 'dist/music-player-app/browser');
//   const indexHtml = existsSync(join(distFolder, 'index.original.html'))
//     ? join(distFolder, 'index.original.html')
//     : join(distFolder, 'index.html');

//   const commonEngine = new CommonEngine();

//   server.set('view engine', 'html');
//   server.set('views', distFolder);

//   // Example Express Rest API endpoints
//   // server.get('/api/**', (req, res) => { });


//   async function getSongsFrom(name:string) {
//       let path = "/English Hymnals/" + name
//       let data = await dbx.filesListFolder(
//           {path:path}
//       )
//       return data.result.entries.filter((item:any)=>{
//           return  item['.tag'] === "file"
//       })
//   }

//   server.get('/api/songs', async (req:any, res:any) => {
//       let sol1:any = []
//       let sol2:any = []
//       let gfh2:any = []
//       let hc23:any = []
//       let hc24:any = []
//       sol1 = (await getSongsFrom("Songs of Love 1"))
//       sol2 = (await getSongsFrom("Songs of Love 2"))
//       gfh2 = (await getSongsFrom("Hymnal 2"))
//       hc23 = (await getSongsFrom("Hymnal Collection 2023"))
//       hc24 = (await getSongsFrom("Hymnal Collection 2024"))
//       res.send({sol1: sol1, sol2: sol2, gfh2: gfh2, hc23: hc23, hc24: hc24})
//   })

//   server.get('/api/instrumentals', async (req:any, res:any) => {
//       let sol1:any = []
//       let sol2:any = []
//       let hc23:any = []
//       let somh1:any = []
//       sol1 = (await getSongsFrom("Songs of Love 1 - Instrumental"))
//       sol2 = (await getSongsFrom("Songs of Love 2 - Instrumental"))
//       hc23 = (await getSongsFrom("Hymnal Collection 2023 Instrumental"))
//       somh1 = (await getSongsFrom("Songs of My Heart 1 2018 - Instrumental"))
//       res.send({sol1: sol1, sol2: sol2, hc23: hc23, somh1: somh1})
//   })


//   server.get('/api/link/:filepath', async (req:any, res:any) => {
//       let path = req.params.filepath.replace(/<>/g, '/')
//       let link = await dbx.filesGetTemporaryLink({path: path})
//       res.send({link: link.result.link})
//   })

//   // Serve static files from /browser
//   server.get('*.*', express.static(distFolder, {
//     maxAge: '1y'
//   }));

//   // All regular routes use the Angular engine
//   server.get('*', (req:any, res:any, next:any) => {
//     const { protocol, originalUrl, baseUrl, headers } = req;

//     commonEngine
//       .render({
//         bootstrap: AppServerModule,
//         documentFilePath: indexHtml,
//         url: `${protocol}://${headers.host}${originalUrl}`,
//         publicPath: distFolder,
//         providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
//       })
//       .then((html) => res.send(html))
//       .catch((err) => next(err));
//   });

//   return server;
// }

// function run(): void {
//   const port = process.env['PORT'] || 4000;

//   // Start up the Node server
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// // Webpack will replace 'require' with '__webpack_require__'
// // '__non_webpack_require__' is a proxy to Node 'require'
// // The below code is to ensure that the server is run only when not requiring the bundle.
// declare const __non_webpack_require__: NodeRequire;
// const mainModule = __non_webpack_require__.main;
// const moduleFilename = mainModule && mainModule.filename || '';
// if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
//   run();
// }

// export default AppServerModule;
