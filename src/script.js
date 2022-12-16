class App {
  constructor() {
    this.w = 60;
    this.color = {
      r: 75, 
      g: 241,
      b: 182
    }
    
    this.init = this.init.bind(this);
    this.onResize = this.onResize.bind(this);
    this.tick = this.tick.bind(this);
    this.init();
  }
    
  init() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'multiply';
    
    this.nbSquaresHor = Math.round(this.canvas.width / this.w) + 1;
    this.nbSquaresVert = Math.round(this.canvas.height / this.w) + 1;
    
    this.colorTl = new TimelineMax({
      repeat: -1
    })
    .to(this.color, 4, {
      r: 255,
      g: 35,
      b: 203,
      ease: Linear.easeNone
    })
    .to(this.color, 4, {
      r: 75,
      g: 241,
      b: 182,
      ease: Linear.easeNone
    })
    
    window.onresize = this.onResize;
    
    //TweenLite.ticker.fps(10);
    TweenMax.ticker.addEventListener("tick", this.tick);
  }
  
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.globalCompositeOperation = 'multiply';
    this.nbSquaresHor = Math.round(window.innerWidth / this.w) + 1;
    this.nbSquaresVert = Math.round(window.innerHeight / this.w) + 1;
    this.tick();
  }
    
  tick() {
      //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
      for (let i = 0; i < this.nbSquaresHor; i++) {
        for (let y = 0; y < this.nbSquaresVert; y++) {
          if (Math.random() >= 0.9) {
            this.ctx.clearRect(i*this.w, y*this.w, this.w, this.w)
          }
          this.ctx.beginPath();
          this.ctx.rect(i*this.w, y*this.w, this.w, this.w);
          const color = `rgb(
            ${this.color.r+ (i * 2) + (y * 4)}, 
            ${this.color.g + (i * 2) + (y * 4)}, 
            ${this.color.b + (i * 2) + (y * 4)}
          )`;
          this.ctx.fillStyle = color;
          this.ctx.fill();
      }
    }
  }
}

new App();