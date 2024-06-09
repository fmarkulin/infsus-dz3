# FER-INFSUS_23/24-DZ3

Ovo je repozitorij s rješenjem 4. domaće zadaće iz kolegija INFSUS na FER-u.

## Upute za pokretanje aplikacije

Na početku je potrebno dohvatiti sve biblioteke korištene za izgradnju aplikacije naredbom

`npm install`

Pokretanje aplikacije sastoji se od izgradnje aplikacije naredbom

`npm run build`

te odmah nakon pozivom naredbe

`npm run start`

Aplikacija je sada dostupna na adresi [http://localhost:3000](https://localhost:3000) kojoj se pristupa putem odabranog web-preglednika.

## Slušatelj za vanjske zadatke iz Camunda

Poželjno instalirati `bun` za pokretanje skripte slušanja zadataka: https://bun.sh/

Pokrenuti Camunda Run te potom pokrenuti skriptu za slušanje pozivom naredbe `bun camunda/client.ts`

Deployati u Camundu model iz Camunda Modelera te otići u Tasklist i pokrenuti novi proces.

Proces je sada vidljiv na početnoj stranici aplikacije, a u Tasklist je dodan korisnički zadatak za unos imena kategorije i opisa.

Potrebno je preuzeti zadatak. Sada je na početnoj stranici vidljivo tko je preuzeo zadatak.

Ispuniti podatke i predati. Skripta sluša promjenu i provjerava postoji li već kategorija s tim imenom

Ako postoji, korisniku se postavlja novi zadatak gdje ponovo treba upisati podatke.

Ako ne postoji, kategorija se dodaje u bazu podataka i zadatak nestaje te proces završava i više nije vidlijv na početnoj stranici aplikacije.
