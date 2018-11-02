
#include "formMath.h"
#include <iostream>
#include <math.h>
using namespace std;
double distanciaDosPuntos(Coordenada p1, Coordenada p2)
{
	return sqrt(pow(p2.getX()-p1.getX(),2)+pow(p2.getY()-p1.getY(),2));
}




