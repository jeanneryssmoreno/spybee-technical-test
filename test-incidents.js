const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/mock_data.json', 'utf8'));

const projectsWithCounts = data.map((p, i) => {
  const incidentsCount = (p.incidents || []).filter(inc => 
    inc.item?.toString().toLowerCase() === 'incidents'
  ).length;
  
  return {
    index: i + 1,
    title: p.title,
    incidents: incidentsCount
  };
});


projectsWithCounts.sort((a, b) => b.incidents - a.incidents);
projectsWithCounts.slice(0, 15).forEach(p => {
  console.log(`${p.title}: ${p.incidents} incidents`);
});
