import { Document, model, Model, Schema } from "mongoose"
import { json } from "stream/consumers";
import { effectSchema } from "./effect";

export interface Item extends Document {
    id: number;
    item_id: number;
    name: string;
    lastPrice?: number,
    level?: number,
    category_name?: string;
    category_type?: string;
    type?: string;
    picture?: number;
    pa_cost?: number;
    last_seen_price?: number;
    count?: number;
    ingredients?: [];
    effects?: [];
}

const itemSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    item_id: { type: Number },
    lastPrice: { type: Number },
    level: { type: Number },
    category_name: { type: String },
    category_type: { type: String },
    type: { type: String },
    picture: { type: Number },
    pa_cost: { type: Number },
    last_seen_price: { type: Number },
    count: { type: Number },
    ingredients: [ this ],
    effects: [ effectSchema ],
});

const Items: Model<Item> = model<Item>('Item', itemSchema);

export default Items;