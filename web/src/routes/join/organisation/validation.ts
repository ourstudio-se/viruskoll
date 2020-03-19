import { Organization } from '../../../@types/organization';
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (organization: Organization, gdpr = true) => {
  if (!gdpr) {
    return false;
  }
  if (!organization.name) {
    return false;
  }
  if (!emailIsValid(organization.admin)) {
    return false;
  }

  if (!organization.locations.length) {
    return false;
  }

  return true;
}