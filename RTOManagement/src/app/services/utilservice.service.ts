import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilserviceService {
  mode: any;
  constructor() {}

  getDateDiffFromToday(dateValue: string) {
    const today = new Date();
    const date = new Date(dateValue);
    return today.getFullYear() - date.getFullYear();
  }

  setNewDateFromToday(dd = 0, mm = 0, yy = 0) {
    const date = new Date();
    date.setMonth(date.getMonth() + mm);
    return date.toLocaleDateString();
  }
}
