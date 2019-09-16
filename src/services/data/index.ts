import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { Pagination } from "../../types";
import Person, { IPerson } from "../database/models/person";

class DataService {
  async fetchPersonsFromRemote() {
    let offset = 0;
    let count = 0;

    await Person.remove({});

    do {
      const { headers, data } = await axios.get(
        `https://api.meetup.com/Delft-Developers-Designers/members?sign=true&photo-host=public&page=200&fields=other_services,state&omit=group_profile,is_pro_admin,lat,lon&offset=${offset}`
      );
      offset++;
      count += data.length;

      await Person.create(data.map((item: Object) => camelcaseKeys(item)));

      if (headers["x-total-count"] <= count) {
        return true;
      }
    } while (true);
  }
}

export default DataService;
