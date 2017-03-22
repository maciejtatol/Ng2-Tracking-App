import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointFilter'
})
export class PointFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
      return items && items.filter(item => item.lat && item.lng);
  }
}
