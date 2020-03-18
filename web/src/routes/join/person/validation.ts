import { Person } from "../models";
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (person: Person) => {
  
  if (!emailIsValid(person.email)) {
    return false;
  }
  return true;
}