import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { pluckContent } from '../pipes/pluck-content.pipe';
import { KeyDictContent, BaseDictResponse, CountryDictContent } from '../types/dictionary.types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private readonly nsiApi = '/b2b/v2/nsi-gateway/api';

  constructor(private readonly http: HttpClient) {}

  public getVehicleCategoryList(): Observable<Array<string>> {
    return this.http.post<Array<string>>(`${this.nsiApi}/vehicle/byField/list/sbs_category_name`, {});
  }

  public getPlaceOfRegistartionList(): Observable<Array<KeyDictContent<number>>> {
    return this.http.post<BaseDictResponse<KeyDictContent<number>>>(`${this.nsiApi}/placeregistration/list?page=0&size=10000`, {})
      .pipe(pluckContent());
  }

  public getCountryList(): Observable<Array<CountryDictContent>> {
    return this.http.post<BaseDictResponse<CountryDictContent>>(`${this.nsiApi}/country/list?page=0&size=10000`, {})
      .pipe(pluckContent());
  }

  public getVehiclePurposeList(): Observable<Array<KeyDictContent<number>>> {
    return this.http.post<BaseDictResponse<KeyDictContent<number>>>(`${this.nsiApi}/vehiclepurpose/list?page=0&size=10000`, {})
      .pipe(pluckContent());
  }

  public getVehicleDocTypeList(): Observable<Array<KeyDictContent<number>>> {
    return this.http.post<BaseDictResponse<KeyDictContent<number>>>(`${this.nsiApi}/vehicledoctype/list?page=0&size=10000`, {})
      .pipe(pluckContent());
  }

  public getVehicleMarkList(sbs_category_name: string): Observable<Array<string>> {
    return this.http.post<Array<string>>(`${this.nsiApi}/vehicle/byField/list/sbs_mark_name`, { sbs_category_name });
  }

  public getVehicleModelList(sbs_category_name: string, sbs_mark_name: string): Observable<Array<string>> {
    return this.http.post<Array<string>>(`${this.nsiApi}/vehicle/byField/list/sbs_model_name'`, { sbs_category_name, sbs_mark_name });
  }

  public getVehiclePowerHorse(sbs_category_name: string, sbs_mark_name: string, sbs_model_name: string): Observable<Array<string>> {
    return this.http.post<Array<string>>(`${this.nsiApi}/vehicle/byField/list/eng_pwr'`, { sbs_category_name, sbs_mark_name, sbs_model_name });
  }
}
