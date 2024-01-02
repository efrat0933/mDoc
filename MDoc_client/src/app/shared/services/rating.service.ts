import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  public calcRating(rating: Rating) {
    return this.http.post("calcRating", { rating });
  }
}
