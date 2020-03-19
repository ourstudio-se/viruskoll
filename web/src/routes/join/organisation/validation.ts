import {  Organisation } from "../models";
import { emailIsValid } from "../../../utils/validate";

export const payloadIsValid = (organisation: Organisation) => {
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