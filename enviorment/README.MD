# Katalog Environment - co i jak
W celu ustrukturyzowania, jak i ułatwienia deploymentu aplikacji katalog będzie zawierał:
* docker-compose.yml <- konfiguracja skonteneryzowanych serwisów (DB, aplikacja, inne).
* volume'y podpinane do kontenerów <- np. pliki konfiguracyjne, persistence storage itp...

UWAGA! Możliwe problemy! Jeśli ktoś pracuje na Windowsie - proszę dbać o odpowiedni format plików konfiguracyjnych itp...
Format nowych znaków w windowsie a unixie jest różny, co może prowadzić do tego, że kontenery nie będą w stanie odczytać poprawnie plików.

# Docker
Z okazji, że wszystkie serwisy będą stawiane za pomocą pliku compose w wersji 3.8 wymagana wersja docker engine to 19.03.0+.
Instalacja zgodnie z dostępnymi tutorialami na dany system operacyjny

# Baza danych - restock-mariadb
DB -> mariadb v11.1.2. Krótki opis katalogów:
* restock-mariadb/docker-entrypoint-initdb.d <- jak sama nazwa wskazuje, znajdują się tu pliki .sql
  zawierające definicji bazy danych i tabel. Katalog jest podpinany jako volume do kontenera o nazwie restock-mariadb,
  a pliki w nim się znajdujące są wywoływane w kolejności alfabetycznej. Jeśli podczas developmentu komuś łatwiej będzie
  opierać budowanie bazy na podstawie parametru hibernate _hibernate.hbm2ddl.auto_ to najlepiej zmienić rozszerzenie
  pliku 3_create_tables.sql na 3_create_tables.sql.bkp lub ewentualnie wykomentować całą zawartość.
* restock-mariadb/etc/mysql/conf.d <- konfiguracja servera mariadb, ssl, ewentualne logi itp

Wystawiona pod standardowym portem 3306.

# Przydatne komendy
* docker ps -a <- listowanie kontenerów
* docker images <- listowanie obrazów
* docker exec -it restock-mariadb mariadb -uroot -pmysql <- stworzenie interaktywnej sesji, bezpośrednio z serwerem mariadb
* docker exec -it _nazwa kontenera_ /bin/bash (lub /bin/sh) <- stworzenie interaktywnej sesji z powłoką bash kontenera
* docker rm -f _nazwa kontenera_ <- usunięcia kontenera w trybie force
* docker rmi _nazwa obrazu_:_tag obrazu_ <- usunięcie danego obrazu (prawdopodobnie przydatne później)
* docker compose up -d <- uruchomienie serwisów zdefiniowanych w pliku docker-compose.yml (musi zostać wykonana z poziomu katalogu, w którym ten plik się znajduje)