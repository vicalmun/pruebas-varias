const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
// end section

const section = document.querySelector('section');
const end = section.querySelector('h1');

// Aqui usamos ScrollMagic
// CREO que funciona creando un controlador y añadiendole escenas
const controller = new ScrollMagic.Controller();

// Todo lo que queremos 'animar' va en la escena
// otra seccion de animaciones => otra escena ¿esto es así?
let scene = new ScrollMagic.Scene({
    duration: 7500, //es la duración de la animacion que se traduce en px de altura en la web
    // Si dura 9 segundos el varlor de duration es 9000 (entiendo que ms)
    triggerElement: intro,
    triggerHook: 0 // posicion relativa (0=inicio, 1=final) del indicador
    // Hook sirve para indicar el final de la pos, o cuando quieres dejar de pinear algo
}).addIndicators()
    .setPin(intro)
    .addTo(controller);

// Text animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });


let scene2 = new ScrollMagic.Scene({
    duration: 3000,
    triggerElement: intro,
    triggerHook: 0
}).setTween(textAnim)
    .addTo(controller);


//Animacion del video

//esto le da fluidez
let aceleracion = 0.1;
let scrollpos = 0;
let delay = 0;

// la 'e' esa es un evento con arrowfunction
scene.on('update', e => {
    scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
    delay += (scrollpos - delay) * aceleracion;
    console.log(scrollpos, delay);

    video.currentTime = delay;
}, 33.3);

//el intervalo es por dividir la duracion entre los fps