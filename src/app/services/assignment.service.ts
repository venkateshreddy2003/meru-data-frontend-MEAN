import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private _http: HttpClient) {}
  addAssignment(data: any): Observable<any> {
    return this._http.post(
      `https://adorable-overcoat-dog.cyclic.app/create-assignment`,
      data
    );
  }
  getAssignmentList(): Observable<any> {
    return this._http.get(
      `https://adorable-overcoat-dog.cyclic.app/get-assignments`
    );
  }
}
