import { GENDER } from "@shared/consts";
import { FullNameModel } from "@shared/forms";
import { DaDataAddress } from "@shared/types";

export interface NestedFormModel {
  gender: GENDER;
  fullName: FullNameModel;
  birthDate: Date;
  address: DaDataAddress;
}
