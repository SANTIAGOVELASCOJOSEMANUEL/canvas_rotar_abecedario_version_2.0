

import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
canvas = <HTMLCanvasElement>document.getElementById('circlechart');
let ctx = canvas.getContext('2d');

let formulario = document.querySelector('form');
formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío del formulario
  
  // Verificar si el canvas ya ha sido pintado
  if (formulario.dataset.pintado) {
    return;
  }
  
  let palabra = (<HTMLInputElement>document.getElementById('palabra')).value;
  let angulo = parseInt((<HTMLInputElement>document.getElementById('angulo')).value);
  let size = parseInt((<HTMLButtonElement>document.getElementById('formulario')).value);
  
  // Definir un rectángulo de recorte que cubra todo el canvas
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.clip();
  
  // Mover el origen al centro del canvas
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate(angulo * Math.PI / 180); // Rotar el canvas según el ángulo ingresado
  
  // Desplazar el canvas hacia atrás al centro del canvas después de la rotación
  ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
  
  const canvasLocal = new CanvasLocal(ctx, canvas);
  canvasLocal.paint(palabra, size); // Dibujar la letra en el origen
  
  // Establecer la variable "pintado" para evitar que se vuelva a pintar el canvas
  formulario.dataset.pintado = "true";
  ctx.restore();
});