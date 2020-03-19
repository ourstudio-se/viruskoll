import {  Organisation } from "../models";
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (organisation: Organisation, gdpr: boolean) => {
  if (!gdpr) {
    return false;
  }
  if (!organisation.name) {
    return false;
  }
  if (!emailIsValid(organisation.admin)) {
    return false;
  }

  if (!organisation.locations.length) {
    return false;
  }

  return true;
}