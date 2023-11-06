import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';

import { ICarouselImage } from '../components/carousel/carousel.component';
import { randomIntFromInterval } from '../helpers/random-int-from-interval';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  imageBaseUrl = 'https://source.unsplash.com';
  images = [
    {
      image: this.imageBaseUrl + '/NYDo21ssGao',
      url: this.imageBaseUrl + '/NYDo21ssGao',
      imageAlt: 'Image 1',
      id: 1,
      priority: 6
    },
    {
      image: this.imageBaseUrl + '/6J--NXulQCs',
      url: this.imageBaseUrl + '/6J--NXulQCs',
      imageAlt: 'Image 2',
      id: 2,
      priority: 2
    },
    {
      image: this.imageBaseUrl + '/Cm7oKel-X2Q',
      url: this.imageBaseUrl + '/Cm7oKel-X2Q',
      imageAlt: 'Image 3',
      id: 3,
      priority: 1
    },
    {
      image: this.imageBaseUrl + '/I_9ILwtsl_k',
      url: this.imageBaseUrl + '/I_9ILwtsl_k',
      imageAlt: 'Image 4',
      id: 4,
      priority: 4
    },
    {
      image: this.imageBaseUrl + '/3MtiSMdnoCo',
      url: this.imageBaseUrl + '/3MtiSMdnoCo',
      imageAlt: 'Image 5',
      id: 5,
      priority: 3
    },
    {
      image: this.imageBaseUrl + '/IQ1kOQTJrOQ',
      url: this.imageBaseUrl + '/IQ1kOQTJrOQ',
      imageAlt: 'Image 6',
      id: 6,
      priority: 5
    },
  ];

  constructor(private http: HttpClient) { }

  // Получить список слайдов
  getImages(): Observable<ICarouselImage[]> {
    return of(this.images)
      .pipe(
        delay(2000)
      );
  }

  // Получить список слайдов с сервера
  getRandomImage(): Observable<ICarouselImage[]> {
    return this.http.get('https://picsum.photos/v2/list')
      .pipe(
        map((images: any) => images.map((image: any) => ({
          image: 'https://source.unsplash.com' + image.url.substring(image.url.lastIndexOf('/')),
          url: image.download_url,
          imageAlt: image.author,
          priority: randomIntFromInterval(1, 50)
        }))
        )
      );
  }
}

