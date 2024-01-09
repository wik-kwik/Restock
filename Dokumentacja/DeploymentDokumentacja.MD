## Wstęp
W celu ułatwienia deploymentu całości aplikacji frontend, backend oraz baza danych zostały skonterenyzowane. Aby, skutecznie
wystartować wspomniane serwisy, należy zadbać o to, aby docker na maszynie hosta korzystał z docker engine w wersji 19.03.0+.
W katalogach z kodem źródłowym frontendu oraz backendu zostały przygotowane pliki Dockerfile, odpowiedzialne za tworzenie obrazów dla wspomnianych usług.

## Docker compose
Definicja oraz konfiguracja kontenerów została zawarta w pliku docker-compose.yml. Z uwagi, że występuje silna zależność pomiędzy serwisami tj.
database -> backend -> frontend, został zaimplementowany mechanizm, który wymusza na kontenerze z daną usługą, poczekanie aż kontener z usługą, od której jest zależny, z sukcesem wystartuje.

1. Baza danych - z okazji, że proces inicjalizacji bazy danych odbywa się po wystartowaniu kontenera (skrypty zawierające strukturę startują wtedy, kiedy proces mariadb w kontenerze
   jest w pełni funkcjonalny), okresowo co 5 sekund wywoływana jest komenda SHOW TABLES FROM restock_db. Jeśli komenda w końcu zostanie wykonana z sukcesem, docker uznaje, że kontener bazy danych jest w stanie "healthy"
2. Backend - kontener po stworzeniu struktury serwisów pozostaje w stanie "created", dopóki baza danych nie jest w stanie "healthy" -> jeśli jest, to kontener zaczyna się w pełni uruchamiać i przechodzi do stanu "started"
3. Frontend - czeka z pełnym uruchomieniem, aż do przejścia konteneru z backendem w stan "started"