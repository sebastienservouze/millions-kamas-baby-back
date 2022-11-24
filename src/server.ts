import cors from 'cors'
import express from 'express'
import { config } from '~~/config/config'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'
import connectDB from '~~/config/database'
import logging from '~~/config/logging'

const fs = require('fs');
const https = require('https');

var cert = fs.readFileSync('/etc/letsencrypt/live/nerisma.fr/fullchain.pem');
var key = fs.readFileSync('/etc/letsencrypt/live/nerisma.fr/privkey.pem');
var options = {
    key: key,
    cert: cert,
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
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
const allowedOrigins: string[] = [
    'http://www.nerisma.fr',
    'https://www.nerisma.fr',
    'http://nerisma.fr',
    'https://nerisma.fr',
]

app.use(cors({
    origin: function (origin, callback) {
        if (origin) {
            logging.info(`Requête venant de '${origin}'`);
            if (allowedOrigins.indexOf(origin) === -1)
                return callback(new Error('Unauthorized IP'), false);
            else
                return callback(null, true);
        }
        else {
            return callback(new Error('Unauthorized IP'), false);
        }
    }
}))

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