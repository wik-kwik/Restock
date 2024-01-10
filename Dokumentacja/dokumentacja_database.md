# Dokumentacja bazy danych
## MariaDB
Do stworzenia i utrzymania bazy danych w naszym projekcie został wybrany system **MariaDB**. Jest to darmowa relacyjna baza danych wywowdząca się z MySQL.

## Struktura bazy danych
Poniżej przedstawiono wszystkie tabele i dodatkowe/pozostałe elementy bazodanowe używane w projekcie. Cała struktura bazy jest tworzona za pomocą skryptów SQL podczas budowania aplikacji z użyciem Docker'a. Nazwa bazy danych to **restock_db**.

### Tabele
#### users
Tabela *users* służy do przechowywania danych użytkowników zarejestrowanych w aplikacji. Zawiera kolumny z podstawowymi danymi użytkownika oraz kolumny do celów audytowych i archiwalnych (daty utworzenia, modyfikacji i usunięcia).

| Nazwa kolumny | Typ kolumny  | Opis                           |
|---------------|--------------|--------------------------------|
| id            | INT          | Identyfikator użytkownika      |
| username      | VARCHAR(30)  | Nazwa (login) użytkownika      |
| password      | TEXT         | Hash hasła użytkownika (MD-5)  |
| create_date   | TIMESTAMP    | Data utworzenia użytkownika    |
| modify_date   | TIMESTAMP    | Data modyfikacji użytkownika   |
| remove_date   | TIMESTAMP    | Data usunięcia użytkownika     |

#### sensors
Tabela *sensors* służy do przechowywania danych sensorów używanych w systemie. Zawiera kolumny z różnymi danymi sensora, zarówno widocznymi dla użytkownika jak również technicznymi oraz kolumny do celów audytowych i archiwalnych (daty utworzenia, modyfikacji i usunięcia).

| Nazwa kolumny    | Typ kolumny | Opis                                                  |
|------------------|-------------|-------------------------------------------------------|
| id               | INT         | Identyfikator sensora                                 |
| mac_address      | TEXT        | Adres MAC karty sieciowej sensora                     |
| type             | VARCHAR(1)  | Typ sensora (czujnik odległości lub przycisk)         |
| name             | TEXT        | Nazwa sensora                                         |
| product          | TEXT        | Nazwa produktu przypisanego do sensora                |
| preferred_brand  | TEXT        | Preferowana marka produktu                            |
| preferred_amount | TEXT        | Preferowana ilość produktu                            |
| sensor_token     | VARCHAR(30) | Token używany podczas przesyłania danych przez sensor |
| create_date      | TIMESTAMP   | Data utworzenia sensora                               |
| modify_date      | TIMESTAMP   | Data modyfikacji sensora                              |
| remove_date      | TIMESTAMP   | Data usunięcia sensora                                |

#### thresholds
Tabela *thresholds* służy do przechowywania wartości (progów), dla których podejmowane są akcje wykonywane przez sensory. Dla każdego sensora tworzone są dwa wpisy (**U**PDATE oraz **O**RDER) Zawiera kolumny z danymi oraz kolumny do celów audytowych i archiwalnych (daty utworzenia, modyfikacji i usunięcia).

| Nazwa kolumny | Typ kolumny | Opis                                                        |
|---------------|-------------|-------------------------------------------------------------|
| id            | INT         | Identyfikator progu                                         |
| sensor_id     | INT         | Identyfikator sensora (id z tabeli *sensors*)               |
| type          | VARCHAR(1)  | Typ progu (dot. aktualizacji danych lub składania zamówień) |
| value         | DOUBLE      | Wartość progu                                               |
| create_date   | TIMESTAMP   | Data utworzenia progu                                       |
| modify_date   | TIMESTAMP   | Data modyfikacji progu                                      |
| remove_date   | TIMESTAMP   | Data usunięcia progu                                        |

#### sensor_data
Tabela *sensor_data* służy do przechowywania danych przesyłanych przez sensory. Zawiera kolumny z danymi oraz kolumnę do celów audytowych i archiwalnych (data utworzenia).

| Nazwa kolumny | Typ kolumny | Opis                                           |
|---------------|-------------|------------------------------------------------|
| id            | INT         | Identyfikator wpisu                            |
| sensor_id     | INT         | Identyfikator sensora (id z tabeli *sensors*)  |
| value         | DOUBLE      | Odczytana wartość                              |
| create_date   | TIMESTAMP   | Data utworzenia wpisu                          |

#### orders
Tabela *orders* służy do przechowywania zamówień złożonych przez Allegro API. Zawiera kolumny z danymi oraz kolumny do celów audytowych i archiwalnych (daty utworzenia i modyfikacji).

| Nazwa kolumny  | Typ kolumny | Opis                                            |
|----------------|-------------|-------------------------------------------------|
| id             | INT         | Identyfikator zamówienia                        |
| status         | VARCHAR(1)  | Status zamówienia                               |
| offer_id       | TEXT        | ID oferty z Allegro                             |
| name           | TEXT        | Nazwa produktu/oferty                           |
| photo_url      | TEXT        | URL ze zdjęciem oferty                          |
| product_price  | DOUBLE      | Cena produktu                                   |
| delivery_price | DOUBLE      | Cena dostawy                                    |
| smart          | VARCHAR(1)  | Flaga określająca czy oferta jest SMART         |
| create_date    | TIMESTAMP   | Data utworzenia zamówienia                      |
| modify_date    | TIMESTAMP   | Data modyfikacji statusu zamówienia             |
| user_id        | INT         | Identyfikator użytkownika, który zmienił status |

#### parameters
Tabela *parameters* służy do przechowywania parametrów używanych przez Allegro API. Zawiera kolumny z danymi oraz kolumny do celów audytowych i archiwalnych (daty utworzenia i modyfikacji).

| Nazwa kolumny | Typ kolumny  | Opis                                |
|---------------|--------------|-------------------------------------|
| id            | INT          | Identyfikator parametru             |
| type          | VARCHAR(1)   | Typ parametru                       |
| value         | VARCHAR(1)   | Wartość parametru                   |
| create_date   | TIMESTAMP    | Data utworzenia parametri           |
| modify_date   | TIMESTAMP    | Data modyfikacji wartości parametru |

#### addresses
Tabela *addresses* służy do przechowywania adresu, na który zamawiane będą produkty z Allegro API. Tabela ta zawiera maksymalnie jeden wiersz składający się z kolumn z danymi oraz kolumn do celów audytowych i archiwalnych (daty utworzenia i modyfikacji).

| Nazwa kolumny | Typ kolumny | Opis                    |
|---------------|-------------|-------------------------|
| id            | INT         | Identyfikator adresu    |
| first_name    | TEXT        | Imię                    |
| last_name     | TEXT        | Nazwisko                |
| street        | TEXT        | Ulica                   |
| house_number  | TEXT        | Numer domu (mieszkania) |
| postal_code   | VARCHAR(6)  | Kod pocztowy            |
| city          | TEXT        | Miejscowość             |
| phone_number  | VARCHAR(9)  | Numer telefonu          |
| email         | TEXT        | Adres email             |
| create_date   | TIMESTAMP   | Data utworzenia adresu  |
| modify_date   | TIMESTAMP   | Data modyfikacji adresu |


### Ograniczenia (ang. constraints)
W bazie danych dodano dodatkowe ograniczenia dla wybranych tabel tj. sprawdzanie unikalności rekordów na podstawie wybranej kolumny lub par kolum, a także sprawdzanie wartości kolumn na podstawie zdefiniowanych zbiorów możliwych wartości (ang. enumeration).

| Nazwa tabeli | Typ ograniczenia | Zakres/warunki ograniczenia         |
|--------------|------------------|-------------------------------------|
| users        | UNIQUE           | username                            |
| sensors      | UNIQUE           | sensor_token                        |
| thresholds   | UNIQUE           | sensor_id, type                     |
| parameters   | UNIQUE           | type                                |
| orders       | CHECK            | status IN ('P', 'A', 'R', 'D', 'C') |
| sensors      | CHECK            | type IN ('D', 'B')                  |
| thresholds   | CHECK            | type IN ('U', 'O')                  |
| parameters   | CHECK            | type IN ('S', 'B', 'Z', 'F')        |


### Skrypty
Do stworzenia bazy danych używane są trzy skrypty SQL. Pierwszy z nich tworzy opisane powyżej tabele, drugi dodaje ograniczenia, a trzeci wprowadza do tabeli parameters odpowiednie parametry z domyślnymi wartościami.