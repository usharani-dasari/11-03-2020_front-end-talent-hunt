import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidatefilterByname'
})
export class CandidatefilterBynamePipe implements PipeTransform {

  transform(candidateList: any, searchByName:string): any {
    if(!candidateList || !searchByName) {
      return candidateList;
  }
  return candidateList.filter(candidate=>
    candidate.candidateName.toLowerCase().indexOf(searchByName.toLocaleLowerCase()) !==-1);
  }

}
