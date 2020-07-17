function economicalBowler(matches,deliveries){
    const result=[];
    const ids = matches.filter(match=>match.season==2015).map(match=>match.id);
    const del = deliveries.filter(match => ids.indexOf(match.match_id)>=0);
    const bowlers=new Set(del.map(a=>a.bowler));
    const findOvers = bowl=>{
        let temp=[];
        for(let i=1;i<=20;i++)
        temp.push(del.filter(a=>parseInt(a.over)==i&&parseInt(a.ball)==6&&a.bowler==bowl).length);
        return temp.reduce((a,b)=>a+b,0);
    };
    
    for(let bowl of bowlers)
        result.push([bowl,del.filter(a=>a.bowler==bowl).reduce((a,ball)=>a+parseInt(ball.total_runs),0)/findOvers(bowl)]);
return result.sort((a,b)=>a[1]-b[1]).slice(0,10);
}

module.exports = economicalBowler;