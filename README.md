# FER-INFSUS_23/24-DZ3

Ovo je repozitorij s rješenjem 3. domaće zadaće iz kolegija INFSUS na FER-u.

## Upute za pokretanje aplikacije

Na početku je potrebno dohvatiti sve biblioteke korištene za izgradnju aplikacije naredbom

`npm install`

Pokretanje aplikacije sastoji se od izgradnje aplikacije naredbom

`npm run build`

te odmah nakon pozivom naredbe

`npm run start`

Aplikacija je sada dostupna na adresi [http://localhost:3000](https://localhost:3000) kojoj se pristupa putem odabranog web-preglednika.

## Deploy

Aplikacija je također dostupna na usluzi Vercel preko [javne poveznice](https://infsus-dz3.vercel.app/).

## Testovi

Ovaj projekt koristi **Playwright** za testiranje

### Preduvjeti

Pokretanje aplikacije na način opisan u "Upute za pokretanje aplikacije"

### Pokretanje testova

Za pokretanje testova u konzoli koristite naredbu:
`npx playwright test`
na kraju testova postoji opcija za pokrenuti "report":
`npx playwright show-report`
Za pokretanje testova sa grafičkim sučeljem koristite naredbu:
`npx playwright test --ui`

Testovi se nalaze u direktoriju `tests`
**Testovi**:

- `navmenu.spec.ts` - testiranje učitavanja NavMenu-a
- `validate-category-form.spec.ts` - validacija forme za kreiranje nove kategorije
- `get-entries.spec.ts` - dohvaćanje Entry zapisa iz baze
- `full-flow.spec.ts` - testiranje cijelog flow-a dodavanja novog Entry zapisa u bazu (kreiranje kategorije i organizacije)
