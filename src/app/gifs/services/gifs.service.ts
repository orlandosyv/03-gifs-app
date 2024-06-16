import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagHistory: string[] = [];
  private ApiKey: string = 'XNzDUQeDAyG7og8Yf7N61n5ypRV0vkhX';

  constructor() {}

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
  }
}
