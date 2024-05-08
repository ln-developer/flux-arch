export interface VehicleModelsRequest {
    sbs_category_name: string;
    sbs_mark_name: string;
}

export interface VehiclePowerHorseRequest extends VehicleModelsRequest {
    sbs_model_name: string;
}