# Dokumentacja Frontendu
### Osoba odpowiedzialna: Wiktoria Martyńska. Wykonana praca znajduje się w katalogu restock-frontend poziom wyżej w repozytorium Git.

## Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Rejestracja i Logowanie](#rejestracja-i-logowanie)
3. [Konfiguracja Czujników](#konfiguracja-czujników)
4. [Edycja Danych Adresowych](#edycja-danych-adresowych)
5. [Zarządzanie Zamówieniami](#zarządzanie-zamówieniami)
6. [Sprawdzanie Szczegółów i Statusów Zamówień](#sprawdzanie-szczegółów-i-statusów-zamówień)
7. [Konfiguracja API Allegro](#konfiguracja-api-allegro)

## 1. Wprowadzenie

Frontendowa część projektu umożliwia użytkownikom łatwe zarządzanie swoim kontem, czujnikami oraz zamówieniami. Poniżej znajdują się opisy głównych funkcji systemu.

## 2. Rejestracja i Logowanie

### 2.1 Rejestracja

Użytkownicy mogą utworzyć nowe konto, podając swoją nazwę użytkownika i hasło. 

### 2.2 Logowanie

Zarejestrowani użytkownicy mogą zalogować się na wcześniej utworzone konto. Sesje są bezpieczne, a użytkownicy mają dostęp do swojego konta po zalogowaniu. W systemie generowany jest indywidualny token dla każdego użytkownika.

## 3. Konfiguracja Czujników

### 3.1 Dodawanie Czujników

Zalogowani użytkownicy mogą skonfigurować nowo podłączone czujniki. W trakcie procesu konfiguracji, użytkownicy podają niezbędne informacje o nowym czujniku, takie jak nazwa, obsługiwany przez niego produkt itp.

### 3.2 Edycja Czujników

Użytkownicy mają możliwość edycji parametrów swoich dodanych czujników. Mogą aktualizować nazwę, przypisywać produkt do danego czujnika, modyfikować progi decyzyjne odnośnie rozpoczęcia procesu zamówienia danego produktu. Opcjonalnie, mogą także wybrać preferowaną markę i ilość produktu.

## 4. Edycja Danych Adresowych

Zalogowani użytkownicy mogą edytować swoje dane adresowe, takie jak adres zamieszkania, numer telefonu itp. Aktualizacje te wpływają na informacje używane w procesie zamawiania.

## 5. Zarządzanie Zamówieniami

### 5.1 Przegląd Zamówień

Użytkownicy mają dostęp do listy swoich zamówień. Mogą przeglądać je chronologicznie i sprawdzać ich ogólne informacje.

### 5.2 Akceptacja/Odrzucenie Zamówienia

Użytkownicy mogą akceptować lub odrzucać otrzymane zamówienia. Proces ten jest intuicyjny i zapewnia szybką reakcję na nowe zamówienia.

## 6. Sprawdzanie Szczegółów i Statusów Zamówień

### 6.1 Szczegóły Zamówienia

Po wybraniu konkretnego zamówienia, użytkownicy mogą zobaczyć jego szczegóły, takie jak produkty, ilość, cena itp.

### 6.2 Statusy Zamówień

Użytkownicy mają możliwość sprawdzania bieżącego statusu swoich zamówień. Statusy są aktualizowane na bieżąco, aby dostarczyć informacje na temat przetwarzania zamówienia.

## 7. Konfiguracja API Allegro

Użytkownicy mogą także skonfigurować parametry API Allegro używanego do składania zamówień. Mogą wybrać, czy korzystają z Allegro Smart!, czy chcą kupować tylko od Super Sprzedawców oraz ze Strefy Marek. Mogą także zdecydować, czy paczki mają być wysyłane kurierem czy do paczkomatu.
