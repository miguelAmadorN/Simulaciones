#include <iostream>
#include "Coordenada.h"

Coordenada::Coordenada(int x, int y)
{
	this->x=x;
	this->y=y;
}

void Coordenada::init(int x, int y)
{
	this->x=x;
	this->y=y;
}

void Coordenada::setX(int valor)
{
	this->x=valor;
}


void Coordenada::setY(int valor)
{
	this->y=valor;
}

int Coordenada::getX()
{
	return x;
}


int Coordenada::getY()
{
	return y;
}

