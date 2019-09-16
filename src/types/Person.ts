export { IPerson as Person } from "../services/database/models/person";
export { IPhoto as Photo } from "../services/database/models/photo";

export type PersonInput = {
  input: {
    name: string;
    bio: string;
  };
};

export type PersonSearchArgs = {
  name: string;
};

export type PersonBioArgs = {
  size: number;
};
