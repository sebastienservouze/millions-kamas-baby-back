import express from 'express'
import { config } from '~~/config/config'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'
import connectDB from '~~/config/database'
import Items, { Item } from './models/item'

const https = require('https');
const request = require('request');

// var cert = fs.readFileSync('/etc/letsencrypt/live/nerisma.fr/fullchain.pem');
// var key = fs.readFileSync('/etc/letsencrypt/live/nerisma.fr/privkey.pem');
var options = {
    // key: key,
    // cert: cert,
};

/**
 * On créé une nouvelle "application" express
 */
const app = express();

/*
 * Connection à la base de données
 */
connectDB();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json({ limit: '300mb' }));

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler);

/*
 * Création du serveur
 */
var server = https.createServer(options, app);

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
server.listen(config.API_PORT, () => {
    console.log(`Serveur à l'écoute sur le port ${config.API_PORT}`);
});

// Scrap
// Items.deleteMany({});
// for (let page = 1; page <= 23; page++) {
//     request('https://retro.dofusbook.net/items/retro/search/equipment?context=equipment&display=mosaic&sort=desc&view=effects&page=' + page, { json: true }, (err: any, res: any, body: any) => {
//         let jsonItems = body.data;
//         jsonItems.forEach((item: Item) => {
//             Items.create(item);
//             console.log('Ajout d\'un item');
//         });
//     })
// }

Items.countDocuments({}, function (err, count) {
    if (!err) console.log("Count", count);
});