import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(namedList:any[], result:any[]): any[] {

    return result;
  }

}
