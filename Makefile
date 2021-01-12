NPM := npm

#########################
## BUILD APPLICATION PROD
#########################

prod:
	${NPM} run build

#########################
## FORMATTER
#########################

lfx:
	${NPM} run lint:fix

#########################
## TTD TEST APPLICATION
#########################

test:
	${NPM} test

#########################
## BUILD AUTOMATION
#########################

build: lfx.o test.o compile.o

lfx.o:
	${NPM} run lint:fix

test.o:
	${NPM} test

compile.o:
	${NPM} run build