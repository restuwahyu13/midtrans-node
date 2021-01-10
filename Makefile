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
