import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'candidateFilterbyNumber'
})

export class candidateFilterPipe2 implements PipeTransform {
    transform(candidateList: any, searchByNumber: string) {
        if(!candidateList || !searchByNumber) {
            return candidateList;
        }
        return candidateList.filter(candidate=>
            candidate.contactNumber.toLowerCase().indexOf(searchByNumber.toLocaleLowerCase()) !==-1);
      }

      

}