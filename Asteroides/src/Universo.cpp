#include "Universo.h"
#include <iostream>
#include <unistd.h>
#include "formMath.h"
Universo::Universo(int numeroAsteroides, int t_vida)
{
	gfx_open(ANCHO, ALTO, NOMBRE);
	gfx_color(CR,CG,CB);
	srand(time(NULL));
	NumMet = numeroAsteroides;
	tiempoVida = t_vida;
	meteoritos.resize(numeroAsteroides);
	
	for(int i=0; i<NumMet; i++)
	{
		meteoritos[i].init();
	}
}

void Universo::iniciar()
{
	for(int t=1;t<tiempoVida;t++)
	{
		gfx_clear();

		for(im=meteoritos.begin();im<meteoritos.end();im++)
		{
			im->update(t);
			detectarColisiones(im);
		}

		for(im=subAsteroides.begin();im<subAsteroides.end();im++)
		{
			if(!im->update(t))
			{
				subAsteroides.erase(im);
				im--;
			}	
		}

		gfx_flush();
		usleep(44666);		
	}
}

int Universo::agregarSubAsteroides(int cantidad,Coordenada centro, double angulo, int amplificacion)
{
	int tamI=subAsteroides.size();
	
	int tamF=tamI + cantidad;
	amplificacion=(amplificacion/2)+1;
	subAsteroides.resize( tamF );
	for( int i=tamI; i<tamF; i++ )
	{	
		subAsteroides[i].init(true,centro.getX(),centro.getY(),angulo+5*i,(rand()%2)+1);
	}
	return cantidad;
}

bool Universo:: detectarColisiones(std::vector<Asteroide>::iterator im)
{
	int c;
	for(im2=meteoritos.begin();im2<meteoritos.end();im2++)
	{
		if(im2!=im){
			if(distanciaDosPuntos(im->getCentro(),im2->getCentro()) < im->getAmpFinal()+im2->getAmpFinal())
			{
				c=im->colision();
				agregarSubAsteroides(c,im->getCentro(),im->getAngulo(),im->getAmpFinal());
			
				c=im2->colision();
				agregarSubAsteroides(c,im2->getCentro(),im2->getAngulo(),im2->getAmpFinal());
				if(im < im2)
				{
					meteoritos.erase(im);
					meteoritos.erase(im2-1);
					im-=2;
				}
				else
				{
					meteoritos.erase(im);
					meteoritos.erase(im2);
					im--;	
				}
				return true;
			}
		}
		
	}
	return false;
}



