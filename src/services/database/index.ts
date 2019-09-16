import mongoose, { Schema, Model, Document } from "mongoose";

mongoose.set("debug", process.env.NODE_ENV !== "production");
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  dbName: "test"
});

export function buildModel<T extends Document>(
  schema: Schema,
  modelClass: Function
): Model<T> {
  const { name } = modelClass;
  schema.loadClass(modelClass);
  return mongoose.model<T>(name, schema);
}
export default mongoose;
