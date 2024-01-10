# 1. API

RESTowe API wystawione po stronie backendu umożliwia użytkownikowi wykonanie wielu czynności związanych z podstawowymi operacjami na danych. tzw. CRUD (create, read, update, delete).

## 1.1 Adresy

GET /api/address
Parametry: id (Long) - Identyfikator adresu.
Pobiera informacje o konkretnym adresie na podstawie jego identyfikatora.

PUT /api/address
Ciało żądania: Obiekt typu AddressDTO reprezentujący zaktualizowane dane adresu.
Aktualizuje dane istniejącego adresu na podstawie dostarczonych informacji.

## 1.2 Dane z sensorów

POST /api/data
Ciało żądania: Obiekt typu DataDTO reprezentujący dane z sensorów.
Dodaje nowe dane do systemu na podstawie dostarczonych informacji. Zostaje to wykonane po stronie hardware'u w momencie przekroczenia odpowiedniego thresholdu.
Ten punkt końcowy jest odpowiedzalny także za wywołanie logiki odpowiedzialnej za wyszukanie najlepszej oferty po stronie Allegro API.

## 1.3 Zamówienia

GET /api/orders/pending
Pobiera listę zamówień, które oczekują na realizację (czyli te o statusie ACCEPTED, IN_DELIVERY i PENDING).

GET /api/orders/history
Pobiera historię zamówień (czyli listę zamówień o statusie COMPLETED i REJECTED).

PUT /api/orders/accept
Parametry: id (Long) - Identyfikator zamówienia do zaakceptowania.
Zmienia status zamówienia na "ACCEPTED" na podstawie jego identyfikatora.

PUT /api/orders/reject
Parametry: id (Long) - Identyfikator zamówienia do odrzucenia.
Zmienia status zamówienia na "REJECTED" na podstawie jego identyfikatora.

## 1.4 Parametry

GET /api/parameters/all
Pozwala na pobranie parametrów(wyboru ofert Allegro i sposobu dostawy): Allegro Smart!, Super Sprzedawca, Strefa Marek, Paczkomat/Kurier.
Są one niezbędne przy szukaniu najlepszej oferty z platformy Allegro.

PUT /api/parameters
Ciało żądania: Lista obiektów typu ParameterDTO reprezentujących zaktualizowane dane parametrów.
Aktualizuje dane wszystkich parametrów na podstawie dostarczonych informacji.

## 1.5 Sensory

GET /api/sensors/all
Pobiera wszystkie sensory z systemu.

GET /api/sensors
Parametry: id (Long) - Identyfikator sensora.
Pobiera informacje o konkretnym sensorze na podstawie jego identyfikatora.

POST /api/sensors/register
Ciało żądania: Obiekt typu NewSensorRequest reprezentujący dane nowego sensora.
Dynamicznie rejestruje nowy sensor w systemie na podstawie dostarczonych danych z hardware'u.
Dodatkowo dodaje 2 thresholdy powiązane z danym sensorem: Threshold for Update i Threshold for Order (w przypadku gdy sensor to fizyczny przycisk [PHYSICAL_BUTTON] a nie czujnik odległości [DISTANCE_SENSOR] to thresholdy ustawiane są na wartości 1).

PUT /api/sensors
Ciało żądania: Obiekt typu SensorDTO reprezentujący zaktualizowane dane sensora.
Aktualizuje dane istniejącego sensora na podstawie dostarczonych informacji.

DELETE /api/sensors
Parametry: id (Long) - Identyfikator sensora do usunięcia.
Usuwa sensor z systemu na podstawie jego identyfikatora.