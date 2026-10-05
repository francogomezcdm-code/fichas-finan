// Función serverless de Vercel: /api/quote?s=UBER
// Pide el precio a Finnhub con tu key (que queda guardada en el servidor)
// y deja la respuesta en caché 30 s, así muchos visitantes = pocas llamadas.
module.exports = async function handler(req, res) {
  const simbolo = String(req.query.s || '').toUpperCase();
  if (!/^[A-Z.\-]{1,10}$/.test(simbolo)) return res.status(400).json({ error: 'simbolo invalido' });

  const key = process.env.FINNHUB_KEY;
  if (!key) return res.status(500).json({ error: 'falta FINNHUB_KEY' });

  try {
    const r = await fetch('https://finnhub.io/api/v1/quote?symbol=' + simbolo + '&token=' + key);
    if (!r.ok) return res.status(502).json({ error: 'error del proveedor' });
    const q = await r.json();
    if (!q || !q.c || !q.pc) return res.status(404).json({ error: 'sin datos' });

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=30');
    return res.status(200).json({
      symbol: simbolo,
      price: q.c,          // último precio
      prevClose: q.pc,     // cierre anterior
      ts: q.t ? q.t * 1000 : Date.now()
    });
  } catch (e) {
    return res.status(502).json({ error: 'no se pudo consultar' });
  }
};
