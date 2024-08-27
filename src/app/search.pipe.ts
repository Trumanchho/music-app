import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './Song';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(namedList:any[], query:string): any[] {

    return namedList.filter((item)=> {
      return item.name.toLowerCase().includes(query.toLowerCase()) || item.name.endsWith(query)
    });
  }

}
