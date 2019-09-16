import { Schema, Document } from "mongoose";
import { buildModel } from "../";

export const PhotoSchema: Schema = new Schema(
  {
    highres_link: { type: String },
    photo_link: { type: String },
    thumb_link: { type: String },
    type: { type: String },
    base_url: { type: String }
  },
  { timestamps: true }
);

class Photo {}

export interface IPhoto extends Document, Photo {
  highres_link: string;
  photo_link: string;
  thumb_link: string;
  type: string;
  base_url: string;
}

export default buildModel<IPhoto>(PhotoSchema, Photo);
