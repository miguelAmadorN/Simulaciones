#include <iostream>
#include "Linea.h"
#include <cmath>

Linea::Linea()
{
}

Linea::Linea(Coordenada p1, Coordenada p2)
{
	this->p1=p1;
	this->p2=p2;
}


void Linea::init(Coordenada p1, Coordenada p2)
{
	this->p1=p1;
	this->p2=p2;
}

Coordenada Linea::getP1()
{
	return p1;
}

Coordenada Linea::getP2()
{
	return p2;
}

void Linea::setP1(Coordenada punto)
{
	p1=punto;
}

void Linea::setP2(Coordenada punto)
{
	p2=punto;
}

Linea::~Linea()
{

}
