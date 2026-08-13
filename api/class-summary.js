const TABLE='practice_logs';
async function supabase(path){
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY;
  if(!url||!key) throw new Error('Supabase 환경변수가 없습니다.');
  const r=await fetch(`${url}/rest/v1/${path}`,{headers:{apikey:key,Authorization:`Bearer ${key}`}});
  const t=await r.text(); let d; try{d=t?JSON.parse(t):[]}catch{d=[]}
  if(!r.ok) throw new Error((d&&d.message)||'Supabase 조회 실패'); return d;
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET') return res.status(405).json({error:'GET 요청만 사용할 수 있습니다.'});
  try{
    const cls=String(req.query.class_id||'default').trim().slice(0,40)||'default';
    const params=new URLSearchParams({select:'id,created_at,class_id,product,practice_date,completeness,originality,similarity,grade',class_id:`eq.${cls}`,order:'created_at.desc',limit:'200'});
    const rows=await supabase(`${TABLE}?${params.toString()}`);
    const counts={total:rows.length,A:0,B:0,C:0,D:0,E:0,F:0,review:0};
    rows.forEach(r=>{if(counts[r.grade]!==undefined) counts[r.grade]++; if((r.similarity||0)>=70)counts.review++;});
    return res.status(200).json({class_id:cls,counts,rows});
  }catch(e){return res.status(500).json({error:e.message});}
}
