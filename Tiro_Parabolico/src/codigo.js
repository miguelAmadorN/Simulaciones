var rect, img, imgRueda, circle, medidor, c1, c2, medicion, diana, score, Lineas = [];
var G = 6.67259e-11;
var M = 5.98e24;
var R = 6.37e6;
var GRAVEDAD;

function cuadratica(a, b, c) {
    var D = Math.pow(b, 2) - 4 * a * c;
    var resultado = 0;
    var resultado1 = (-b + Math.pow(D, .5)) / (2 * a);
    var resultado2 = (-b - Math.pow(D, .5)) / (2 * a);

    if (resultado1 < 0) {
        resultado = resultado1;
    } else {
        resultado = resultado2;
    }
    return -resultado;
}

function distanciaDospuntos(x1, x2, y1, y2) {
    d = Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), .5);
    document.getElementById('demo').innerHTML = d;
    return parseFloat(d).toFixed(2);

}

function gravedad(altitud) {
    var resultado = (G * M) / Math.pow((R + altitud), 2);
    return resultado;
}

function alturaMax() {
    var h = Canvas.height - img.getTop();
    var velocidadInicial = document.getElementById('speed').value;
    var angulo = -(document.getElementById('angle').value);
    var g = 9.81;
    var resultado = h + (Math.pow(velocidadInicial, 2) * Math.pow(Math.sin(angulo * Math.PI / 180), 2)) / (2 * g);
    document.getElementById('demo').value = parseFloat(resultado).toFixed(2);
    return resultado;

}

function tiempoMax() {
    var Gravedad = 9.81;
    var x = document.getElementById('air');
    if (x.checked) {
        var altitud = document.getElementById('altitud').value;
        var parametro = parseInt(altitud);
        Gravedad = gravedad(parametro);

        document.getElementById('demo').innerHTML = Gravedad;
    }
    var g = -Gravedad;
    GRAVEDAD = Gravedad;
    var angulo = document.getElementById('angle').value;
    var Vo = document.getElementById('speed').value;
    var a = g / 2;
    var b = -(Math.sin(angulo * Math.PI / 180) * Vo);
    var c = 600 - img.getTop();
    var resultado = parseFloat(cuadratica(a, b, c)).toFixed(2);
    document.getElementById('time').value = resultado;
    return resultado;

}

function posX(tiempo) {
    var Vo = document.getElementById('speed').value;
    var angulo = document.getElementById('angle').value;
    var resultado = Vo * parseFloat(Math.cos(angulo * Math.PI / 180).toFixed(2)) * tiempo;
    document.getElementById('range').value = parseFloat(resultado).toFixed(2);
    return resultado;
}

function posY(tiempo) {
    var h = 600 - img.getTop();
    var Vo = document.getElementById('speed').value;
    var angulo = document.getElementById('angle').value;
    var resultado = h + Vo * Math.sin(angulo * Math.PI / 180) * tiempo - GRAVEDAD * (Math.pow(tiempo, 2) / 2);
    document.getElementById('height').value = parseFloat(resultado).toFixed(2);

    return resultado;
}

function optionsAir(objeto) {
    if (objeto.checked) {
        document.getElementById('Drag').style.visibility = 'visible';
        document.getElementById('Altitud').style.visibility = 'visible';
    } else {

        document.getElementById('Drag').style.visibility = 'hidden';
        document.getElementById('Altitud').style.visibility = 'hidden';
    }
}

function tamProyectil(objeto) {
    var radio = objeto.value;
    if (radio < .1) {
        radio = .1;
        objeto.value = radio;
    }
    document.getElementById('demo').innerHTML = radio;
    circle.set('radius', radio);
    Canvas.renderAll();
}

function disminuir() {
    var canvas = document.getElementById('CANVAS1');
    var ancho = canvas.height += 100;
    canvas.width += 200;

    document.getElementById('demo').innerHTML = ancho;
    Canvas.renderAll();
}

function aumentar() {
    var canvas = document.getElementById('CANVAS1');
    var ancho = canvas.height -= 100;
    canvas.width -= 200;
    Canvas.renderAll();
}

function moverGrados(objeto) {
    var grados = objeto.value;
    img.set('angle', -grados);
    imgRueda.set('angle', -grados);
    Canvas.renderAll();
}

function playAudio() {
    var x = document.getElementById("a");
    x.play();
}

function mueve() {
    restablecer();
    var x = document.getElementById("audio");
    if (x.checked) {
        var audio = document.getElementById("a");
        audio.play();
    }

    var duracion = tiempoMax() * 1000;
    var t = 0;
    var numero = 0;

    (function animate() {

        fabric.util.animate({
            duration: duracion,

            onChange: function () {
                if (t <= duracion / 1000) {
                    t += .05;
                    var x = img.getLeft() + posX(t);
                    var y = 600 - posY(t);

                    Lineas[numero] = creaLinea((img.getLeft() + posX(t - .03)), 600 - posY(t - .03), (img.getLeft() + posX(t)), 600 - posY(t));

                    Canvas.add(Lineas[numero]);
                    numero++;

                    circle.set({left: x, top: y}).setCoords();
                    if (circle.intersectsWithObject(diana)) {
                        diana.setOpacity(0.5);
                        score.set('text', "SCORE!!");
                        Canvas.renderAll();
                    }
                    document.getElementById('time').value = parseFloat(t).toFixed(2);

                    Canvas.renderAll();
                }

            },
            onComplete: function valores() {

                document.getElementById('time').value = parseFloat(duracion / 1000).toFixed(2);
                document.getElementById('range').value = parseFloat(posX(duracion / 1000)).toFixed(2);
                document.getElementById('height').value = 0;
            }
        });
    })();
}


function  restablecer() {
    circle.set('left', img.getLeft());
    circle.set('top', img.getTop());
    score.set('text', "");
    diana.setOpacity(1);
    for (var i = 0; i < Lineas.length; i++) {
        Canvas.remove(Lineas[i]);
    }
    Canvas.renderAll();
}

function creaLinea(x1, y1, x2, y2) {
    return new fabric.Line([x1, y1, x2, y2], {
        fill: 'green',
        cornerStyle: 'circle',
        stroke: 'blue',
        strokeWidth: 5,
        lockScalingX: true,
        lockScalingY: true,
        hasBorders: false,
        lockRotation: true,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false
    });
}

//Funcionamiento

var imgElement = document.getElementById('imagen1');
var imgElement2 = document.getElementById('imagen2');
var Canvas = new fabric.Canvas(CANVAS1);

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';


//x,y,x2,y2
medidor = new fabric.Line([400, 580, 500, 580], {
    fill: 'red',
    cornerStyle: 'circle',
    stroke: 'green',
    strokeWidth: 5,
    lockScalingX: true,
    lockScalingY: true,
    hasBorders: false,
    lockRotation: true,
    lockMovementX: true,
    lockMovementY: true
});

function creaCirculo(left, top) {
    return new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 4,
        radius: 5,
        fill: '#fff',
        stroke: '#666'
    });
}

c1 = creaCirculo(medidor.get('x1'), medidor.get('y1'));
c1.hasControls = c1.hasBorders = false;


c2 = creaCirculo(medidor.get('x2'), medidor.get('y2'));
c2.hasControls = c2.hasBorders = false;

c1.on('moving', function () {
    medidor.set({'x1': c1.left, 'y1': c1.top});
    medicion.set('text', distanciaDospuntos(c1.left, c2.left, c1.top, c2.top).toString() + " m");
    medicion.top = c1.top - 50;
    medicion.left = c1.left;
});

c2.on('moving', function () {
    medidor.set({'x2': c2.left, 'y2': c2.top});
    medicion.set('text', distanciaDospuntos(c1.left, c2.left, c1.top, c2.top).toString() + " m");

});

medicion = new fabric.Text("100 m", {
    left: 400,
    top: 550,
    fontSize: 20,
    lockScalingX: true,
    lockScalingY: true,
    hasControls: false,
    hasBorders: false
});

medicion.on('moving', function () {

    medidor.set({'x1': medicion.left, 'y1': medicion.top + 50});
    c1.left = medicion.left;
    c1.top = medicion.top + 50;
    medicion.set('text', distanciaDospuntos(c1.left, c2.left, c1.top, c2.top).toString() + " m");

});
circle = new fabric.Circle({
    radius: 3,
    fill: 'black',
    left: 100,
    top: Canvas.height - 50,
    selectable: false
});

diana = new fabric.Circle({
    radius: 20,
    fill: 'red',
    left: 800,
    top: 580,
    scaleY: 0.5,
    lockScalingX: true,
    lockScalingY: true,
    lockRotation: true,
    hasControls: false,
    hasBorders: false
});

img = new fabric.Image(imgElement, {
    left: 100,
    top: Canvas.height - (50 / 2) - 10,
    opacity: 1,
    width: 100,
    height: 50,
    lockScalingX: true,
    lockScalingY: true,
    hasBorders: false,
    selectable: false
});

rect = new fabric.Rect({
    left: 110,
    top: Canvas.height,
    fill: 'brown',
    width: 80,
    lockScalingX: true,
    lockRotation: true,
    lockMovementY: true,
    height: 0,
    hasBorders: false,
    selectable: false

});

rect.on('rotating', function () {
    var angle = this.get("angle");
    angle = Math.round(angle);
    document.getElementById('angle').value = angle;
});

rect.on('scaling', function () {
    var ancho = rect._getTransformedDimensions().x;
    var alto = rect._getTransformedDimensions().y;
    rect.set('height', ancho);
    Canvas.renderAll();
    document.getElementById('demo').innerHTML = ancho + "_" + alto;
});

score = new fabric.Text("", {
    left: 500,
    top: 300,
    fontSize: 50,
    fontColor: 'green',
    lockScalingX: true,
    lockScalingY: true,
    hasControls: false,
    hasBorders: false,
    shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
    fill: 'green'
});

imgRueda = new fabric.Image(imgElement2, {
    left: 100,
    top: Canvas.height - (34 / 2),
    opacity: 1,
    width: 40,
    height: 34,
    lockScalingX: true,
    lockScalingY: true,
    hasRotatingPoint: true,
    hasBorders: false
});

imgRueda.on('scaling', function () {
    var ancho = rect._getTransformedDimensions().x;
    var alto = rect._getTransformedDimensions().y;
    document.getElementById('demo').innerHTML = ancho + "_" + alto;
});

imgRueda.on('rotating', function () {
    var angle = this.get("angle");
    img.angle = angle;
    angle = Math.round(angle);
    angle = -(angle - 360);
    document.getElementById('angle').value = angle;
});

imgRueda.on('moving', function () {
    if (imgRueda.top >= Canvas.height - (imgRueda.height / 2)) {
        imgRueda.top = Canvas.height - (imgRueda.height / 2);
        ;
    }

    img.set('left', imgRueda.getLeft());
    img.top = imgRueda.top - 15;

    rect.set('left', img.getLeft());
    rect.height = (Canvas.height - img.getTop()) - (img.height / 2);
    rect.top = Canvas.height - (rect.height / 2) + 3;

    circle.set('left', img.getLeft());
    circle.set('top', img.getTop());

});

Canvas.add(score);
Canvas.add(medidor);
Canvas.add(c1);
Canvas.add(c2);
Canvas.add(medicion);
Canvas.add(circle);
Canvas.add(img);
Canvas.add(imgRueda);
Canvas.add(rect);
Canvas.add(diana);