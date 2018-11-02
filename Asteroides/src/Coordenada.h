#ifndef COORDENADA_H
#define COORDENADA_H

class Coordenada
{

private:

	int x;
	int y;
public:

	Coordenada(int = 0, int= 0);
	double tam;
	double angulo;
	void init(int x, int y);
	void setX(int valor);
	void setY(int valor);
	int getX();
	int getY();
};

#endif