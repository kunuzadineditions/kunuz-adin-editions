import Parser from 'rss-parser';

export type Episode = { title:string; audioUrl:string; duration:string; pubDate:string; imageUrl:string; seriesId:number; };
export type SeriesGroup = { id:number; title:string; coverUrl:string; episodes:Episode[]; };

const SERIES = [
  {id:1, title:'Le Mois de Ramadan'},
  {id:2, title:'Les Enseignements de Luqmân le Sage'},
  {id:3, title:'Muhammad ﷺ — Le Sceau des Envoyés'},
  {id:4, title:'Le Tawhid — Les Deux Témoignages'},
  {id:5, title:'14 Objectifs du Hajj & Omra'},
  {id:6, title:'Les 40 Hadîths — Imam An-Nawawi'},
  {id:7, title:'Le Rappel profite au Croyant'},
  {id:9, title:'Quiz Aqida'},
  {id:10, title:"Le Sentier de l'Islam"},
  {id:11, title:'Les Mérites de la Polygamie'},
];

function detectSeriesId(title:string, imageUrl:string):number {
  const img = imageUrl.toLowerCase();
  if (img.includes('sourate') || title.toLowerCase().includes('sourate')) return 0;
  const letters = title.replace(/[^a-zA-ZÀ-ÿ]/g,'');
  const upper = letters.replace(/[^A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÆŒ]/g,'').length;
  if (letters.length > 2 && upper/letters.length > 0.8) return 1;
  if (img.includes('luqman') || img.includes('luqm')) return 2;
  if (img.includes('muhammad-sly') || img.includes('sceau-des')) return 3;
  if (img.includes('lunicite') || img.includes('branche-lunicite') || img.includes('biographie-du-cheikh') || img.includes('le-suivi') || img.includes('adoration-doit') || img.includes('temoignage-nulle') || img.includes('temoignage-muhammad') || img.includes('significations-kunuz')) return 4;
  if (img.includes('objectifs-du-hajj')) return 5;
  if (img.includes('hadiths-par') || img.includes('40-hadiths')) return 6;
  if (img.includes('quiz-aqida')) return 9;
  if (img.includes('sentier')) return 10;
  if (img.includes('polygam') || img.includes('veuves') || img.includes('divorcees') || img.includes('polyandrie') || img.includes('presomptions-des-opposants') || img.includes('temoignages-de-femmes') || img.includes('temoignage-de-loccident') || img.includes('categories-des-opposants') || img.includes('sagesse-de-lislam') || img.includes('fatwas-au-sujet') || img.includes('jeunes-et-la') || img.includes('linfluence-des-medias') || img.includes('murmure-du-coeur')) return 11;
  const t = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  if (title.includes('Luqmân') || title.includes('Luqman')) return 2;
  if (title.includes('ﷺ') || title.includes('Sceau des Envoyés')) return 3;
  if (t.includes('hajj')) return 5;
  if (t.includes('nawawi') || t.includes('hadiths par')) return 6;
  if (t.includes('quiz') || t.includes('aqida')) return 9;
  if (t.includes('sentier')) return 10;
  if (t.includes('polygam') || t.includes('polyandrie') || t.includes('veuves')) return 11;
  // Épisodes Polygamie avec images génériques — détection par titre exact
  if (t.includes('intro kunuz adin'))                               return 11;
  if (t.match(/^02\s/) && t.includes('sentation'))                 return 11;
  if (t.match(/^03\s/) && t.includes('preface'))                   return 11;
  if (t.match(/^04\s/) && t.includes('liminaire'))                 return 11;
  if (t.match(/^05\s/) && t.includes('introduction'))              return 11;
  if (t.includes('equit') && /^\d/.test(title))                    return 11;
  if (t.includes('murmure du coeur') && /^\d/.test(title))         return 11;
  if (t.includes('influence des medias') && /^\d/.test(title))     return 11;
  return 7;
}

function getEpisodeOrder(title:string):number {
  const seq = title.match(/(?:Partie|Ep)\s+(\d+)/i);
  if (seq) return parseInt(seq[1]);
  const lead = title.match(/^(\d+)/);
  if (lead) return parseInt(lead[1]);
  return 9999;
}

const parser = new Parser({ customFields:{ item:[['itunes:duration','itunesDuration'],['itunes:image','itunesImage']] } });

export async function fetchSeriesGroups(feedUrl:string):Promise<SeriesGroup[]> {
  const feed = await parser.parseURL(feedUrl);
  const map = new Map<number,Episode[]>();
  for (const raw of (feed.items||[]) as any[]) {
    const title = (raw.title||'').replace(/<[^>]*>/g,'').trim();
    const imageUrl = (raw.itunesImage as any)?.$.href || raw.itunesImage || '';
    const sid = detectSeriesId(title, imageUrl);
    if (sid===0) continue;
    const ep:Episode = { title, audioUrl:raw.enclosure?.url||'', duration:raw.itunesDuration||'', pubDate:raw.pubDate?new Date(raw.pubDate).toLocaleDateString('fr-FR'):'', imageUrl, seriesId:sid };
    if (!map.has(sid)) map.set(sid,[]);
    map.get(sid)!.push(ep);
  }
  for (const eps of map.values()) eps.sort((a,b)=>getEpisodeOrder(a.title)-getEpisodeOrder(b.title));
  return SERIES.map(s=>({id:s.id,title:s.title,coverUrl:map.get(s.id)?.[0]?.imageUrl||'',episodes:map.get(s.id)||[]})).filter(g=>g.episodes.length>0);
}
