import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  // x: unknown;
  // y: any;
  transform(value: any, ...args: unknown[]): unknown { // changed value from unknown to any to check

    // let x: unknown;
    // let y: any;
    // let name: string;

    // x="Jack";
    // name=x as string; //casting unknown to string
    // y=5;
    // y="John";
    // name=y;

    const firstDigit = value % 10;
    let prefix = "th";
    switch (firstDigit) {
      case 1: 
        prefix = "st";
        break;
      case 2: 
        prefix = "nd";
        break;
      case 3: 
        prefix = "rd";
        break;
    }

    return value;
  }

}
