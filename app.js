const f=v=>'R$ '+Math.round(v).toLocaleString('pt-BR');
const AX=(c)=>({x:{ticks:{color:'#93a1c4'},grid:{color:'#26304f'}},y:{ticks:{color:'#93a1c4',callback:v=>c?(v/1000)+'k':v+'%'},grid:{color:'#26304f'}}});
const G={responsive:true,maintainAspectRatio:false};

fetch('data/sample-data.json').then(r=>r.json()).then(d=>{

  document.getElementById('k-orc').textContent=f(d.consolidado.orcado);
  document.getElementById('k-rea').textContent=f(d.consolidado.realizado);
  const varAno=(100*(d.consolidado.realizado/d.consolidado.historico-1)).toFixed(1);
  document.getElementById('k-var').textContent=(varAno>0?'+':'')+varAno+'%';

  new Chart(document.getElementById('g-priv-mr'),{type:'bar',data:{labels:d.privado.meses,
    datasets:[{label:'Meta',data:d.privado.orcado_m,backgroundColor:'#4b5675',borderRadius:5},
              {label:'Realizado',data:d.privado.realizado_m,backgroundColor:'#3b82f6',borderRadius:5}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}}},scales:AX(1)}});

  new Chart(document.getElementById('g-priv-yy'),{type:'line',data:{labels:d.privado.meses,
    datasets:[{label:'Ano anterior',data:d.privado.historico_m,borderColor:'#93a1c4',backgroundColor:'transparent',tension:.3},
              {label:'Ano atual',data:d.privado.realizado_m,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.15)',fill:true,tension:.3}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}}},scales:AX(1)}});

  new Chart(document.getElementById('g-pub-mr'),{type:'bar',data:{labels:d.publico.meses,
    datasets:[{label:'Meta',data:d.publico.orcado_m,backgroundColor:'#4b5675',borderRadius:5},
              {label:'Realizado',data:d.publico.realizado_m,backgroundColor:'#a855f7',borderRadius:5}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}}},scales:AX(1)}});

  new Chart(document.getElementById('g-pub-yy'),{type:'line',data:{labels:d.publico.meses,
    datasets:[{label:'Ano anterior',data:d.publico.historico_m,borderColor:'#93a1c4',backgroundColor:'transparent',tension:.3},
              {label:'Ano atual',data:d.publico.realizado_m,borderColor:'#a855f7',backgroundColor:'rgba(168,85,247,.15)',fill:true,tension:.3}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}}},scales:AX(1)}});

  document.getElementById('k-descmed').textContent=d.desconto.media_desc+'%';
  document.getElementById('k-descmin').textContent=Math.min(...d.desconto.pct_desc)+'%';
  document.getElementById('k-descmax').textContent=Math.max(...d.desconto.pct_desc)+'%';
  document.getElementById('k-partmed').textContent=d.desconto.media_part+'%';
  new Chart(document.getElementById('g-desc'),{type:'line',data:{labels:d.desconto.meses,
    datasets:[{label:'% Desconto',data:d.desconto.pct_desc,borderColor:'#f97316',backgroundColor:'rgba(249,115,22,.15)',fill:true,tension:.3}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}}},scales:AX(0)}});
  document.getElementById('q-desc').innerHTML=d.desconto.meses.map((m,i)=>
    `<tr><td>${m}</td><td>${d.desconto.pct_desc[i]}%</td><td>${d.desconto.pct_part[i]}%</td></tr>`).join('')
    +`<tr class="tot"><td>Total</td><td>${d.desconto.media_desc}%</td><td>${d.desconto.media_part}%</td></tr>`;

  new Chart(document.getElementById('g-ag'),{type:'bar',data:{labels:d.ranking_agencias.map(a=>a.nome),
    datasets:[{label:'% Share',data:d.ranking_agencias.map(a=>a.share),backgroundColor:'#06b6d4',borderRadius:5}]},
    options:{...G,indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#93a1c4',callback:v=>v+'%'},grid:{color:'#26304f'}},y:{ticks:{color:'#93a1c4',font:{size:11}},grid:{display:false}}}}});
  document.getElementById('q-ag').innerHTML=d.ranking_agencias.map(a=>
    `<tr><td>${a.nome}</td><td>${f(a.valor)}</td><td>${a.share}%</td></tr>`).join('');

  new Chart(document.getElementById('g-cli'),{type:'bar',data:{labels:d.top_clientes.map(c=>c.nome),
    datasets:[{label:'Ano anterior',data:d.top_clientes.map(c=>c.hist),backgroundColor:'#4b5675',borderRadius:4},
              {label:'Ano atual',data:d.top_clientes.map(c=>c.real),backgroundColor:'#3b82f6',borderRadius:4}]},
    options:{...G,indexAxis:'y',plugins:{legend:{labels:{color:'#cbd5f0'}},title:{display:true,text:'Top 10 Clientes',color:'#eaf0ff'}},scales:{x:{ticks:{color:'#93a1c4',callback:v=>(v/1000)+'k'},grid:{color:'#26304f'}},y:{ticks:{color:'#93a1c4',font:{size:10}},grid:{display:false}}}}});

  new Chart(document.getElementById('g-set'),{type:'bar',data:{labels:d.setores.map(s=>s.nome),
    datasets:[{label:'Ano anterior',data:d.setores.map(s=>s.hist),backgroundColor:'#4b5675',borderRadius:4},
              {label:'Ano atual',data:d.setores.map(s=>s.real),backgroundColor:'#22c55e',borderRadius:4}]},
    options:{...G,plugins:{legend:{labels:{color:'#cbd5f0'}},title:{display:true,text:'Setores',color:'#eaf0ff'}},scales:AX(1)}});

  const b=d.base_clientes;
  document.getElementById('k-c25').textContent=b.clientes_2025;
  document.getElementById('k-c26').textContent=b.clientes_2026;
  document.getElementById('k-ret').textContent=Math.round(100*b.recorrentes/b.clientes_2025)+'%';
  document.getElementById('k-churn').textContent=b.churn+' clientes';
  document.getElementById('k-mant').textContent=f(b.receita_mantidos_2026);
  document.getElementById('k-novos').textContent=b.novos+' • '+f(b.receita_novos);
  document.getElementById('k-nrr').textContent=b.nrr+'%';
});
