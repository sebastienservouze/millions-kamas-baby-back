import { Router } from "express";
import logging from "../../config/logging";
import Items, { Item } from "../models/item";

const ItemsController = Router();

ItemsController.get('/', async (req, res) => {
    try {
        const items: Item[] = await Items.find();

        logging.info(`${items.length} items récupérés.`);

        return res
            .status(200)
            .json(items);
    } catch (err) {
        logging.error(err.message);
    }
})

ItemsController.get('/equipments', async (req, res) => {
    try {
        const equipments: Item[] = await Items.find({
            level: { $gt: 0 }
        });

        logging.info(`${equipments.length} equipements récupérés.`);

        return res
            .status(200)
            .json(equipments);
    } catch (err) {
        logging.error(err.message);
    }
})

export { ItemsController }