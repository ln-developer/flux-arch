import { RadioBtnOption } from "@shared/kit";

export enum GENDER {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}

export const GenderOptions: Array<RadioBtnOption> = [
    {
        value: GENDER.FEMALE,
        viewValue: 'Женский'
    },
    {
        value: GENDER.MALE,
        viewValue: 'Мужской'
    },
]