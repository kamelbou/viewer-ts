import { Distance } from "./Distance";

export class Viewer {

  private currentImage = 0;

  private readonly images = new Array<string>();
  private img = document.createElement('img');
  private toolbar = document.createElement('div');
  private elementHTML = document.createElement('div');
  private overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  private activatedTool = false;

  private measurement = new Array<Distance>();

  constructor(images: Array<string>) {
    this.images = images;

    this.elementHTML.className = 'viewer';
    const prev = document.createElement('img');
    prev.className = 'button';
    prev.src = './assets/previous-svgrepo-com.svg';
    prev.onclick = () => this.page(-1);

    const next = document.createElement('img');
    next.src = './assets/previous-svgrepo-com.svg';
    next.className = 'button';
    next.style.transform = 'rotate(180deg)';
    next.onclick = () => this.page(1);

    const distance = document.createElement('img');
    distance.className = 'button';
    distance.src = './assets/distance-svgrepo-com.svg';
    distance.onclick = () => this.activeTool();

    this.toolbar.className = 'toolbar';
    this.toolbar.appendChild(prev);
    this.toolbar.appendChild(next);
    this.toolbar.appendChild(distance);

    const viewer = document.createElement('div');
    viewer.style.position = 'relative';

    this.img.classList.add('background');
    this.overlay.classList.add('overlay');

    viewer.appendChild(this.img);
    viewer.appendChild(this.overlay);

    this.elementHTML.appendChild(this.toolbar);
    this.elementHTML.appendChild(viewer);
  }

  start() {
    document.body.appendChild(this.elementHTML);
    this.display();
  }

  page(inc: number) {
    this.currentImage += inc;
    if (this.currentImage < 0) {
      this.currentImage = this.images.length -1;
    }

    if (this.currentImage > this.images.length) {
      this.currentImage = 0;
    }

    this.display();
  }

  activeTool() {
    if (this.activatedTool) {
      this.overlay.onmousedown = undefined;
      this.overlay.onmouseup = undefined;
      this.activatedTool = false;
    } else {
      this.activatedTool = true;
      this.overlay.onmousedown = (event) => {
        const dim = this.overlay.getBoundingClientRect();
        const eventX = event.clientX - dim.left;
        const eventY = event.clientY - dim.top;

        event.preventDefault();
        const distance = new Distance();
        this.measurement.push(distance);
        distance.addPoints([eventX,eventY]);
      }

      this.overlay.onmouseup = (event) => {
        event.preventDefault();
        const dim = this.overlay.getBoundingClientRect();
        const eventX = event.clientX - dim.left;
        const eventY = event.clientY - dim.top;

        const distance = this.measurement[this.measurement.length -1];
        distance.addPoints([eventX, eventY]);
        this.overlay.appendChild(distance.display());
      }
    }
  }




  display() {
    this.img.src = `${this.images[this.currentImage]}`;
  }

}