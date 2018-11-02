#ifndef LINEA_H
#define LINEA_H
#include "Coordenada.h"

class Linea
{
private:
	Coordenada p1;
	Coordenada p2;
public:
	Linea();
	Linea(Coordenada p1, Coordenada p2);
	void init(Coordenada p1, Coordenada p2);
	Coordenada getP1();
	Coordenada getP2();
	void setP1(Coordenada punto);
	void setP2(Coordenada punto);
	~Linea();

};


#endif