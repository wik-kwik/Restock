# Dokumentacja Allegro

## [Uwierzytelnianie Client_credentials](https://developer.allegro.pl/tutorials/uwierzytelnianie-i-autoryzacja-zlq9e75GdIR#clientcredentials-flow)

Korzystając z konta Allegro należy przejść pod [link](https://apps.developer.allegro.pl.allegrosandbox.pl/) i zarejestrować nową aplikację, wykorzystującą uwierzytelnianie typu device, aby otrzymać unikalne *CLIENT ID* i *CLIENT SECRET*. Umożliwia to autoryzację aplikacji bez zgodny użytkownika na działanie. Dzięki temu zapewniony jest dostęp do publicznych zasobów Allegro jak oferty (w wersji sandbox) zgodnie z [regulaminem REST API](https://allegro.pl/dla-sprzedajacych/1-czerwca-2021-w-api-allegro-ograniczymy-dostep-do-publicznych-danych-o-sprzedazy-innych-uzytkownikow-i-zmienimy-forme-ich-udostepniania-O3BlgZVdwCa).

## Autoryzacja aplikacji

Aby się zautoryzować należy wykonać żądanie HTTP metodą POST na adres: https://allegro.pl.allegrosandbox.pl/auth/oauth/token, przesyłając w nagłówku CLIENT ID i CLIENT SECRET w formacie base64, oraz ustawić typ dostępu "grant_type=client_credentials".

W odpowiedzi przesyłany jest JSON zawierający token dostępowy, który jest wykorzystywany podczas listowania ofert (możliwe jest również odpytywanie innych ogólnie dostępnych zasobów Allegro Sandbox).

## Pobieranie list produktów z Allegro Sandbox

Pobierania list ofert z Allegro możliwe jest z wykorzystaniem endpointu: https://api.allegro.pl.allegrosandbox.pl/offers/listing, gdzie istnieje możliwość filtrowania wyników poprzez ustawienie różnych parametrów:

- **Parametr option** - pozwala na filtrowanie ofert według różnych opcji:
  - Oferty z opcją Allegro Smart!: "SMART"
  - Oferty od Super Sprzedawców: "SUPERSELLER"
  - Oferty ze Strefy marek: "BRAND_ZONE"
- **Parametr deliveryMethod** - umożliwia filtrowanie ofert według metody dostawy:
  - Dostawa do Paczkomatu: "5b445fe6580ce26bb2f9960a"
  - Dostawa kurierem: "5b445fa0580ce26bb2f99602"
- **Parametr sort** - służy do sortowania ofert:
  - Sortowanie po cenie rosnąco: "+price"
  - Sortowanie po cenie wraz z kosztem dostawy rosnąco: "+withDeliveryPrice"

## Algorytm wyszukiwania najlepszej oferty

1. Pobieranie produktów z podstawowymi filtrami:
   - nazwa (wymagane)
   - preferowana marka
   - preferowana ilość
2. W pierwszym kroku są wyszukiwane oferty z dodatkowymi filtrami, a następnie dodawane do listy 
3. Jeśli lista jest niepusta to zwracana jest oferta o najniższej cenie, w przeciwnym wypadku wyszukiwane są produkty bez filtrów
4. Do listy dodawane są oferty bez dodatkowych filtrów i jeśli lista jest niepusta to następuje filtrowanie wewnętrzne:
   1. Sprawdzenie czy oferty wystawiane są przez Super sprzedawców, jeśli niepuste to:
   2. Sprawdzenie ofert preferowanej marki, jeśli niepuste to:
   3. Sprawdzenie preferowanej ilości
   4. Zwrócenie najlepszej oferty (może nastąpić również w momencie gdy któryś etap filtrowania odrzuci wszystkie oferty)
5. Jeśli żadne produkty nie pasują do wyszukiwania zwracana jest pusta lista (brak zamówienia)


Domyślne opcje tworzenia zapytania zawierają:

- format sprzedaży "Kup teraz"
- tylko nowe produkty (stan: Nowy)