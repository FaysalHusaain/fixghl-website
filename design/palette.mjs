// Generates FixGHL colour tokens + WCAG 2.2 contrast report. Run: node design/palette.mjs
const hsl2hex=(h,s,l)=>{s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let[r,g,b]=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return'#'+[r,g,b].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('').toUpperCase()};
const lum=h=>{const[r,g,b]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b};
const cr=(a,b)=>{const[x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+.05)/(y+.05)};
// Warm-leaning neutral: hue 40, low saturation, tuned lightness steps
const steps={50:[97.5,14],100:[95,10],200:[89,8],300:[80,6],400:[64,5],500:[48,4],600:[38,4],700:[28,5],800:[17,6],900:[10,7],950:[4,8]};
const ink={};for(const[k,[l,s]]of Object.entries(steps))ink[k]=hsl2hex(40,s,l);
ink[950]='#08080A';
const gold={400:'#FFE680',500:'#FFDE59',600:'#F2C922',700:'#8A6A00'};
console.log('NEUTRAL (ink)',ink);console.log('GOLD',gold);
const pairs=[
['Body text','ink-950 #08080A','on white',ink[950],'#FFFFFF',4.5],
['Body text','ink-950','on ink-50',ink[950],ink[50],4.5],
['Secondary text','ink-600','on white',ink[600],'#FFFFFF',4.5],
['Secondary text','ink-600','on ink-50',ink[600],ink[50],4.5],
['Body text (dark)','ink-50','on ink-950',ink[50],ink[950],4.5],
['Secondary text (dark)','ink-400','on ink-950',ink[400],ink[950],4.5],
['Secondary text (dark)','ink-300','on ink-900',ink[300],ink[900],4.5],
['Primary CTA label','ink-950','on gold-500',ink[950],gold[500],4.5],
['Gold text/highlight','gold-500','on ink-950',gold[500],ink[950],4.5],
['Gold focus ring','gold-500','on ink-950',gold[500],ink[950],3],
['Ink focus ring','ink-950','on white',ink[950],'#FFFFFF',3],
['Gold on white (BANNED)','gold-500','on white',gold[500],'#FFFFFF',4.5],
['Gold on ink-50 (BANNED)','gold-500','on ink-50',gold[500],ink[50],3],
['Gold-700 text on white','gold-700','on white',gold[700],'#FFFFFF',4.5],
['Surface step (dark)','ink-900','vs ink-950',ink[900],ink[950],1],
['Surface step (light)','ink-100','vs white',ink[100],'#FFFFFF',1],
];
console.log('\n| Pair | Ratio | Needs | Result |\n|---|---|---|---|');
for(const[n,f,b,fh,bh,need]of pairs){const r=cr(fh,bh);console.log(`| ${n}: ${f} ${b} | ${r.toFixed(2)}:1 | ${need===1?'—':need+':1'} | ${need===1?'tone step':r>=need?'PASS':'FAIL'} |`)}
