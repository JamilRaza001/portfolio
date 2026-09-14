// Original vector interface concepts, rendered to responsive WebP; no external assets.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const out = 'public/images/projects';
await mkdir(`${out}/sources`, {recursive:true});
const c = {bg:'#090909', panel:'#171819', raised:'#202224', line:'#383b3e', text:'#eeefed', muted:'#a7acb0', quiet:'#747b80', blue:'#91a5b8', amber:'#c4b18e', green:'#92b2a0'};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const rect = (x,y,w,h,fill=c.panel,r=12,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const text = (x,y,s,size=22,fill=c.text,weight=400) => `<text x="${x}" y="${y}" fill="${fill}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`;
const line = (x,y,x2,y2,color=c.line,width=1,dash='') => `<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const path = (d,color=c.text,width=3,fill='none') => `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle = (x,y,r,color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const pill = (x,y,label,color=c.muted,w=120) => rect(x,y,w,34,c.raised,17)+text(x+14,y+23,label,15,color);
const panel = (x,y,w,h,title,subtitle='') => rect(x,y,w,h,c.panel,14,c.line)+text(x+24,y+40,title,22,c.text,600)+(subtitle?text(x+24,y+67,subtitle,15,c.muted):'');
const arrow = (x,y,color=c.muted) => path(`M${x} ${y}h32m-9 -7l9 7-9 7`,color,2);
const waveform = (x,y,w,h,color,seed=0) => Array.from({length:75},(_,i)=>{
  const amplitude = h*(.1+Math.abs(Math.sin(i*.71+seed)*Math.sin(i*.19+seed))*.9);
  return line(x+i*w/75,y-amplitude/2,x+i*w/75,y+amplitude/2,color,3);
}).join('');
const skeleton = (x,y,lengths,color=c.line) => lengths.map((w,i)=>rect(x,y+i*18,w,5,color,2)).join('');
const node = (x,y,w,title,sub) => rect(x,y,w,87,c.raised,10,c.line)+text(x+18,y+34,title,21,c.text,600)+text(x+18,y+59,sub,14,c.muted);
function shell(title,sub,body){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900"><defs><linearGradient id="ground" x2="1" y2="1"><stop stop-color="#222426"/><stop offset="1" stop-color="#101112"/></linearGradient></defs>${rect(0,0,1440,900,c.bg,0)}${rect(54,84,1332,732,'url(#ground)',20,c.line)}${text(92,139,title,27,c.text,600)}${text(92,170,sub,16,c.muted)}${pill(1202,119,'Concept preview',c.muted,150)}${line(55,196,1385,196)}${body}</svg>`;
}
const covers = {};

// Speech processing, deliberately distinct from post-call quality review.
{
 let b=panel(88,224,806,328,'Conversation stream','Speech becomes context, then a response');
 b+=pill(734,248,'Audio',c.blue,124)+text(116,341,'Caller',17,c.muted)+waveform(222,335,634,65,c.text,.2);
 b+=line(114,396,865,396)+text(116,467,'Assistant',17,c.muted)+waveform(222,457,634,76,c.blue,1.4);
 b+=line(639,303,639,509,c.amber,2)+circle(639,304,4,c.amber);
 b+=panel(914,224,437,328,'Conversation','Illustrative exchange');
 b+=rect(938,321,340,63,c.raised,12)+text(956,358,'I need some information.',20);
 b+=rect(970,412,354,81,'#282e32',12)+text(988,450,'How can I help?',22)+text(988,477,'Assistant response',14,c.muted);
 b+=node(88,597,360,'Listen','Recognize caller speech')+arrow(467,640)+node(533,597,360,'Reason','Interpret the conversation')+arrow(912,640)+node(981,597,370,'Respond','Return a spoken answer');
 covers['voice-agent']=shell('Inbound Voice Agent','Real-time speech interaction',b);
}

{
 let b=panel(88,224,745,473,'Recorded conversation','Transcript and review context');
 b+=pill(664,250,'Urdu / English',c.muted,143);
 b+=text(117,339,'Agent',16,c.muted)+text(117,375,'Thank you for calling. How can I help?',22);
 b+=line(117,405,803,405)+text(117,440,'Caller',16,c.muted)+text(117,476,'I would like to ask about a service.',22);
 b+=rect(108,508,704,101,'#302c25',8)+rect(108,508,3,101,c.amber,0)+text(128,541,'Agent',16,c.amber)+text(128,577,'Let me clarify that for you.',22);
 b+=waveform(122,653,590,30,c.muted,2)+path('M760 636l20 16-20 16z',c.text,1,c.text);
 b+=panel(858,224,493,473,'Quality review','Consistent checks, with a review trail');
 ['Greeting','Clarity','Compliance'].forEach((s,i)=>{const y=340+i*77;b+=circle(897,y-6,12,c.raised)+path(`M891 ${y-6}l4 4 8-9`,c.muted,2)+text(924,y,s,23)+line(884,y+30,1324,y+30);});
 b+=rect(883,583,444,83,'#302c25',10)+circle(912,623,5,c.amber)+text(931,617,'Manual review',22,c.text,600)+text(931,645,'Inspect the highlighted passage',15,c.muted);
 covers['call-quality']=shell('Call Quality Analyzer','Bilingual transcription, evaluation and audit',b);
}

{
 let b=rect(88,224,1263,67,c.raised,12,c.line)+circle(120,257,9,'none')+`<circle cx="120" cy="254" r="8" stroke="${c.muted}" fill="none" stroke-width="2"/>`+line(126,260,133,267,c.muted,2)+text(151,266,'What changed in the filings?',25)+pill(1182,241,'In progress',c.muted,142);
 b+=panel(88,315,367,382,'Evidence','Selected filing passages');
 ['10-K','10-Q'].forEach((s,i)=>{const y=406+i*132;b+=rect(111,y,321,108,c.raised,9)+text(128,y+29,s,20,c.text,600)+skeleton(128,y+46,[270,240,259])+rect(126,y+66,253,16,'#91a5b832',2);});
 b+=panel(477,315,308,382,'Retrieval','From passages to evidence');
 ['Retrieve','Rerank','Evaluate'].forEach((s,i)=>{const y=425+i*91;b+=circle(516,y-8,13,c.raised)+text(510,y-2,i+1,15,c.muted)+text(542,y,s,23);if(i<2)b+=line(516,y+9,516,y+61,c.line,2);});
 b+=panel(807,315,544,382,'Cited synthesis','Answer linked to its sources');
 b+=text(834,429,'Evidence from selected filings',23)+text(834,467,'is brought together with',23,c.muted)+text(834,505,'references to each passage.',23,c.muted);
 b+=pill(834,546,'[1] 10-K',c.blue,125)+pill(973,546,'[2] 10-Q',c.blue,125)+line(834,609,1320,609)+text(834,644,'Citations stay attached to the answer.',17,c.muted);
 covers.alphalens=shell('AlphaLens','Financial filings → retrieved evidence → cited answers',b);
}

{
 let b=panel(88,224,1263,118,'Calendar alignment');
 b+=text(335,266,'Hijri',17,c.muted)+text(335,312,'Gregorian',17,c.muted);
 for(let i=0;i<9;i++){let x=487+i*91;b+=line(x,252,x,267,c.quiet)+line(x,295,x,310,c.quiet);}
 b+=line(468,260,1288,260)+line(468,303,1288,303)+rect(817,241,105,81,'#c4b18e1c',7)+text(815,329,'Eid al-Adha',14,c.amber);
 b+=panel(88,362,837,347,'Seasonal comparison','Event-aligned illustrative series');
 for(let i=0;i<4;i++)b+=line(118,470+i*55,894,470+i*55);
 const curves=['M123 627C220 620 251 603 321 583S424 559 494 510S580 483 646 503S765 604 893 620','M123 636C221 631 251 605 321 591S424 550 494 515S580 494 646 514S765 611 893 628','M123 631C221 625 251 596 321 588S424 564 494 524S580 478 646 509S765 599 893 625'];
 curves.forEach((d,i)=>b+=path(d,[c.text,c.blue,c.amber][i],3));
 ['Season A','Season B','Season C'].forEach((s,i)=>b+=circle(146+i*225,680,4,[c.text,c.blue,c.amber][i])+text(159+i*225,686,s,15,c.muted));
 b+=panel(945,362,406,347,'Operations','Reconciled source records');
 ['Normalize','Deduplicate','Compare'].forEach((s,i)=>{let y=482+i*70;b+=text(971,y,s,18,c.muted)+rect(971,y+14,350,8,c.raised,4)+rect(971,y+14,[286,219,253][i],8,[c.text,c.blue,c.amber][i],4);});
 covers['qurbani-analytics']=shell('Qurbani Analytics','Multiple years, aligned across two calendar systems',b);
}

{
 let b=panel(88,224,451,480,'Document input','Example shoe-shop receipt');
 b+=rect(157,321,306,331,'#d9d9d2',5)+text(180,359,'SALES RECEIPT',18,'#272929',600)+line(180,380,440,380,'#999d97');
 b+=text(180,417,'Canvas shoe',23,'#252828')+rect(174,392,245,34,'none',3,'#697c88');
 b+=text(180,473,'Size 42',22,'#252828')+rect(174,448,134,35,'none',3,'#697c88');
 b+=text(180,529,'Qty 2',22,'#252828')+rect(174,504,125,35,'none',3,'#697c88')+skeleton(180,574,[230,185,211],'#afb2ac');
 b+=arrow(559,462,c.blue);
 b+=panel(624,224,727,480,'Product records','Structured fields ready for inventory');
 ['Product','Size','Stock'].forEach((s,i)=>b+=text([651,1090,1220][i],351,s,17,c.muted));
 b+=line(648,371,1325,371)+rect(648,389,675,81,c.raised,8)+text(671,438,'Canvas shoe',25)+text(1090,438,'42',25)+text(1220,438,'2',25);
 b+=text(651,527,'Extracted fields',18,c.muted)+pill(650,548,'Product name',c.blue,161)+pill(825,548,'Size',c.blue,94)+pill(933,548,'Quantity',c.blue,122);
 b+=line(650,612,1326,612)+text(651,652,'Read',20)+arrow(746,645)+text(810,652,'Extract',20)+arrow(929,645)+text(997,652,'Store',20);
 covers['receipt-automation']=shell('Receipt to Inventory','Physical records become structured product and stock data',b);
}

{
 let b=panel(88,224,759,480,'Order conversation','Speech and session context');
 b+=pill(689,250,'Listening',c.muted,128)+waveform(120,342,687,42,c.blue,.9);
 b+=rect(115,401,564,67,c.raised,11)+text(136,442,'One vegetable pizza, please.',25);
 b+=rect(195,493,622,90,'#272c30',11)+text(217,535,'What size would you like?',26)+text(217,562,'Assistant',15,c.muted);
 b+=text(116,658,'Speech',18)+arrow(211,651)+text(282,658,'Order',18)+arrow(370,651)+text(439,658,'Response',18);
 b+=panel(869,224,482,480,'Order draft','Illustrative restaurant order');
 b+=rect(895,326,429,124,c.raised,10)+circle(954,389,40,'#b5a082')+circle(954,389,31,'#8c795f');
 [[940,377],[965,382],[948,404],[972,401]].forEach(([x,y])=>b+=circle(x,y,5,'#bec0a9'));
 b+=text(1013,381,'Vegetable',24)+text(1013,414,'pizza',24)+line(895,478,1324,478)+text(895,521,'Size',17,c.muted)+text(895,558,'Awaiting choice',24)+text(895,631,'Quantity',18,c.muted)+pill(1206,605,'1',c.text,116);
 covers['voice-ordering']=shell('Voice Ordering','A spoken request becomes a structured restaurant order',b);
}

{
 let b=panel(88,224,806,480,'Field imagery','Example field • vegetation features');
 b+=rect(112,312,758,352,'#343b32',7);
 const fields=[['M112 312H323L361 431H112Z','#606449'],['M340 312H554L569 451L378 432Z','#727054'],['M572 312H870V425L598 451Z','#414f3c'],['M112 449L360 448L339 664H112Z','#535d40'],['M382 450L576 468L607 664H356Z','#858269'],['M602 467L870 443V664H629Z','#4c583f']];
 fields.forEach(([d,fill])=>b+=path(d,'#262c25',5,fill));
 b+=path('M384 457L566 474L594 650H367Z','#b7c3aa',2,'#839b6755');
 for(let y=485;y<641;y+=15)for(let x=389;x<556;x+=15){const band=Math.floor((Math.sin(x*.032)+Math.cos(y*.021)+2)*.99);b+=rect(x,y,15,15,['#627d5d','#82976c','#92a675','#a7ad73'][Math.min(3,band)],0);}
 b+=pill(130,328,'NDVI',c.text,100)+pill(637,614,'Selected field',c.text,204);
 b+=panel(917,224,434,225,'Soil moisture','Sensor history and missing observations');
 b+=line(943,409,1327,409)+path('M947 386L989 363L1031 372L1073 340',c.blue,3)+line(1073,340,1162,357,c.blue,3,'5 7')+path('M1162 357L1207 342L1252 369L1323 331',c.blue,3);
 b+=panel(917,469,434,235,'Model comparison','Feature and model approaches');
 b+=text(942,577,'Classical ML',22)+line(941,601,1328,601)+text(942,639,'Vision baseline',22)+text(1184,685,'Sample data',14,c.muted);
 b+=text(116,691,'Sensors',16,c.muted)+text(260,691,'Imagery',16,c.text)+text(404,691,'Features',16,c.muted);
 covers.croplogic=shell('CropLogic','Satellite imagery and sensor data for agricultural ML',b);
}

for(const [slug,svg] of Object.entries(covers)){
 await writeFile(`${out}/sources/${slug}-software.svg`,svg);
 for(const width of [480,960]){
  const info=await sharp(Buffer.from(svg)).resize(width).webp({quality:88,effort:5}).toFile(`${out}/${slug}-software-${width}.webp`);
  console.log(`${slug} ${width}: ${info.size} bytes`);
 }
}
