import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs';

import { ICarouselImage } from './components/carousel/carousel.component';
import { CarouselService } from './services/carousel.service';
import { Unsub } from './shared/unsub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Unsub implements OnInit, OnDestroy {

  title = 'Image Slider App';

  images!: ICarouselImage[];

  loading = false;

  constructor(
    private carouselService: CarouselService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getImages();
    // this.getRandomImage();
  }

  private getImages(): void {
    this.loading = true;
    this.carouselService.getImages()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((images: ICarouselImage[]) => {
        this.loading = false;
        this.images = images.sort((a, b) => a.priority - b.priority);
      }
      );
  }

  private getRandomImage(): void {
    this.loading = true;
    this.carouselService.getRandomImage()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((images: ICarouselImage[]) => {
        this.loading = false;
        this.images = images.sort((a, b) => a.priority - b.priority);
      })
  }
}
