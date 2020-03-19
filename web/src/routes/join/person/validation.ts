import { Person } from '../../../@types/organization';
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (person: Person, gdpr: boolean) => {
  if (!gdpr) {
    return false;
  }

  if (!emailIsValid(person.email)) {
    return false;
  }

  if (!person.locations.length) {
    return false;
  }

  return true;
}