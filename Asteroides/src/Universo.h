#ifndef UNIVERSO_H
#define UNIVERSO_H
#include "Asteroide.h"
#include "gfx.h"
#include <time.h>

const int ANCHO= 800;
const int ALTO=600;
const char NOMBRE[]={"UNIVERSO"};
const unsigned char CR=0,CG=200,CB=100;
		
	class Universo
	{
	private:
		int NumMet;
		int tiempoVida;
		vector<Asteroide> meteoritos;
		vector<Asteroide> subAsteroides;
		std::vector<Asteroide>::iterator im;
		std::vector<Asteroide>::iterator im2;
		int agregarSubAsteroides(int cantidad,Coordenada centro, double angulo, int amplificacion);
	 	bool detectarColisiones(std::vector<Asteroide>::iterator im);

	public:
		Universo(int = 0,int = 0);
	 	void iniciar();
		
	};

#endif