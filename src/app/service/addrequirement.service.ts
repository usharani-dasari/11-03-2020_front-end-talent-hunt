import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AddrequirementService {
  _Url:string ='http://10.10.12.185:8080/requirement';
  _candidate:string ='http://10.10.12.185:8080/candidate';
  _singleReq:string = 'http://10.10.12.185:8080/candidate';
  _email:string = 'http://10.10.12.187:8082';
  // _singleReq:string = 'http://10.10.12.185:8080/candidate'
  // _Url:string ='http://10.10.12.185:8080/requirement';
  // _candidate:string ='http://10.10.12.185:8080/candidate'
  selectedJob;

  constructor( private http:HttpClient) { }

  postRequirementData(form) {
    return this.http.post(`${this._Url}/add`,form);
  }

  getRequirementData() {
    return this.http.get<any>(`${this._Url}/getallactiverequirements`)
  }
  deleteRequirement(id) {
    return this.http.delete(`${this._Url}/deletebyid/${id}`)
  }
  editRequirement(obj) {
    return this.http.put(`${this._Url}/update`,obj)
  }
  postCandidate(candidate) {
    return this.http.post(`${this._candidate}/add`,candidate)
  }
  getCandidate() {
    return this.http.get<any>(`${this._candidate}/getallactivecandidates`)
  }
  editCandidate(candidateObj) {
    return this.http.put(`${this._candidate}/update/`,candidateObj)
  }
  deleteCandidate(id) {
    return this.http.delete(`${this._candidate}/deletebyid/${id}`)
  }
  postEmail(headers) {
    return this.http.post(`${this._email}/send-email`,headers)
  }
  getCandidateUnderReq(reqId) {
    return this.http.get(`${this._singleReq}/getcandidatesunderrequirement/${reqId}`)

  }
}
