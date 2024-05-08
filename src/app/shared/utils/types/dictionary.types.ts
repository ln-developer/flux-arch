export interface BaseDictContent {
  id: number;
  name: string;
}

export interface KeyDictContent<T> extends BaseDictContent {
  key: T;
}

export interface CodeDictContent<T> extends BaseDictContent {
  code: T;
}

export interface BaseDictResponse<T> {
  content: Array<T>;
}

export interface CountryDictContent extends CodeDictContent<string> {
  full_name: string;
  oksm_alpha3: string;
  oksm_alpha2: string;
}

export interface DriversLicenceTypeDict extends KeyDictContent<number> {
  rsa_key: number;
}

export interface InternalNsiTypeDict {
  name: string;
  amount: number;
  unit: 'year' | 'month' | 'day';
}