import { DatePipe } from '@angular/common';

export class DateUtil {
      private datePipe: DatePipe = new DatePipe('en-US');

      constructor() {
      }

      TempdateFormate(date: string, format = 'dd/MM/yyyy'): string {
            const transformedDate = this.datePipe.transform(date, format);
            return transformedDate;
      }

      dateFormate(date: string, format = 'MMM dd, yyyy hh:mm:ss a'): string {
            const transformedDate = this.datePipe.transform(date, format);
            return transformedDate;
      }

      convertKeyToDate(obj: any, key: string, format = 'MMM dd, yyyy hh:mm:ss a'): Object {
            const transformedDate = this.dateFormate(obj[key]);
            return transformedDate;
      }

      convertKeyToDateOnly(obj: any, key: string, format = 'MMM dd, yyyy'): Object {
            const transformedDate = this.dateFormate(obj[key]);
            return transformedDate;
      }

      convertArrayKeytoDate(arr: Array<any>, key: string, format = 'MMM dd, yyyy hh:mm:ss a'): void {
            const outArr = arr.forEach((item) => {
                  item[key] = this.convertKeyToDate(item, key, format);
            });
      }

      convertArrayKeytoDateOnly(arr: Array<any>, key: string, format = 'MMM dd, yyyy'): void {
            const outArr = arr.forEach((item) => {
                  item[key] = this.convertKeyToDateOnly(item, key, format);
            });
      }


      //  Jul 15, 2010 9: 49: 52 AM

      convertKeyToDatehyphn(obj: any, key: string, format = 'yyyy-mm-dd'): Object {
            const transformedDate = this.dateWithoutTime(obj[key]);
            return transformedDate;
      }

      convertArrayKeytoDatewithoutTime(arr: Array<any>, key: string, format = 'yyyy-mm-dd'): void {
            const outArr = arr.forEach((item) => {
                  item[key] = this.convertKeyToDatehyphn(item, key, format);
            });
      }

      dateWithoutTime(date: string, format = 'yyyy-mm-dd'): string {
            if (date !== null) {
                  const transformedDate = date.split(' ')[0];
                  return transformedDate;
            }
      }
}
