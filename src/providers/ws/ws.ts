import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WsProvider {

  constructor(public http: HttpClient) {
    
  }

}
