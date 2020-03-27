import { Person } from '../../@types/organization';
import { emailIsValid } from '../../utils/validate';

export const payloadIsValid = (person: Person, gdpr = true) => {
  if (!gdpr) {
    return false;
  }

  if (!emailIsValid(person.email)) {
    return false;
  }

  if (
    !(
      person.organizations.length &&
      person.organizations[0].locations &&
      person.organizations[0].locations.length
    )
  ) {
    return false;
  }

  return true;
};
