import DataService from "../services/data";
import Person from "../services/database/models/person";

async function main() {
  const service = new DataService();
  await service.fetchPersonsFromRemote();
}

main();
