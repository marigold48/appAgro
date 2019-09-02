#!/bin/bash
#testAgro.sh

cat /dev/null > testsApp.log

appNom="Agro"
if [ -d ~/RETO/apps/$appNom/html ]; then
  echo "Dir ~/RETO/apps/$appNom/html OK"  >> testsApp.log
else
	echo "Dir ~/RETO/apps/$appNom/html NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi

if [ -d ~/RETO/apps/$appNom/html/alfa ]; then
  echo "Dir ~/RETO/apps/$appNom/html/alfa OK"  >> testsApp.log

else
	echo "Dir ~/RETO/apps/$appNom/html/alfa NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi

if [ -s ~/RETO/apps/$appNom/html/alfa/index.html ]; then
  echo "Fich ~/RETO/apps/$appNom/html/alfa/index.html OK"  >> testsApp.log
else
	echo "Fich ~/RETO/apps/$appNom/html/alfa/index.html NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi
#-------------------------------------------------------------------- Node server
if [ -d ~/RETO/apps/$appNom/server ]; then
  echo "Dir ~/RETO/apps/$appNom/server OK"  >> testsApp.log
else
	echo "Dir ~/RETO/apps/$appNom/server NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi

if [ -s ~/RETO/apps/$appNom/server/appAgro-alfa.js ]; then
  echo "Fich ~/RETO/apps/$appNom/server/appAgro-alfa.js OK"  >> testsApp.log
else
	echo "Fich ~/RETO/apps/$appNom/server/appAgro-alfa.js NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi

if [ -s ~/RETO/apps/$appNom/server/routes/agro_AlfaRoutes.js ]; then
  echo "Fich ~/RETO/apps/$appNom/server/routes/agro_AlfaRoutes.js OK"  >> testsApp.log
else
	echo "Fich ~/RETO/apps/$appNom/server/routes/agro_AlfaRoutes.js NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi

if [ -s ~/RETO/apps/$appNom/server/controllers/agro_AlfaController.js ]; then
  echo "Fich ~/RETO/apps/$appNom/server/controllers/agro_AlfaController.js OK"  >> testsApp.log
else
	echo "Fich ~/RETO/apps/$appNom/server/controllers/agro_AlfaController.js NO EXISTE">> testsApp.log
	cat testsApp.log
	exit 1
fi


#-------------------------------------------------------------------- SQLite

if [ -d ~/RETO/apps/$appNom/sqlite ]; then
  echo "Dir ~/RETO/apps/$appNom/sqlite OK"  >> testsApp.log
else
	echo "Creando directorio sqlite">> testsApp.log
	mkdir ~/RETO/apps/$appNom/sqlite
fi

if [ -d ~/RETO/apps/$appNom/sqlite/alfa ]; then
  echo "Dir ~/RETO/apps/$appNom/sqlite/alfa OK"  >> testsApp.log
else
	echo "Creando directorio sqlite/alfa">> testsApp.log
	mkdir ~/RETO/apps/$appNom/sqlite/alfa
fi

dirBD=~/RETO/apps/$appNom/sqlite/alfa

if [ -d "$dirBD/temp" ]; then
  echo "Dir $dirBD/temp OK"  >> testsApp.log
else
	echo "Creando directorio $dirBD/temp/">> testsApp.log
	mkdir "$dirBD/temp"
fi

if [ -s "$dirBD/usersTest.sqlite" ]; then
  echo "Fich $dirBD/usersTest.sqlite OK"  >> testsApp.log
else
	echo "Creando BBDD usuarios">> testsApp.log

#-------------------------------------------------------------------- Creacion BD users 
md5=$(echo "tester.tester" | md5sum)
md5="${md5:0:32}"

cat <<EOT > /tmp/usuarios.sql
	CREATE TABLE users 
	(_id varchar(30),
	id0 number(10),
	usr varchar(20),
	md5 varchar(40) unique,
	rol varchar(10),
	org varchar(10),
	keo varchar(5));

	insert into users values
	('TESTER_$appNom',0,'tester','$md5','TESTER','TESTS','ES');
EOT

cat /tmp/usuarios.sql | sqlite3 $dirBD/usersTest.sqlite

fi

#-------------------------------------------------------------------- Creacion BD sesiones 
if [ -s "$dirBD/sessTest.sqlite" ]; then
  echo "Fich $dirBD/sessTest.sqlite OK"  >> testsApp.log
else
	echo "Creando BBDD sesiones">> testsApp.log

cat <<EOT > /tmp/sesiones.sql
	CREATE TABLE sesiones 
	(sesion_id number(10) unique,
	_id varchar(30),
	id0 number(10),
	org varchar(10),
	url varchar(50),
	keo varchar(5));
	insert into sesiones values (123456789,'TESTER_$appNom',0,'TESTS','','ES');
EOT

cat /tmp/sesiones.sql | sqlite3 "$dirBD/sessTest.sqlite"

fi


#-------------------------------------------------------------------- Tests Python/Selenium
$(python testIndex.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test index.html FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test index.html OK"  >> testsApp.log
fi

$(python testLogin.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test Login FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test Login OK"  >> testsApp.log
fi

$(python testDashboard.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test Dasboard FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test Dasboard OK"  >> testsApp.log
fi

$(python testSuelo.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test Suelo FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test Suelo OK"  >> testsApp.log
fi

$(python testPlantas.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test Plantas FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test Plantas OK"  >> testsApp.log
fi

$(python testCultivos.py)
if [ "$?" = 1 ]
then 
	echo "ERROR: Test Cultivos FALLO"  >> testsApp.log
	cat testsApp.log
	exit 1
else
	echo "Test Cultivos OK"  >> testsApp.log
fi
