import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = '/';
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}