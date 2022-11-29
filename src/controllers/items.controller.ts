import { Router } from "express";
import { NotFoundException } from "~/utils/exceptions";
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

ItemsController.get('/ingredients/:item_id', async (req, res) => {
    try {
        const equipments: Item[] = await Items.find({
            item_id: parseInt(req.params.item_id)
        });

        logging.info(`${equipments.length} ingrédients récupérés pour ${req.params.item_id}.`);

        return res
            .status(200)
            .json(equipments);
    } catch (err) {
        logging.error(err.message);
    }
})

ItemsController.patch('/:id', async (req, res) => {
    try {
        let items = await Items.find({ 
            id: parseInt(req.params.id)
        });

        if (!items) {
            throw new NotFoundException('Item introuvable');
        }

        items.forEach(async item => {
            item.lastPrice = req.body.lastPrice;
            await item.save();
            logging.info(`Item ${item?.id} mis à jour`);
        })

        return res
            .status(200)
            .json(items);

    } catch (err) {
        logging.error(err.message);
    }
})

export { ItemsController }