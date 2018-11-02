#ifndef METEORITO_H
#define METEORITO_H
#include "Linea.h"
#include <vector>
using namespace std;
class Asteroide
{

private:
	int velocidad;
	int numero_vertices;
	std::vector<Linea>::iterator i_l;
	vector<Linea> vector_lineas;
	Coordenada posIni; 
	double angulo;
	int amp_f;
	char giro;
	bool subAsteroide;
	int tiempoVida;
	void getCentro_Angulo(int &x, int &y);
	void dibujar();
	void rotar(int tiempo);
	void mover();
	

public:
	Asteroide();
	void init(bool = false, int = 0, int = 0, double = 0, int = 1);
	bool update(int tiempo);
	int colision();
	Coordenada getCentro();
	double getAngulo();
	int getAmpFinal();
	~Asteroide();
};
#endif