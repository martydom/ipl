function extraRuns(matches,deliveries){
    const result={};
    const ids = matches.filter(match=>match.season==2016).map(match=>match.id);
    const del = deliveries.filter(match => ids.indexOf(match.match_id)>=0);
    let teams = new Set(del.map(a=>a.batting_team));
    for(let team of teams)
        result[team]=del.filter(a=>a.batting_team==team).reduce((a,b)=>a+parseInt(b.extra_runs),0);
    return result;
}

module.exports = extraRuns;