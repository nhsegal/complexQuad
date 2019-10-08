//Show a section of the complex plane and then show its transformation under the quadratic formula.
//  
//  w = -B/2 +/- sqrt(B^2 - 4A)/2
// where B and C are complex.

let canvasSize = 240;
let z = [];
let expandedZ = [];
let w = [];
let w2 = [];
let domain;
let range;
let range2;
let range3;
let range4;
let ideal;

let zero1;
//let zero1Im;
let zero2;
//let zero2Im;

let Br = 1;
let Bi = 1; //0;
let Cr = 0; //1;
let Ci = 1;

function setup() {
  createCanvas(1000, 500);
  colorMode(HSB);

  domain = createImage(canvasSize, canvasSize);
  domain.loadPixels();
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let x = map(i, 0, canvasSize, -2, 2);
      let y = map(j, 0, canvasSize, 2, -2);
      let phase = atan2(y, x);
      if (phase < 0) {
        phase = phase + TAU;
      }
      let hue = color(phase * 180 / PI, 100, 100);
      if (y < 0.02 && y > -0.02 && x > 0) {
        hue = color(0);
      }

      if ((y * y + x * x) < 1.02 && (y * y + x * x) > .98) {
        hue = color(0);
      }
      domain.set(i, j, hue);
      z.push({
        x,
        y,
        hue
      });
    }
  }
  domain.updatePixels();
  image(domain, 0, 0);

  range = createImage(canvasSize, canvasSize);
  range.loadPixels();
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let YR = map(i, 0, canvasSize, -2, 2);
      let YI = map(j, canvasSize, 0, -2, 2);
      let ax = applyRoot(YR, YI, Br, Bi, Cr, Ci).Re;
      let ay = applyRoot(YR, YI, Br, Bi, Cr, Ci).Im;
      let phase = atan2(ay, ax);
      if (phase > TAU) {
        phase = phase - TAU;
      }
      if (phase < 0) {
        phase = phase + TAU;
      }
      let hue = color(phase * 180 / PI, 100, 100);
      range.set(i, j, hue);

    }
  }

  zero1 = applyRoot(0, 0, Br, Bi, Cr, Ci);
  zero2 = applyRoot2(0, 0, Br, Bi, Cr, Ci);
  console.log(zero1);
  console.log(zero2);

  range.updatePixels();
  image(range, canvasSize + 20, 0);

  range2 = createImage(canvasSize, canvasSize);
  range2.loadPixels();
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let YR = map(i, 0, canvasSize, -2, 2);
      let YI = map(j, canvasSize, 0, -2, 2);


      let ax = applyRoot(YR, YI, Br, Bi, Cr, Ci).Re;
      let ay = applyRoot(YR, YI, Br, Bi, Cr, Ci).Im;

      let phase = atan2(ay, ax) - PI;
      if (phase > TAU) {
        phase = phase - TAU;
      }
      if (phase < 0) {
        phase = phase + TAU;
      }
      let hue = color(phase * 180 / PI, 100, 100);
      range2.set(i, j, hue);

    }
  }
  range2.updatePixels();
  image(range2, canvasSize + 20, canvasSize + 20);

  //colorMode(HSB);
  range3 = createImage(canvasSize, canvasSize);
  range3.loadPixels();
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let YR = map(i, 0, canvasSize, -2, 2);
      let YI = map(j, 0, canvasSize, 2, -2);
      let ax = applyRoot2(YR, YI, Br, Bi, Cr, Ci).Re;
      let ay = applyRoot2(YR, YI, Br, Bi, Cr, Ci).Im;
      let phase = atan2(ay, ax) - PI;
      if (phase > TAU) {
        phase = phase - TAU;
      }
      if (phase < 0) {
        phase = phase + TAU;
      }
      let hue = color(phase * 180 / PI, 100, 100);
      range3.set(i, j, hue);

    }
  }
  range3.updatePixels();
  image(range3, canvasSize * 2 + 40, 0);

  range4 = createImage(canvasSize, canvasSize);
  range4.loadPixels();
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let YR = map(i, 0, canvasSize, -2, 2);
      let YI = map(j, 0, canvasSize, 2, -2);
      let ax = applyRoot2(YR, YI, Br, Bi, Cr, Ci).Re;
      let ay = applyRoot2(YR, YI, Br, Bi, Cr, Ci).Im;
      let phase = atan2(ay, ax);
      if (phase > TAU) {
        phase = phase - TAU;
      }
      if (phase < 0) {
        phase = phase + TAU;
      }
      let hue = color(phase * 180 / PI, 100, 100);
      range4.set(i, j, hue);

    }
  }
  range4.updatePixels();
  image(range4, canvasSize * 2 + 40, canvasSize + 20);
}

function draw() {
  background(255);
  image(domain, 0, 0);
  image(range, canvasSize + 20, 0);
  image(range2, canvasSize + 20, canvasSize + 20);
  image(range3, 2 * canvasSize + 40, 0);
  image(range4, 2 * canvasSize + 40, canvasSize + 20);

  fill(0);
  ellipse(map(zero1.Re, -2, 2, 2 * canvasSize + 40, 3 * canvasSize + 40), map(zero1.Im, -2, 2, canvasSize, 0), 3);
  ellipse(map(zero2.Re, -2, 2, 2 * canvasSize + 40, 3 * canvasSize + 40), map(zero2.Im, -2, 2, canvasSize, 0), 3);
  if (mouseX > 0 && mouseX < canvasSize && mouseY > 0 && mouseY < canvasSize) {
    ellipse(mouseX, mouseY, 5);
    let zr = map(mouseX, 0, canvasSize, -2, 2);
    let zi = map(mouseY, canvasSize, 0, -2, 2);
    let w = applyQuad(zr, zi);
    //let w = apply
    let X = map(w.u, -2, 2, 0, canvasSize);
    let Y = map(w.v, -2, 2, canvasSize, 0);
    let phase = atan2(zi, zr);

    //  if (phase > PI / 2 || phase < -PI / 2) {
    //ellipse(X + canvasSize + 20, Y + canvasSize + 20, 5);
    //  }

    //  if (phase > -PI / 2 && phase < PI / 2) {
    //ellipse(X + canvasSize + 20, Y + canvasSize + 20, 5);
    //  }

    //  if (phase > PI / 2 && phase < PI) {
    //ellipse(X + 2 * (canvasSize + 20), Y, 5);
    //  }

    //  if (phase > PI && phase < PI * 2) {
    //ellipse(X + 2 * (canvasSize + 20), Y + canvasSize + 20, 5);
    //  }

  }

}

function applyQuad(xr, xi) {
  let u = xr * xr - xi * xi + Br * xr + Cr;
  let v = 2 * xr * xi + Bi * xi + Ci;
  return {
    u,
    v
  };
}

function applyRoot(zr, zi, br, bi, cr, ci) {
  let discrimR = (br * br - bi * bi) - 4 * (cr - zr);
  let discrimI = 2 * br * bi - 4 * (ci - zi);
  let Re = -.5 * br + .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * cos(atan2(discrimI, discrimR) / 2);
  let Im = -.5 * bi + .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * sin(atan2(discrimI, discrimR) / 2);

  return ({
    Re,
    Im
  })

}

function applyRoot2(zr, zi, br, bi, cr, ci) {
  let discrimR = (br * br - bi * bi) - 4 * (cr - zr);
  let discrimI = 2 * br * bi - 4 * (ci - zi);
  let Re = -.5 * br - .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * cos(atan2(discrimI, discrimR) / 2);
  let Im = -.5 * bi - .5 * sqrt(sqrt(discrimI ** 2 + discrimR ** 2)) * sin(atan2(discrimI, discrimR) / 2);
  return ({
    Re,
    Im
  })

}

// function mouseMoved() {
//   let zR = map(mouseX, 0, canvasSize, -2, 2);
//   let zI = map(mouseY, canvasSize, 0, -2, 2);
//   if (zR > -2 && zR < 2 && zI > -2 && zI < 2){
//     console.log(zR, zI);
//   }
//     return false;
// }
