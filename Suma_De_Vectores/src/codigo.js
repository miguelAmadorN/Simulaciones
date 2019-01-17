
var Canvas = new fabric.Canvas(CANVAS1);
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
var ejeX, ejeY, numeroVectores = 0, Vectores = [];
var boteCerrado = document.getElementById('boteCerrado');
var boteAbierto = document.getElementById('boteAbierto');
var nuevoVector = document.getElementById('nuevoVector');
var sumaVector = null;
var estilos = [];
estilos[0] = document.getElementById('ninguno');
estilos[1] = document.getElementById('e1');
estilos[2] = document.getElementById('e2');
estilos[3] = document.getElementById('e3');

var Rx = 0;
var Ry = 0;


var estSelect = 0;

var boteBasura = new fabric.Image(boteCerrado, {
    left: 1100,
    top: 400,
    opacity: 1,
    width: 100,
    height: 100,
    lockScalingX: true,
    lockScalingY: true,
    hasRotatingPoint: false,
    hasBorders: false,
    selectable: false
});

var NVector = new fabric.Image(nuevoVector, {
    left: 1100,
    top: 100,
    opacity: 1,
    width: 100,
    height: 100,
    lockScalingX: true,
    lockScalingY: true,
    hasRotatingPoint: false,
    hasBorders: false,
    lockRotation: true,
    lockMovementX: true,
    lockMovementY: true,
    selectable: true
});

function VECTOR(x1, y1, x2, y2, numero, color, select) {
    this.cx = x1;
    this.cy = y1;
    this.px = x2;
    this.py = y2;
    this.VPV = null;
    this.VPH = null;
    this.VLV = null;
    this.VLH = null;
    this.E3LV1 = null;
    this.E3LH2 = null;
    this.E3LV1 = null;
    this.E3LH2 = null;

    this.Vector = new fabric.Line([x1, y1, x2, y2], {
        fill: 'red',
        cornerStyle: 'circle',
        stroke: color,
        strokeWidth: 5,
        lockScalingX: true,
        lockScalingY: true,
        hasBorders: false,
        lockRotation: true,
        selectable: false
    });
    //angulo para la punta del vector
    this.angulo2 = function () {
        var valor = (Math.atan(((Canvas.height - this.Vector.y2) - (Canvas.height - this.Vector.y1)) / (this.Vector.x2 - this.Vector.x1)) * 180 / Math.PI);
        if (this.Vector.x2 >= this.Vector.x1)
            return 90 - valor;
        else
            return -90 - valor;
    },
            this.Punta = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: color,
                left: x2,
                top: y2,
                angle: this.angulo2(),
                hasBorders: true,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                selectable: select
            });

    this.Circulo = new fabric.Circle({
        left: x1,
        top: y1,
        strokeWidth: 4,
        radius: 2,
        fill: color,
        stroke: color,
        lockScalingX: true,
        lockScalingY: true,
        hasBorders: false,
        lockRotation: true
    });

    this.VectorSombra = function (x1, y1, x2, y2, color, stroke) {
        return new fabric.Line([x1, y1, x2, y2], {
            fill: color,
            cornerStyle: 'circle',
            stroke: color,
            strokeWidth: stroke,
            lockScalingX: true,
            lockScalingY: true,
            hasBorders: false,
            lockRotation: true,
            selectable: false
        });
    },
            this.PuntaSombra = function (x, y, angulo) {

                return new fabric.Triangle({
                    width: 10,
                    height: 15,
                    fill: 'gray',
                    left: x,
                    top: y,
                    angle: angulo, //90,0
                    hasBorders: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true,
                    selectable: false

                });
            },
            this.agregar = function () {
                this.Punta.name = "p" + numero;
                this.Circulo.name = "c" + numero;

                Canvas.add(this.Vector);
                Canvas.add(this.Punta);
                Canvas.add(this.Circulo);

                Canvas.renderAll();
            },
            this.agregarPosterior = function () {
                Canvas.add(this.Vector);
                Canvas.add(this.Punta);
                Canvas.add(this.Circulo);
            },
            this.eliminar = function () {
                Canvas.remove(this.Vector);
                Canvas.remove(this.Punta);
                Canvas.remove(this.Circulo);
                Canvas.renderAll();
            },
            this.anguloPuntaSombraH = function () {
                if (this.Vector.x2 > this.Circulo.left)
                    return 90;
                return -90;
            },
            this.anguloPuntaSombraV = function () {
                if (this.Vector.y2 < this.Circulo.top)
                    return 0;
                return 180;
            },
            this.desplazamiento_e2 = function () {//e2 y e3
                if (this.Vector.x2 > this.Circulo.left)
                    return this.Punta.left + this.Punta.height / 2;
                return this.Punta.left - this.Punta.height / 2;
            },
            this.angulo = function () {
                var valor = Math.atan(((Canvas.height - this.Vector.y2) - (Canvas.height - this.Vector.y1)) / (this.Vector.x2 - this.Vector.x1)) * 180 / Math.PI;
                if (this.Vector.x2 >= this.Vector.x1 && this.Vector.y2 <= this.Vector.y1)
                    return valor;
                else if (this.Vector.x2 < this.Vector.x1 && this.Vector.y2 <= this.Vector.y1)
                    return valor + 180;
                else if (this.Vector.x2 <= this.Vector.x1 && this.Vector.y2 >= this.Vector.y1)
                    return valor + 180;
                return valor + 360;

            },
            this.anguloAnterior = function () {
                var valor = Math.atan(((Canvas.height - this.py) - (Canvas.height - this.cy)) / (this.px - this.cx)) * 180 / Math.PI;
                if (this.px >= this.cx && this.py <= this.cy)
                    return valor;
                else if (this.px < this.cx && this.py <= this.cy)
                    return valor + 180;
                else if (this.px <= this.cx && this.py >= this.cy)
                    return valor + 180;
                return valor + 360;
            },
            this.desplazamiento_e3V = function () {////---->>>
                if (this.Vector.y2 > this.Circulo.top)
                    return this.Punta.top - Math.sin(this.angulo()) * this.Punta.height / 2;
                return this.Punta.top + Math.sin(this.angulo()) * this.Punta.height / 2;
            },
            this.desplazamiento_e3H = function () {////----->>>
                if (this.Vector.x2 > this.Circulo.left)
                    return this.Punta.left + Math.cos(this.angulo()) * this.Punta.height / 2;
                return this.Punta.left - Math.cos(this.angulo()) * this.Punta.height / 2;
            },
            this.estilo = function () {
                if (estSelect === 1) {
                    this.VPH = this.PuntaSombra(this.Punta.left, this.Circulo.top, this.anguloPuntaSombraH());
                    this.VLH = this.VectorSombra(this.Circulo.left, this.Circulo.top, this.Punta.left, this.Circulo.top, 'gray', 3);
                    this.VPV = this.PuntaSombra(this.Circulo.left, this.Punta.top, this.anguloPuntaSombraV());
                    this.VLV = this.VectorSombra(this.Circulo.left, this.Circulo.top, this.Circulo.left, this.Punta.top, 'gray', 3);
                }
                if (estSelect === 2) {
                    this.VPH = this.PuntaSombra(this.Punta.left, this.Circulo.top, this.anguloPuntaSombraH());
                    this.VLH = this.VectorSombra(this.Circulo.left, this.Circulo.top, this.Punta.left, this.Circulo.top, 'gray', 3);
                    this.VPV = this.PuntaSombra(this.desplazamiento_e2(), this.Punta.top, this.anguloPuntaSombraV());
                    this.VLV = this.VectorSombra(this.desplazamiento_e2(), this.Circulo.top, this.desplazamiento_e2(), this.Punta.top, 'gray', 3);
                }
                if (estSelect === 3) {
                    this.VPH = this.PuntaSombra(this.Punta.left, Canvas.height - 100, this.anguloPuntaSombraH());
                    this.VLH = this.VectorSombra(this.Circulo.left, Canvas.height - 100, this.Punta.left, Canvas.height - 100, 'gray', 3);
                    this.VPV = this.PuntaSombra(200, this.Punta.top, this.anguloPuntaSombraV());
                    this.VLV = this.VectorSombra(200, this.Circulo.top, 200, this.Punta.top, 'gray', 3);

                    this.E3LH1 = this.VectorSombra(200, this.Circulo.top, this.Circulo.left, this.Circulo.top, 'pink', 2);//circulo
                    this.E3LH2 = this.VectorSombra(200, this.Punta.top, this.Punta.left, this.Punta.top, 'pink', 2);

                    this.E3LV1 = this.VectorSombra(this.Circulo.left, Canvas.height - 100, this.Circulo.left, this.Circulo.top, 'pink', 2);//circulo
                    this.E3LV2 = this.VectorSombra(this.Punta.left, Canvas.height - 100, this.Punta.left, this.Punta.top, 'pink', 2);

                }
            },
            this.agregarEstilo = function () {
                if (this.VLH !== null && this.VLV !== null && this.VPH !== null && this.VPV !== null) {
                    Canvas.add(this.VPH);
                    Canvas.add(this.VPV);
                    Canvas.add(this.VLH);
                    Canvas.add(this.VLV);
                    if (estilos[3].checked) {
                        Canvas.add(this.E3LH1);
                        Canvas.add(this.E3LH2);
                        Canvas.add(this.E3LV1);
                        Canvas.add(this.E3LV2);
                    }
                }

            },
            this.eliminarEstilo = function () {
                Canvas.remove(this.VPH);
                Canvas.remove(this.VPV);
                Canvas.remove(this.VLH);
                Canvas.remove(this.VLV);

                Canvas.remove(this.E3LH1);
                Canvas.remove(this.E3LH2);
                Canvas.remove(this.E3LV1);
                Canvas.remove(this.E3LV2);


            },
            this.distanciaEntre2Puntos = function () {
                return Math.sqrt(Math.pow(this.Vector.x2 - this.Vector.x1, 2) + Math.pow(this.Vector.y2 - this.Vector.y1, 2));
            },
            this.distanciaEntre2PuntosAntes = function () {
                return Math.sqrt(Math.pow(this.px - this.cx, 2) + Math.pow(this.py - this.cy, 2));
            };


}

function actualizarVectorSuma() {
    sumaDeVectoresD();
    Vectores[sumaVector].Vector.set('x2', Rx + Vectores[sumaVector].Circulo.left);
    Vectores[sumaVector].Vector.set('y2', Vectores[sumaVector].Circulo.top - Ry);
    Vectores[sumaVector].Punta.set('left', Rx + Vectores[sumaVector].Circulo.left);
    Vectores[sumaVector].Punta.set('top', Vectores[sumaVector].Circulo.top - Ry);

    Vectores[sumaVector].Punta.set('angle', Vectores[sumaVector].angulo2());

    Rx = 0;
    Ry = 0;
    Vectores[sumaVector].px = Vectores[sumaVector].Punta.left;
    Vectores[sumaVector].py = Vectores[sumaVector].Punta.top;

    if (estSelect === 1) {
        desplazarVectoresSombraP1(Vectores[sumaVector]);
    }
    if (estSelect === 2) {
        desplazarVectoresSombraP2(Vectores[sumaVector]);
    }
    if (estSelect === 3) {
        desplazarVectoresSombraP3(Vectores[sumaVector]);
    }
}

function planoCartesiano() {
    ejeY = lineaCuadricula(200, 0, 200, Canvas.height, 'blue', 3);
    ejeX = lineaCuadricula(0, Canvas.height - 100, Canvas.width, Canvas.height - 100, 'blue', 3);
    Canvas.add(ejeX);
    Canvas.add(ejeY);
    Canvas.add(boteBasura);
    Canvas.add(NVector);
    for (var i = 0; i < Vectores.length; i++) {
        Vectores[i].agregarPosterior();
    }
    if (estSelect !== 0) {
        for (var i = 0; i < Vectores.length; i++) {
            Vectores[i].agregarEstilo();
        }
    }
    Canvas.renderAll();
}

function deletePlano() {
    Canvas.remove(ejeX);
    Canvas.remove(ejeY);
    Canvas.remove(boteBasura);
    Canvas.remove(NVector);
    for (var i = 0; i < Vectores.length; i++) {
        Vectores[i].eliminar();
        Vectores[i].eliminarEstilo();
    }

}

function cambioBoteAbierto() {
    boteBasura.setElement(boteAbierto);
    boteBasura.width = 100;
    boteBasura.height = 100;
    Canvas.renderAll();
}

function cambioBoteCerrado() {
    setTimeout(function () {
        boteBasura.setElement(boteCerrado);
        boteBasura.width = 100;
        boteBasura.height = 100;
        Canvas.renderAll();
    }, 1000);
}

//nuevo Vector
NVector.on('selected', function () {
    Vectores[numeroVectores] = new VECTOR(Canvas.width - 200, 200, Canvas.width - 200, 100, numeroVectores, 'red', true);
    if (estSelect !== 0) {
        Vectores[numeroVectores].estilo();
        Vectores[numeroVectores].agregarEstilo();
    }
    Vectores[numeroVectores].agregar();

    if (document.getElementById('suma').checked) {
        actualizarVectorSuma();
    }
    numeroVectores++;
});

planoCartesiano();



Canvas.on({
    'object:moving': onChange,
    'object:selected': onSelected,
    'object:modified': modified
});

function onSelected(e) {

    for (var i = 0; i < Vectores.length; i++) {
        if (Vectores[i].Punta.name === e.target.name)
            mostrarValores(Vectores[i]);
        if (Vectores[i].Circulo.name === e.target.name)
            mostrarValores(Vectores[i]);
    }
}
function modified(e) {
    for (var i = 0; i < Vectores.length; i++) {
        if (Vectores[i].Punta.name === e.target.name)
            mostrarValores(Vectores[i]);
        if (Vectores[i].Circulo.name === e.target.name)
            mostrarValores(Vectores[i]);
    }
}

function mostrarValores(Vector) {
    document.getElementById('R').innerHTML = '<b>|R|</b>=' + Vector.distanciaEntre2Puntos().toFixed(2);
    document.getElementById('Angulo').innerHTML = '<b>θ</b>=' + Vector.angulo().toFixed(2);
    document.getElementById('Rx').innerHTML = '<b>Rx</b>=' + (Vector.Punta.getLeft() - Vector.Circulo.getLeft());
    document.getElementById('Ry').innerHTML = '<b>Ry</b>=' + (Vector.Circulo.getTop() - Vector.Punta.getTop());
}

function desplazarVectoresSombraP1(Vector) {

    Vector.VLH.set('x2', Vector.Punta.left);
    Vector.VPH.left = Vector.Punta.left;
    Vector.VPH.angle = Vector.anguloPuntaSombraH();
    Vector.VLV.set('y2', Vector.Punta.top);
    Vector.VPV.top = Vector.Punta.top;
    Vector.VPV.angle = Vector.anguloPuntaSombraV();

}
function desplazarVectoresSombraP2(Vector) {
    Vector.VLH.set('x2', Vector.Punta.left);
    Vector.VPH.left = Vector.Punta.left;
    Vector.VPH.angle = Vector.anguloPuntaSombraH();
    Vector.VLV.set('x1', Vector.Punta.getLeft() > Vector.Circulo.getLeft() ? Vector.Punta.getLeft() + Vector.Punta.height / 2 : Vector.Punta.getLeft() - Vector.Punta.height / 2);
    Vector.VLV.set('x2', Vector.Punta.getLeft() > Vector.Circulo.getLeft() ? Vector.Punta.getLeft() + Vector.Punta.height / 2 : Vector.Punta.getLeft() - Vector.Punta.height / 2);
    Vector.VLV.set('y2', Vector.Punta.top);
    Vector.VPV.top = Vector.Punta.top;
    Vector.VPV.left = Vector.Punta.getLeft() > Vector.Circulo.getLeft() ? Vector.Punta.getLeft() + Vector.Punta.height / 2 : Vector.Punta.getLeft() - Vector.Punta.height / 2;
    Vector.VPV.angle = Vector.anguloPuntaSombraV();

}

function desplazarVectoresSombraP3(Vector) {
    Vector.VLV.set('y2', Vector.Punta.top);
    Vector.VPV.top = Vector.Punta.top;
    Vector.VPV.angle = Vector.anguloPuntaSombraV();
    Vector.VLH.set('x2', Vector.Punta.left);
    Vector.VPH.left = Vector.Punta.left;
    Vector.VPH.angle = Vector.anguloPuntaSombraH();
    Vector.E3LH2.set({y1: Vector.Punta.top, y2: Vector.Punta.top, x2: Vector.Punta.left});
    Vector.E3LV2.set({x1: Vector.Punta.left, x2: Vector.Punta.left, y2: Vector.Punta.top});

}

function desplazarVectoresSombraC1(Vector, VLV_left) {

    Vector.VLH.set('x1', Vector.Circulo.getLeft());
    Vector.VLH.set('y1', Vector.Circulo.getTop());
    Vector.VLV.set('x1', VLV_left);//Vector.Circulo.getLeft());//
    Vector.VLV.set('y1', Vector.Circulo.getTop());
    Vector.VLH.set('x2', Vector.VLH.get('x2') - (Vector.cx - Vector.Circulo.getLeft()));
    Vector.VLH.set('y2', Vector.Circulo.getTop());
    Vector.VLV.set('x2', VLV_left);
    Vector.VLV.set('y2', Vector.VLV.get('y2') + ((Vector.Punta.getTop() - Vector.py)));
    Vector.VPH.set('left', Vector.VPH.get('left') - (Vector.cx - Vector.Circulo.getLeft()));
    Vector.VPH.set('top', Vector.Circulo.getTop());
    Vector.VPV.set('left', VLV_left);
    Vector.VPV.set('top', Vector.VPV.get('top') + ((Vector.Punta.getTop() - Vector.py)));
}

function desplazarVectoresSombraC3(Vector) {

    Vector.VLH.set('x1', Vector.Circulo.getLeft());//1
    Vector.VLV.set('y1', Vector.Circulo.getTop());//3
    Vector.VLH.set('x2', Vector.VLH.get('x2') - (Vector.cx - Vector.Circulo.getLeft()));//4
    Vector.VLV.set('y2', Vector.VLV.get('y2') + ((Vector.Punta.getTop() - Vector.py)));//7
    Vector.VPH.set('left', Vector.VPH.get('left') - (Vector.cx - Vector.Circulo.getLeft()));//8
    Vector.VPV.set('top', Vector.VPV.get('top') + ((Vector.Punta.getTop() - Vector.py)));//11

    Vector.E3LH1.set('y1', Vector.Circulo.top);
    Vector.E3LH1.set('x2', Vector.Circulo.left);
    Vector.E3LH1.set('y2', Vector.Circulo.top);

    Vector.E3LH2.set('y1', Vector.Punta.top);
    Vector.E3LH2.set('x2', Vector.Punta.left);
    Vector.E3LH2.set('y2', Vector.Punta.top);

    Vector.E3LV1.set('x1', Vector.Circulo.left);
    Vector.E3LV1.set('x2', Vector.Circulo.left);
    Vector.E3LV1.set('y2', Vector.Circulo.top);

    Vector.E3LV2.set('x1', Vector.Punta.left);
    Vector.E3LV2.set('x2', Vector.Punta.left);
    Vector.E3LV2.set('y2', Vector.Punta.top);
}



function onChange(e) {
    for (var i = 0; i < Vectores.length; i++) {
        var vectSum = document.getElementById('suma').checked;

        if (Vectores[i].Punta.name === e.target.name) {
            Vectores[i].Vector.set('x2', Vectores[i].Punta.getLeft());
            Vectores[i].Vector.set('y2', Vectores[i].Punta.getTop());
            Vectores[i].Punta.set('angle', Vectores[i].angulo2());

            if (estSelect === 1) {
                desplazarVectoresSombraP1(Vectores[i]);
            }
            if (estSelect === 2) {
                desplazarVectoresSombraP2(Vectores[i]);
            }
            if (estSelect === 3) {
                desplazarVectoresSombraP3(Vectores[i]);
            }

            if (vectSum) {
                actualizarVectorSuma();
            }

            Vectores[i].px = Vectores[i].Punta.left;
            Vectores[i].py = Vectores[i].Punta.top;

        } else if (Vectores[i].Circulo.name === e.target.name) {

            Vectores[i].Vector.set('x1', Vectores[i].Circulo.getLeft());
            Vectores[i].Vector.set('y1', Vectores[i].Circulo.getTop());
            Vectores[i].Vector.set('x2', Vectores[i].Vector.get('x2') - (Vectores[i].cx - Vectores[i].Circulo.getLeft()));
            Vectores[i].Vector.set('y2', Vectores[i].Vector.get('y2') - (Vectores[i].cy - Vectores[i].Circulo.getTop()));
            Vectores[i].Punta.set('left', Vectores[i].Punta.getLeft() - (Vectores[i].cx - Vectores[i].Circulo.getLeft()));
            Vectores[i].Punta.set('top', Vectores[i].Punta.getTop() - (Vectores[i].cy - Vectores[i].Circulo.getTop()));

            if (estSelect === 1) {
                desplazarVectoresSombraC1(Vectores[i], Vectores[i].Circulo.getLeft());
            }

            if (estSelect === 2) {
                desplazarVectoresSombraC1(Vectores[i], Vectores[i].Punta.getLeft() > Vectores[i].Circulo.getLeft() ? Vectores[i].Punta.getLeft() + Vectores[i].Punta.height / 2 : Vectores[i].Punta.getLeft() - Vectores[i].Punta.height / 2);
            }

            if (estSelect === 3) {
                desplazarVectoresSombraC3(Vectores[i]);
            }

            Vectores[i].cx = Vectores[i].Circulo.getLeft();
            Vectores[i].cy = Vectores[i].Circulo.getTop();
            Vectores[i].px = Vectores[i].Punta.getLeft();
            Vectores[i].py = Vectores[i].Punta.getTop();
            Canvas.remove(Vectores[i].Punta);
            Canvas.add(Vectores[i].Punta);

        }

        e.target.setCoords();
        
        if (Vectores[i].Circulo.intersectsWithObject(boteBasura)) {
            cambioBoteAbierto();
            Vectores[i].eliminar();
            Vectores[i].eliminarEstilo();
            Vectores.splice(i, 1);
            numeroVectores--;

            if (sumaVector !== null) {
                if (i === sumaVector) {
                    document.getElementById('suma').checked = false;
                }
                if (i < sumaVector) {
                    sumaVector--;
                }
            }

            if (document.getElementById('suma').checked) {
                actualizarVectorSuma();
            }


        } else {
            cambioBoteCerrado();
        }

    }

}

//Panel de opciones 

function lineaCuadricula(x1, y1, x2, y2, color, grosor) {
    return new fabric.Line([x1, y1, x2, y2], {
        fill: color,
        cornerStyle: 'circle',
        stroke: color,
        strokeWidth: grosor,
        lockScalingX: true,
        lockScalingY: true,
        hasBorders: false,
        lockRotation: true,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false
    });
}

var lineaV = [];
var lineaH = [];
function cuadricular(checado) {
    if (checado.checked) {
        deletePlano();
        //Vertical
        for (var i = 0; i <= Canvas.width; i = i + 10) {
            if ((i % 100) === 0) {
                lineaV[i / 10] = lineaCuadricula(i, Canvas.height, i, 0, 'green', 2);

            } else {
                lineaV[i / 10] = lineaCuadricula(i, Canvas.height, i, 0, 'yellow', 1);

            }
            Canvas.add(lineaV[i / 10]);
        }

        //Horizontal
        for (var i = 0; i <= Canvas.height; i = i + 10) {
            if ((i % 100) === 0) {
                lineaH[i / 10] = lineaCuadricula(Canvas.width, i, 0, i, 'green', 2);

            } else {
                lineaH[i / 10] = lineaCuadricula(Canvas.width, i, 0, i, 'yellow', 1);

            }
            Canvas.add(lineaH[i / 10]);
        }
        Canvas.remove(lineaH[50]);
        Canvas.remove(lineaV[20]);

        planoCartesiano();
        Canvas.renderAll();


    } else {

        for (var i = 0; i <= Canvas.height / 10; i++) {
            Canvas.remove(lineaH[i]);
        }
        for (var i = 0; i <= Canvas.width / 10; i++) {
            Canvas.remove(lineaV[i]);
        }
        Canvas.renderAll();
    }

}


function estilo(estilo) {

    for (var i = 0; i < Vectores.length; i++) {
        Vectores[i].eliminarEstilo();
    }
    for (var i = 0; i < estilos.length; i++) {
        if (estilo !== estilos[i]) {
            estilos[i].checked = false;
        } else {
            estSelect = i;
        }
    }

    if (estilo.checked && estilo !== estilos[0]) {
        estilo123();

    } else {
        estilos[0].checked = true;
        estSelect = 0;
    }

    Canvas.renderAll();

}

function estilo123() {
    for (var i = 0; i < Vectores.length; i++) {
        Vectores[i].eliminar();
        Vectores[i].estilo();
        Vectores[i].agregarEstilo();
        Vectores[i].agregarPosterior();
    }
    Canvas.renderAll();
}


function distanciaEntre2Puntos(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function sumaDeVectores() {
    for (var i = 0; i < Vectores.length; i++) {
        Rx += Vectores[i].Vector.x2 - Vectores[i].Vector.x1;
        Ry += Vectores[i].Vector.y1 - Vectores[i].Vector.y2;
    }
}

function sumaDeVectoresD() {
    for (var i = 0; i < Vectores.length; i++) {
        if (Vectores[i] !== Vectores[sumaVector]) {
            Rx += Vectores[i].Vector.x2 - Vectores[i].Vector.x1;
            Ry += Vectores[i].Vector.y1 - Vectores[i].Vector.y2;
        }
    }
}

function mostrarVectorSuma(checkbox) {
    if (checkbox.checked) {
        sumaDeVectores();

        Vectores[numeroVectores] = new VECTOR(200, Canvas.height - 100, Rx + 200, Canvas.height - Ry - 100, -1, 'blue', false);
        Vectores[numeroVectores].agregar();
        sumaVector = numeroVectores;
        if (estSelect !== 0) {
            Vectores[numeroVectores].estilo();
            Vectores[numeroVectores].agregarEstilo();
        }
        numeroVectores++;
        Rx = 0;
        Ry = 0;

    } else {
        Vectores[sumaVector].eliminar();
        Vectores[sumaVector].eliminarEstilo();
        Vectores.splice(sumaVector, 1);
        numeroVectores--;
        sumaVector = null;
        Canvas.renderAll();

    }
}

function Objetos(x1, y1, x2, y2, numero, color, select) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.numero = numero;
    this.color = color;
    this.select = select;
}

function cargarVectores(Vectores) {
    var ObjetosAGuardar = [];
    for (var i = 0; i < Vectores.length; i++) {

        ObjetosAGuardar[i] = Objetos(Vectores[i].Circulo.left, Vectores[i].Circulo.top, Vectores[i].Punta.left, Vectores[i].Punta.top, i, Vectores[i].Punta.get('fill'), Vectores[i].Punta.get('selectable'));
    }
    return ObjetosAGuardar;
}

function cargarCadenaVectores(Vectores) {
    var cadena = "";

    for (var i = 0; i < Vectores.length; i++) {
        if (i !== sumaVector) {
            cadena += "x1:" + Vectores[i].Circulo.left + "," + "y1:" + Vectores[i].Circulo.top + "," + "x2:" + Vectores[i].Punta.left + "," + "y2:" + Vectores[i].Punta.top + ";";
        }
        if (i === sumaVector) {
            document.getElementById('Datos:PFx1').value = Vectores[i].Circulo.left;
            document.getElementById('Datos:PFy1').value = Vectores[i].Circulo.top;
        }

    }
    return cadena;

}

function componente() {
    var componente = document.getElementById('Datos:PFC').value;
    switch (componente) {
        case "ninguno":
            document.getElementById('ninguno').checked = true;
            break;
        case "e1":
            document.getElementById('e1').checked = true;
            estSelect = 1;
            break;
        case "e2":
            document.getElementById('e2').checked = true;
            estSelect = 2;
            break;
        case "e3":
            document.getElementById('e3').checked = true;
            estSelect = 3;
            break;
    }
}

function cargarVectorSuma(x1, y1, x2, y2, color, selected) {
    sumaDeVectores();

    Vectores[numeroVectores] = new VECTOR(x1, y1, x2, y2, numeroVectores, color, selected);
    Vectores[numeroVectores].agregar();
    sumaVector = numeroVectores;
    if (estSelect !== 0) {
        Vectores[numeroVectores].estilo();
        Vectores[numeroVectores].agregarEstilo();
    }
    numeroVectores++;
    Rx = 0;
    Ry = 0;

}
  
function cargarVectoresAlCanvas(cadena, vectorSuma, vectorSumax1, vectorSumay1) {
    if (vectorSuma) {
        sumaDeVectores();

        //Vectores[numeroVectores]=new VECTOR(200,Canvas.height-100,Rx+200,Canvas.height-Ry-100,-1,'blue',false);
        Vectores[numeroVectores] = new VECTOR(vectorSumax1, vectorSumay1, Rx + vectorSumax1, Canvas.height - Ry - vectorSumay1, -1, 'blue', false);
        Vectores[numeroVectores].agregar();
        sumaVector = numeroVectores;
        if (estSelect !== 0) {
            Vectores[numeroVectores].estilo();
            Vectores[numeroVectores].agregarEstilo();
        }
        numeroVectores++;
        Rx = 0;
        Ry = 0;

        Canvas.renderAll();
    }

    var caracter, subcadena = "";
    var datos = [];
    var x1, y1, x2, y2;

    var i = 0, j = 0, k = 0, VS = -1;
    do {
        caracter = cadena.charAt(i);
        if (caracter === ':') {
            do {
                caracter = cadena.charAt(++i);
                if (caracter !== ',' && caracter !== ';') {
                    subcadena += caracter;
                }

            } while (caracter !== ',' && caracter !== ';');
            datos[j] = subcadena;

            j++;
            subcadena = "";
        }
        if (caracter === ';') {
            x1 = datos[0];
            y1 = datos[1];
            x2 = datos[2];
            y2 = datos[3];
            crearVector(x1, y1, x2, y2, 'red', true, vectorSuma);

            console.log(datos[0] + ";" + datos[1] + ";" + datos[2] + ";" + datos[3]);
            j = 0;
        }

        i++;
    } while (i < cadena.length);



}

var cadena = "";
function crearVector(x1, y1, x2, y2, color, selected, actualizar) {
    Vectores[numeroVectores] = new VECTOR(x1, y1, x2, y2, numeroVectores, 'red', true);
    console.log("Vector:" + numeroVectores);

    if (estSelect !== 0) {
        Vectores[numeroVectores].estilo();
        Vectores[numeroVectores].agregarEstilo();
    }
    Vectores[numeroVectores].agregar();
    if (actualizar) {
        actualizarVectorSuma();
    }
    numeroVectores++;
    Canvas.renderAll();
}