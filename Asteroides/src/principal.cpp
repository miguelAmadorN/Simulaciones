#include "Universo.h"
#include <iostream>
using namespace std;

int main()
{
	int numeroAsteroides = 50;
	int tiempoVidaUniverso = 300;
	
	Universo universo(numeroAsteroides, tiempoVidaUniverso);
	universo.iniciar();
	return 0;
}
