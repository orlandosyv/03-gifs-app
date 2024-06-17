import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];
  private _tagHistory: string[] = [];
  private ApiKey: string = 'XNzDUQeDAyG7og8Yf7N61n5ypRV0vkhX';
  private ApiURL: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return this._tagHistory;
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return; //validation of not empty
    if (/^\d+$/.test(tag)) {
      // Do nothing if the tag contains only numbers
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key', this.ApiKey)
      .set('limit', 12)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.ApiURL}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
        console.log({gifs: this.gifsList})
      });
  }

  public searchFromHistory(tag: string): void{
    const params = new HttpParams()
      .set('api_key', this.ApiKey)
      .set('limit', 12)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.ApiURL}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
        console.log({ gifs: this.gifsList });
      });
  }

}
