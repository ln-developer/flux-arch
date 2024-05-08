import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDaDataResponse, DaDataAddress, DaDataParty } from '../types/dadata.types';
import { pluckSuggestions } from '../pipes/pluck-suggestions.pipe';

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  private readonly api = '/suggestions/api/4_1/rs/suggest';

  constructor(private readonly http: HttpClient) {}

  public getAddress(query: string): Observable<Array<DaDataAddress>> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Token 168d0ac7cdb28118dceb8613094293832885e0cd');
    headers.set('X-Secret', '81a697bd1dd5aa044b48e611e8008077e511ee77');

    return this.http.post<BaseDaDataResponse<DaDataAddress>>(`${this.api}/address`, { query }, { headers })
      .pipe(pluckSuggestions());
  }

  public getParty(query: string): Observable<Array<DaDataParty>> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Token 168d0ac7cdb28118dceb8613094293832885e0cd');
    headers.set('X-Secret', '81a697bd1dd5aa044b48e611e8008077e511ee77');

    return this.http.post<BaseDaDataResponse<DaDataParty>>(`${this.api}/party`, { query }, { headers })
      .pipe(pluckSuggestions());
  }
}
