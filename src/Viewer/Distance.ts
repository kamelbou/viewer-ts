

export class Distance {
  readonly points = new Array<[number, number]>();

  constructor() {
  }

  addPoints(position: [number, number]) {
    this.points.push(position);
  }

  display() : SVGElement {
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');

    const line = document.createElementNS('http://www.w3.org/2000/svg','line');

    line.setAttribute('x1', this.points[0][0].toString());
    line.setAttribute('y1', this.points[0][1].toString());
    line.setAttribute('x2', this.points[1][0].toString());
    line.setAttribute('y2', this.points[1][1].toString());
    line.setAttribute("stroke", "red");
    g.appendChild(line);

    const text = document.createElementNS('http://www.w3.org/2000/svg','text');

    text.setAttribute('x', this.points[1][0].toString());
    text.setAttribute('y', this.points[1][1].toString());
    text.textContent = `${Math.sqrt( (this.points[1][0]-this.points[0][0])*(this.points[1][0]-this.points[0][0])
                                   + (this.points[1][1]-this.points[0][1])*(this.points[1][1]-this.points[0][1]) )}px`
    text.setAttribute("fill", "red");
    g.appendChild(text);
    return g;
  }

}