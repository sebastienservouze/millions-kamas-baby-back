import { Document, model, Model, Schema } from "mongoose"

export interface Effect extends Document {
    item_id: number;
    id: number;
    name: string;
    type: string;
    min: number;
    max: number;
}

export const effectSchema: Schema = new Schema({
    item_id: { type: Number },
    id: { type: Number },
    name: { type: String },
    type: { type: String },
    min: { type: Number },
    max: { type: Number },
});