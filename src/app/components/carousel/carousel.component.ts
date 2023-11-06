import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export interface ICarouselImage {
  id: number,

  image: string;
  imageAlt: string;

  priority: number;
  url: string;

  // author: number,
  // width: number,
  // height: number,
  // url: string,
  // download_url: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() images: ICarouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 4000;

  selectedImageIndex = 1;
  intervalId!: any;

  constructor() { }

  ngOnInit(): void {
    const selectedImageIndex = localStorage.getItem('selectedImageIndex');
    if (selectedImageIndex) {
      this.selectedImageIndex = +selectedImageIndex;
    }
    if (this.autoSlide) {
      this.slideImages();
    }
  }

  ngOnDestroy(): void {
    // localStorage.removeItem('selectedImageIndex');
    clearInterval(this.intervalId);
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
    this.saveImageId();
  }

  onPrevClick(): void {
    this.selectedImageIndex = this.selectedImageIndex === 0 ?
      this.images.length - 1 : this.selectedImageIndex - 1;
    this.saveImageId();

  }

  onNextClick(): void {
    this.selectedImageIndex = this.selectedImageIndex === this.images.length - 1 ?
      0 : this.selectedImageIndex + 1;
    this.saveImageId();

  }

  private slideImages() {
    this.intervalId = setInterval(() => {
      if (this.selectedImageIndex > this.images.length - 1) {
        this.selectedImageIndex = 0;
      }
      this.selectedImageIndex = this.selectedImageIndex === this.images.length - 1 ?
        0 : this.selectedImageIndex + 1;
      this.saveImageId();
    }, this.slideInterval);
  }

  saveImageId() {
    localStorage.setItem('selectedImageIndex', this.selectedImageIndex.toString());
  }
}
