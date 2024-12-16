import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songName'
})
export class SongNamePipe implements PipeTransform {

  transform(value:string): string {
    let words:string[] = value.split('-')
    let songName:string = words[1].replace(".mp3","").replace(".m4a","")
    return songName;
  }

}