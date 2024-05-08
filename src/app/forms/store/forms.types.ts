import { FormModel } from "@store/store.types";

import { GroupFormModel, NestedFormModel } from "../ui";

export interface FormsStateModel {
  groupForm: FormModel<GroupFormModel>;
  nestedForm: FormModel<NestedFormModel>;
}
