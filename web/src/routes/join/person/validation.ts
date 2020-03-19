import { Person } from "../models";
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (person: Person) => {
  
  if (!emailIsValid(person.email)) {
    return false;
  }

  if (!person.locations.length) {
    return false;
  }

  return true;
}