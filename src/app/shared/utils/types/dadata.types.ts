export interface BaseDaDataResponse<T> {
  suggestions: Array<T>;
}

export interface DaDataAddress {
  value: string;
  unrestricted_value: string;
  data: {
    postal_code: string;
    country: string;
    region: string;
    city_with_type: string;
    city: string;
    settlement_with_type: string;
    settlement: string;
    street_with_type: string;
    street: string;
    house: string;
    flat: string;
  };
}

export interface DaDataParty {
  value: string;
  unrestricted_value: string;
  data: {
    kpp: string;
    type: string;
    opf: {
      type: string;
      code: string;
      full: string;
      short: string;
    };
    name: {
      full_with_opf: string;
      short_with_opf: string;
      full: string;
      short: string;
    };
    inn: string;
    ogrn: string;
    address: DaDataAddress;
  }
}