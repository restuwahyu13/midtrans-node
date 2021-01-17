NPM := npm
NPM_FLAGS := run
DOCKER := docker

#########################
## BUILD WITH DOCKER
#########################

dkb:

ifdef tag
	${DOCKER} build -t ${tag} .
endif

#########################
## BUILD APPLICATION PROD
#########################

prod:
	${NPM} ${NPM_FLAGS} build

#########################
## FORMATTER
#########################

lfx:
	${NPM} ${NPM_FLAGS} lint:fix

#########################
## TTD TEST APPLICATION
#########################

test:
	${NPM} test

testw:
	${NPM} ${NPM_FLAGS} test:watch

testc:
	${NPM} ${NPM_FLAGS} test:coverage

#########################
## NPM INSTALL AND FIX
#########################

install:
	${NPM} install && ${NPM} audit fix

#########################
## BUILD AUTOMATION
#########################

build: lfx.o test.o testc.o compile.o

lfx.o:
	${NPM} ${NPM_FLAGS} lint:fix

test.o:
	${NPM} test

testc.o:
	${NPM} ${NPM_FLAGS} test:coverage

compile.o:
	${NPM} ${NPM_FLAGS} build