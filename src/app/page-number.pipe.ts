import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageNumber'
})
export class PageNumberPipe implements PipeTransform {

  transform(value:string): string {
    let words:string[] = value.split('-')
    let page:string = words[0]
    if (page[0] === "0") {
      page = page.slice(1,page.length)
    }
    return "P. " + page;
  }

}
