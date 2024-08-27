import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSecond'
})
export class MinuteSecondPipe implements PipeTransform {

  transform(value: string | number): string {
    if (Number.isNaN(value)) {
      return "0:00"
    }
    let seconds:number = Math.floor(Number(value))
    let minutes:number = Math.floor(seconds/60)
    seconds = seconds % 60

    if (seconds < 10) {
      return minutes + ":0" + seconds;
    }
    return minutes + ":" + seconds;
  }

}
