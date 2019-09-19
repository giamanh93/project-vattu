import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://quanlyvattu.com/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}