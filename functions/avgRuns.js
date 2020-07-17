//[Note]: if a match is won at Xth over, runs of the remaining 20-X overs are nullified

function avgRuns(deliveries,matches){
    let res = [],temp = {},teamsDone = [],totalMatches={};
    for(let ball of deliveries){
        if(teamsDone.indexOf(ball.batting_team)>=0){
            continue;
        }
        else{
            temp[ball.batting_team]={};
            temp[ball.batting_team]["total"]=[];
            //extract the team matches
            let teamDel=deliveries.filter(a=>a.batting_team==ball.batting_team);
            for(let i=1;i<=20;i++){
                temp[ball.batting_team]["total"].push(
            teamDel.filter(a=>a.over==i)
            .reduce((a,b)=>a+parseInt(b.total_runs),0));
            }
            for(let i =1;i<20;i++)
            temp[ball.batting_team]["total"][i]+=temp[ball.batting_team]["total"][i-1];
            teamsDone.push(ball.batting_team);
        }
    }
    for(match of matches){
        if(totalMatches[match.team1])
            totalMatches[match.team1]++;
        else{
            totalMatches[match.team1]=1;
        }
        if(totalMatches[match.team1])
        totalMatches[match.team2]++;
    else{
        totalMatches[match.team2]=1;
    }
    }
    for(let team of Object.keys(temp)){
        res.push({
            name:team,
            data:temp[team]["total"].map(a=>a/totalMatches[team])
        }
        );
    }
    return res;
}

module.exports = avgRuns;