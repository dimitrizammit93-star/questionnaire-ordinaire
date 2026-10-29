// Worker Cloudflare : enregistre les réponses (anonymes) dans KV et les sert à la page stats protégée par code.
const CENTRES = ["Grenelle", "Auteuil", "Issy-les-Moulineaux"];
// À tenir à jour si tu ajoutes une question dans public/config.js
const CHAMPS = ["cs", "cat", "freq", "repas", "n_pdj", "n_dej", "n_din", "faim", "manque", "chaud", "reste",
  "preferes", "retirer", "cuisines", "regimes", "sportif", "pdj_manque", "rupture", "global", "priorite", "commentaire"];
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

function nettoyer(v, prof = 0) {
  if (prof > 3) return null;
  if (typeof v === "string") return v.trim().slice(0, 1000);
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (Array.isArray(v)) return v.slice(0, 20).map(x => nettoyer(x, prof + 1)).filter(x => x !== null && x !== "");
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, x] of Object.entries(v).slice(0, 40)) {
      const c = nettoyer(x, prof + 1);
      if (c !== null && c !== "") o[String(k).slice(0, 40)] = c;
    }
    return o;
  }
  return null;
}

async function toutesLesReponses(kv) {
  const out = [];
  let cursor;
  do {
    const page = await kv.list({ prefix: "r:", cursor });
    const vals = await Promise.all(page.keys.map(k => kv.get(k.name, "json")));
    out.push(...vals.filter(Boolean));
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  return out.sort((a, b) => a.ts.localeCompare(b.ts));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/reponse" && request.method === "POST") {
      const brut = await request.text();
      if (brut.length > 15000) return json({ erreur: "Réponse trop longue" }, 413);
      let data;
      try { data = JSON.parse(brut); } catch { return json({ erreur: "Format invalide" }, 400); }
      const propre = nettoyer(data);
      if (!propre || !CENTRES.includes(propre.cs)) return json({ erreur: "Centre de secours manquant" }, 400);
      const r = {};
      for (const k of CHAMPS) if (k in propre) r[k] = propre[k]; // seuls les champs du questionnaire sont gardés
      r.ts = new Date().toISOString(); // aucune IP ni identifiant stocké
      const cle = `r:${r.ts}:${crypto.randomUUID().slice(0, 8)}`;
      await env.REPONSES.put(cle, JSON.stringify(r));
      return json({ ok: true });
    }

    if (url.pathname === "/api/reponses" && request.method === "GET") {
      const attendu = String(env.ADMIN_TOKEN || "").trim().toLowerCase();
      const recu = decodeURIComponent(request.headers.get("x-code") || "").trim().toLowerCase();
      if (!attendu) return json({ erreur: "ADMIN_TOKEN absent sur ce Worker" }, 401);
      if (recu !== attendu) return json({ erreur: "Code incorrect" }, 401);
      return json(await toutesLesReponses(env.REPONSES));
    }

    if (url.pathname.startsWith("/api/")) return json({ erreur: "Introuvable" }, 404);
    return env.ASSETS.fetch(request);
  }
};
