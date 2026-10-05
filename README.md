# Ficha UBER con precio en vivo

Archivos:
- index.html     -> la ficha
- api/quote.js   -> función que consulta Finnhub (tu key queda en el servidor)

## Subirlo a Vercel (10 min)
1. Sacá tu key gratis en https://finnhub.io
2. En esta carpeta, en la terminal (necesitás Node instalado):
   npx vercel                          (login, y Enter a todo)
   npx vercel env add FINNHUB_KEY production   (pegás la key)
   npx vercel --prod                   (te da el link público)

Para probar: abrí <tu-link>/api/quote?s=UBER, tiene que devolver price y prevClose.
