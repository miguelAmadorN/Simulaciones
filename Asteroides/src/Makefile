PROYECTO=Universo
DESTDIR=/usr/local/bin
CFLAGS=-Wall 
LFLAGS=-lX11
CCpp=g++
CC=gcc

all: $(PROYECTO)

gfx.o: gfx.c
	$(CC) -c $< $(CFLAGS) 

formMath.o: formMath.cpp
	$(CCpp) -c $< $(CFLAGS)

Coordenada.o: Coordenada.cpp
	$(CCpp) -c $< $(CFLAGS)

Linea.o: Linea.cpp
	$(CCpp) -c $< $(CFLAGS)

Asteroide.o: Asteroide.cpp
	$(CCpp) -c $< $(CFLAGS)

Universo.o: Universo.cpp
	$(CCpp) -c $< $(CFLAGS)

principal.o: principal.cpp
	$(CCpp) -c $< $(CFLAGS)

$(PROYECTO) : gfx.o formMath.o Coordenada.o Linea.o Asteroide.o Universo.o principal.o
	$(CCpp) $^ -o $@ $(LFLAGS) 

.PHONY: clean

install: all
	if [ ! -d $(DESDIR) ] ; then \
		sudo mkdir $(DESDIR); \
	fi; \
	sudo cp $(PROYECTO) $(DESDIR)
unistall:
	rm $(DESDIR)/$(PROYECO)
clean:
	rm -f *.o $(PROYECTO)
	


