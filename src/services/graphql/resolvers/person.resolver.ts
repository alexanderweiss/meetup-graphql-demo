import { get, truncate } from "lodash";
import { pubsub } from "../schema";
import TwitterService from "../../twitter";
import {
  PersonInput,
  PersonSearchArgs,
  PersonBioArgs,
  Pagination
} from "../../../types";
import Person, { IPerson } from "../../database/models/person";

const PERSON_ADDED = "PERSON_ADDED";

export default {
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator([PERSON_ADDED])
    }
  },
  Query: {
    person: async (
      _: unknown,
      args: PersonSearchArgs,
      ___: unknown,
      ____: unknown
    ) => Person.findOne({ name: { $regex: args.name, $options: "i" } }),
    persons: async (
      _: unknown,
      { limit = 25, offset = 0 }: Pagination = {},
      ___: unknown,
      ____: unknown
    ) =>
      Person.find(null, null, {
        limit: limit,
        skip: Math.max(0, offset)
      })
  },
  Mutation: {
    addPerson: async (
      _: unknown,
      args: PersonInput,
      __: unknown,
      ___: unknown
    ) => {
      const person = Person.create(args.input);
      pubsub.publish(PERSON_ADDED, { personAdded: person });
      return person;
    }
  },
  Person: {
    country: async (obj: IPerson, _: any, __: unknown, ___: unknown) => {
      return obj.localizedCountryName;
    },
    facebook: async (obj: any, _: unknown, __: unknown, ___: unknown) => {
      return get(obj, "otherServices.facebook", null);
    },
    twitter: async (obj: any, _: unknown, __: unknown, ___: unknown) => {
      const identifier = get(obj, "otherServices.twitter.identifier", null);
      if (!identifier) {
        return null;
      }

      const service = new TwitterService();
      return service.getUser(identifier);
    },
    bio: async (
      obj: IPerson,
      args: PersonBioArgs,
      __: unknown,
      ___: unknown
    ) => {
      if (!obj.bio) {
        return null;
      }
      return truncate(obj.bio, { length: args.size || obj.bio.length });
    }
  }
};
