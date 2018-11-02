#include "Asteroide.h"
#include <iostream>
#include "Universo.h"
#include <cmath>
#include <time.h>
#include "gfx.h"
#include <unistd.h>
#include "formMath.h"
using namespace std;

Asteroide::Asteroide()
{

}

void Asteroide::init(bool subAsteroide, int xc, int yc, double angulo, int ampf )
{
	int ancho,alto;
	Coordenada p_1,p_2;
	int amp,amp_i,ampMayor;
	this->subAsteroide=subAsteroide;
	this->giro=rand()%2;
	this->numero_vertices=rand()%10+10;
	
	if(subAsteroide)
	{
		tiempoVida=rand()%10+10;
		ancho=xc;
		alto=yc;
		this->angulo=angulo;
		amp_f=ampf;
		amp_i=rand()%3+5;
 		this->velocidad=10/amp_f;
	}
	else
	{
		getCentro_Angulo(ancho,alto);
		amp_f=rand()%4+1;
		amp_i=rand()%5+10;
		this->velocidad=8/amp_f;
	}
	ampMayor=amp_i;

	posIni.init(ancho,alto);
	double grados=360/numero_vertices,c=M_PI/180;
 	int g=0;
 		
 	p_1.init(posIni.getX()+amp_i*amp_f,posIni.getY());
 	p_1.tam=amp_i*amp_f;
 	p_1.angulo=0;

 	vector_lineas.resize(numero_vertices);
	for(int i=1;i<numero_vertices;i++)
	{   
		if(subAsteroide)
		{
 			amp=rand()%3+5;
 			if(amp>ampMayor)
 				ampMayor=amp;
		}
 		else
 		{
 			amp=rand()%5+10;
 			if(amp>ampMayor)
 				ampMayor=amp;
 		}

		g=(i*grados);
		p_2.init(posIni.getX()+cos(g*c)*amp*amp_f,posIni.getY()-sin(g*c)*amp*amp_f);
		p_2.tam=amp*amp_f;
		p_2.angulo=g;
		vector_lineas[i].init(p_1,p_2);
		p_1=p_2;
	}
	p_2.init(posIni.getX()+amp_i*amp_f,posIni.getY());
	p_2.tam=amp_i*amp_f;
	p_2.angulo=0;
	vector_lineas[0].init(p_1,p_2);
	amp_f*=ampMayor;
}

int Asteroide::colision()
{
	return rand()%5+5;
}

void Asteroide:: mover()
{
	Coordenada aux;
	double c=angulo*M_PI/180;
	posIni.init(posIni.getX()+velocidad*cos(c),posIni.getY()-velocidad*sin(c));

 	for(i_l=vector_lineas.begin();i_l!=vector_lineas.end();i_l++){	
		aux.init(i_l->getP1().getX()+velocidad*cos(c),i_l->getP1().getY()-velocidad*sin(c));
		aux.tam=i_l->getP1().tam;
		aux.angulo=i_l->getP1().angulo;
		i_l->setP1(aux);
		aux.init(i_l->getP2().getX()+velocidad*cos(c),i_l->getP2().getY()-velocidad*sin(c));
		aux.tam=i_l->getP2().tam;
		aux.angulo=i_l->getP2().angulo;
		i_l->setP2(aux);
	}	
}

void Asteroide:: dibujar()
{
	for(i_l=vector_lineas.begin();i_l!=vector_lineas.end();i_l++)
		gfx_line(i_l->getP1().getX(), i_l->getP1().getY(), i_l->getP2().getX(), i_l->getP2().getY());
		
}

void Asteroide:: rotar(int t)
{
	Coordenada aux;
	double d,c=M_PI/180;
	t+=(velocidad*10);
	if(giro)
		t=-t;

	for(i_l=vector_lineas.begin();i_l!=vector_lineas.end();i_l++)
	{	
		d=i_l->getP1().tam;
		aux.init(posIni.getX()+cos((i_l->getP1().angulo+t)*c)*d,posIni.getY()-sin((i_l->getP1().angulo+t)*c)*d);
		aux.tam=d;	
		aux.angulo=i_l->getP1().angulo;
		i_l->setP1(aux);
		d=i_l->getP2().tam;
		aux.init(posIni.getX()+cos((i_l->getP2().angulo+t)*c)*d,posIni.getY()-sin((i_l->getP2().angulo+t)*c)*d);
		aux.tam=d;
		aux.angulo=i_l->getP2().angulo;
		i_l->setP2(aux);
	}

}

bool Asteroide::update(int tiempo)
{
	if(subAsteroide)
	{
		if(tiempoVida > 0)
		{
			rotar(tiempo);
			dibujar();
			mover();
			tiempoVida--;
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
			rotar(tiempo);
			dibujar();
			mover();
			return true;
	}
}

void Asteroide:: getCentro_Angulo(int &ancho, int &alto)
{
	ancho=rand()%(2*ANCHO)-ANCHO/2;
	if(ancho<=0)
	{	
		ancho=-10;
		alto=rand()%ALTO;
		if(rand()%2)
			angulo=rand()%90;
		else
			angulo=rand()%90+270;
	}
	else if(ancho>0 && ancho< ANCHO)
	{
		if(rand()%2)
		{
			alto=-10;
			angulo=rand()%180+180;
		}
		else
		{
			alto=ALTO+10;
			angulo=rand()%180;
		}
	}
	else if(ancho>=ANCHO)
	{	
		ancho=ANCHO+10;
		alto=rand()%ALTO;
		angulo=rand()%180+90;
	}
}

Coordenada Asteroide::getCentro()
{
	return posIni;
}

double Asteroide::getAngulo()
{
	return angulo;
}

int Asteroide::getAmpFinal()
{
	return amp_f;
}

Asteroide::~Asteroide()
{

}


