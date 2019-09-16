import { Schema, Document } from "mongoose";
import { buildModel } from "../";
import { IPhoto, PhotoSchema } from "./photo";

export const PersonSchema: Schema = new Schema(
  {
    name: { type: String },
    status: { type: String },
    joined: { type: Number },
    city: { type: String },
    country: { type: String },
    localizedCountryName: { type: String },
    photo: PhotoSchema,
    otherServices: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

class Person {}

export interface IPerson extends Document, Person {
  name?: string;
  bio?: string;
  status?: string;
  joined: number;
  city?: string;
  country?: string;
  localizedCountryName?: string;
  photo: IPhoto;
  otherServices?: {}[];
}

export default buildModel<IPerson>(PersonSchema, Person);
