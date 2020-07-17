function matchesWonLifetime(matches){
    const result={},temp = {};
    let years=[],scores=[];
        for(let match of matches){
        const winner = match.winner,year = match.season;
        if(result[winner]){
            if (result[winner][year])
            result[winner][year]+=1;
            else
            result[winner][year]=1;
        }
        else{
            result[winner]={};
            result[winner][year]=1;
        }
        if(years.indexOf(year)<0)years.push(year);
}
    years.sort((a,b)=>a-b)
    for(let team in result){
        for(let i = 0;i<years.length;i++){
            if(result[team].hasOwnProperty(years[i]))
            continue;
            result[team][years[i]]=0;
        }
    } 
    for(let team in result){
        scores.push({name:team,data:Object.values(result[team])})
    }
    temp["years"]=years;
    temp["scores"]=scores;
    return temp;
}

module.exports = matchesWonLifetime;