# 1. Dokumentacja bezpieczeństwa
## 1.1 Zabezpieczenie API przed nieautoryzowanym dostępem
### 1.1.1 API użytkownika
Wszystkie punkty końcowe udostępnione użytkownikowi zostały zabezpieczone z wykorzystaniem tokenów JWT (JSON Web Token).
Aby request wykonany przez użytkownika mógł zostać uznany za poprawny, wymagane jest aby w nagłówku HTTP "Authorization"
znajdował się następujący ciąg znaków:
"Bearer JWT", gdzie JWT jest tokenem generowanym przez aplikację po udanej operacji logowania. Dla każdego request'u wykonanego na 
API użytkownika, wykonywana jest walidacja tokenu JWT. Sprawdzane jest:
- czy token może zostać zdekodowany na podstawie sekretnego hasła JWT
- potencjalne przedawnienie tokena

Sekretne hasło JWT (JWT_SECRET) jest globalnym parametrem, konfigurowanym w pliku application.properties (głównej konfiguracji usługi backend). 

### 1.1.2 API Sensorów
Wszystkie punkty końcowe udostępnione do komunikacji z sensorami zostały zabezpieczone na podstawie generowanych przez aplikacje tokenów (losowych ciągów znaków).
W tym przypadku nie mamy do czynienia do przenoszenia jakikolwiek metadanych zakodowanych w tokenie, dlatego zrezygnowano z niepotrzebnej komplikacji wprowadzanej przez JWT.

Aby request wykonany przez sensor mógł zostać uznany za poprawny, wymagane jest aby w nagłówku HTTP "Authorization"
znajdował się następujący ciąg znaków:
"Sensor SENSOR_TOKEN", gdzie SENSOR_TOKEN jest wcześniej wspomianym tokenem, generowanym przez aplikację po udanej operacji rejestrowania sensoru. Dla każdego request'u wykonanego na
API użytkownika, wykonywana jest walidacja SENSOR_TOKEN. Sprawdzana jest poprawność przesyłanego tokenu, z wartością wyciągniętą z bazy danych.

SENSOR_TOKEN jest generowany jeden raz i przypisywany do danego sensora. Każdy nowy sensor musi zarejestrować się w aplikacji aby uzyskać swój unikalny token.
API rejestracyjne sensorów jest zabezpieczone i wymaga nagłówku HTTP "Authorization", który zawiera ciąg znaków "Register SENSOR_REGISTER_TOKEN",
gdzie SENSOR_REGISTER_TOKEN jest parametrem globalnym aplikacji, konfigurowanym w pliku application.properties (głównej konfiguracji usługi backend).
Rejestracja sensoru jest poprawna tylko i wyłącznie, kiedy zawartość nagłówka Authorization zgadza się z parametrem globalnym SENSOR_REGISTER_TOKEN.

### 1.1.3 API do rejestracji oraz logowania użytkowników
Punkty końcowe udostępniające możliwość rejestracji oraz logowania użytkownika nie wymagają dodatkowego uwieżytelnienia.

## 1.2 Bezpieczeństwo połączenia z bazą danych
Połączenie z bazą danych zostało zabezpieczone za pośrednictwem protokołu TLSv1.3. W tym celu, z wykorzystaniem narzędzi openSSL zostały wygenerowane własnoręcznie podpisane certyfikaty.