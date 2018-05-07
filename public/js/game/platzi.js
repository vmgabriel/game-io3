var vp = document.getElementById("canvasGame");
var papel= vp.getContext("2d");


var min=0;
var max=7;
var cantidad = aleatorio(1,8);
var posVaca= crearMatriz(cantidad,cantidad);
var posPollo= crearMatriz(cantidad,cantidad);
var posCerdo= crearMatriz(cantidad,cantidad);
var disponibleV;
var disponibleC;
var disponibleP;
var soleado = document.getElementById("soleado");
var nublado = document.getElementById("nublado");
var dia = document.getElementById("dia");
var noche = document.getElementById("noche");
var pregunta = document.getElementById("pregunta");
var imgSoleado;
var imgFrio;
var imgDia;
var imgNoche;


//Json
var flechas={
	up: 38,
	down: 40,
	left: 37,
	right: 39
}
var fondo = {
	url: "../../img/game/tile.png",
	cargaOk: false
};
var vaca = {
	url: "vaca.png",
	cargaOk: false,
	posx : null,
	posy : null
};
var cerdo = {
	url: "cerdo.png",
	cargaOk: false
};
var pollo = {
	url: "pollo.png",
	cargaOk: false
};


document.addEventListener("keydown",movimiento);
soleado.addEventListener("click",cargarFondoS);
nublado.addEventListener("click",cargarFondoN);
dia.addEventListener("click",cargarFondoD);
noche.addEventListener("click",cargarFondoNo);
pregunta.addEventListener("click",ayuda);

ayuda = new Image();
ayuda.src = "ayuda.png";

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);
//diferentes fondos
imgSoleado = new Image();
imgSoleado.src="tileSoleado.png";
imgFrio = new Image();
imgFrio.src="tileFrio.png";
imgDia = new Image();
imgDia.src="tile.png";
imgNoche = new Image();
imgNoche.src="tileNoche.png";

//se crea el atributo que guarda la imagen;
vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargarVaca);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdo);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargarPollo);




function cargarFondo(){
	fondo.cargaOk = true;

}
function cargarVaca(){
	vaca.cargaOk = true;
}
function cargarCerdo(){
	cerdo.cargaOk = true;
}
function cargarPollo(){
	pollo.cargaOk = true;
}
//Dibuja imagenes iniciales
setTimeout("dibujar()",200);

function ayuda(){
	lienzo.drawImage(ayuda,10,10);
}
function cargarFondoS(){

	fondo.imagen.src = "tileSoleado.png";
	papel.drawImage(imgSoleado, 0, 0);
	dibujarMovimiento();

}
function cargarFondoN(){
	fondo.imagen.src = "tileFrio.png";
	papel.drawImage(imgFrio, 0, 0);
	dibujarMovimiento();
}
function cargarFondoD(){
	fondo.imagen.src = "tile.png";
	papel.drawImage(imgDia, 0, 0);
	dibujarMovimiento();
}
function cargarFondoNo(){
	fondo.imagen.src = "tileNoche.png";
	papel.drawImage(imgNoche, 0, 0);
	dibujarMovimiento();
}


function verificarEspacioD(posX,posY,arreglo,rangoY,rangoX,vertical,left){
	disponible=true;
		if(vertical){
			for(var i=0; i< cantidad;i++){

				if((posY==(arreglo[i][1])+rangoY) && (posX>= (arreglo[i][0])-rangoX &&posX<=((arreglo[i][0])+rangoX))){
					disponible=false;
				}
			}
		}else{
			for(var i=0; i< cantidad;i++){

				if((posX<=(arreglo[i][0])+rangoX && posX>=(arreglo[i][0])) && (posY>= (arreglo[i][1])-rangoY &&posY<=((arreglo[i][1])+rangoY))&&left==true){
					disponible=false;
				}else if((posX>=(arreglo[i][0])+rangoX && posX<=(arreglo[i][0])) && (posY>= (arreglo[i][1])-rangoY &&posY<=((arreglo[i][1])+rangoY))&&left==false){
					disponible=false;
				}
			}
		}
	return disponible;
}
function movimiento(evento){
	switch (evento.keyCode){
		case flechas.up:
		disponibleV=verificarEspacioD(vaca.posx,vaca.posy,posVaca,50,60, true,false);
		disponibleC=verificarEspacioD(vaca.posx,vaca.posy,posCerdo,50,60, true,false);
		disponibleP=verificarEspacioD(vaca.posx,vaca.posy,posPollo,50,60, true,false);
		if(vaca.posy>0 && disponibleV==true&&disponibleC==true&&disponibleP==true){
			vaca.posy-=10;
			dibujarMovimiento();
		}

		break;
		case flechas.down:
		disponibleV=verificarEspacioD(vaca.posx,vaca.posy,posVaca,-50, 60,true,false);
		disponibleC=verificarEspacioD(vaca.posx,vaca.posy,posCerdo,-50, 60,true,false);
		disponibleP=verificarEspacioD(vaca.posx,vaca.posy,posPollo,-50, 60,true,false);
		if(vaca.posy<=vp.height-80 && disponibleV==true&&disponibleC==true&&disponibleP==true){
			vaca.posy+=10;
			dibujarMovimiento();
		}
		break;
		case flechas.left:
		disponibleV=verificarEspacioD(vaca.posx,vaca.posy,posVaca,40,80,false,true);
		disponibleC=verificarEspacioD(vaca.posx,vaca.posy,posCerdo,40,80,false,true);
		disponibleP=verificarEspacioD(vaca.posx,vaca.posy,posPollo,40,80,false,true);
		if(vaca.posx>0&& disponibleV==true&&disponibleC==true&&disponibleP==true){
			vaca.posx-=10;
			dibujarMovimiento();
		}
		break;
		case flechas.right:
		disponibleV=verificarEspacioD(vaca.posx,vaca.posy,posVaca,40,-80,false,false);
		disponibleC=verificarEspacioD(vaca.posx,vaca.posy,posCerdo,40,-80,false,false);
		disponibleP=verificarEspacioD(vaca.posx,vaca.posy,posPollo,40,-80,false,false);
		if(vaca.posx<vp.width-80&& disponibleV==true&&disponibleC==true&&disponibleP==true){
			vaca.posx+=10;
			dibujarMovimiento();
		}
		break;
		default:
		break;
	}
}

function dibujarMovimiento(){
	//fondo
	papel.drawImage(fondo.imagen, 0, 0);
	//vacas
	for(var i=0; i<cantidad-1; i++){
		papel.drawImage(vaca.imagen,posVaca[i][0],posVaca[i][1]);
	}
	//cerdos y pollos
	for(var i=0; i<cantidad; i++){
		papel.drawImage(cerdo.imagen,posCerdo[i][0],posCerdo[i][1]);
		papel.drawImage(pollo.imagen, posPollo[i][0], posPollo[i][1]);
	}

	papel.drawImage(vaca.imagen,vaca.posx,vaca.posy);
}

function dibujar(){

	if(fondo.cargaOk){
	papel.drawImage(fondo.imagen, 0, 0);
	}

	if(vaca.cargaOk){
		console.log("cantidad vacas "+cantidad);

		for(var i=0; i<cantidad-1; i++){

		vaca.posx=aleatorio(min,max)*60;
		vaca.posy=aleatorio(min,max)*60;
		posVaca[i][0]=vaca.posx;
		posVaca[i][1]=vaca.posy;
		papel.drawImage(vaca.imagen,vaca.posx, vaca.posy);
		}
		vaca.posx=aleatorio(min,max)*60;
		vaca.posy=aleatorio(min,max)*60;
		papel.drawImage(vaca.imagen,vaca.posx, vaca.posy);
	}

	if(cerdo.cargaOk){
		console.log("cantidad cerdos "+cantidad);
		for(var i=0; i<cantidad; i++){

		var xv=aleatorio(min,max)*60;
		var yv=aleatorio(min,max)*60;
		posCerdo[i][0]=xv;
		posCerdo[i][1]=yv;
		papel.drawImage(cerdo.imagen, xv, yv);
		}
	}

	if(pollo.cargaOk){
		console.log("cantidad pollos "+cantidad);
		for(var i=0; i<cantidad; i++){

		var xv=aleatorio(min,max)*60;
		var yv=aleatorio(min,max)*60;
		posPollo[i][0]=xv;
		posPollo[i][1]=yv;
		papel.drawImage(pollo.imagen, xv, yv);
		}
	}

}

//funcion que crea una matriz
function crearMatriz(cantidad,limite){
	var arreglo= new Array();
	for(var i=0; i<cantidad; i++){
		arreglo[i]= new Array();

	}
	return arreglo;
}

//funcion que retorna un numero aleatorio
function aleatorio(min, maxi){
	var resultado;
	resultado=Math.floor( Math.random()*(maxi-min+1))+min;
	return resultado;
}
