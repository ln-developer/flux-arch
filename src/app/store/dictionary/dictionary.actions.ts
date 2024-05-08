import { VehicleModelsRequest, VehiclePowerHorseRequest } from "./dictionary.types";

export namespace Dictionary {
  export class GetVehicleCategory {
    static readonly type = '[Dictionary] Get Vehicle Category List';
  }

  export class GetPlaceOfRegistartion {
    static readonly type = '[Dictionary] Get Place Of Registration List';
  }

  export class GetCountry {
    static readonly type = '[Dictionary] Get Country List';
  }

  export class GetVehiclePurpose {
    static readonly type = '[Dictionary] Get Vehicle Purpose List';
  }

  export class GetVehicleDocType {
    static readonly type = '[Dictionary] Get Vehicle Doc Type List';
  }

  export class GetVehicleMark {
    static readonly type = '[Dictionary] Get Vehicle Mark List';
    constructor(public category: string) {};
  }

  export class GetVehicleModel {
    static readonly type = '[Dictionary] Get Vehicle Model List';
    constructor(public payload: VehicleModelsRequest) {};
  }

  export class GetVehiclePowerHorse {
    static readonly type = '[Dictionary] Get Vehicle Power Horse List';
    constructor(public payload: VehiclePowerHorseRequest) {};
  }
}