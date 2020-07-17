function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  
  function visualizeData(data) {
    visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
    visualizeMatchesWonLifetime(data.matchesWonLifetime);
    visualizeExtraRuns(data.extraRuns);
    visualizeEconomicalBowler(data.economicalBowler);
    visualizeAverageRuns(data.avgRuns);
    return;
  }
  
  function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
      seriesData.push([year, matchesPlayedPerYear[year]]);
    }
  
    Highcharts.chart("matches-played-per-year", {
      chart: {
        type: "column"
      },
      title: {
        text: "Matches Played Per Year"
      },
      subtitle: {
        text:
          'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Matches"
        }
      },
      legend: {
        enabled: false
    },
      series: [
        {
          name: "Matches",
          data: seriesData,
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            align: 'center',
            y:25,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
        }
      ]
    });
  }
function visualizeMatchesWonLifetime (matchesWonLifetime){
  Highcharts.chart('matches-won-lifetime', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Matches Won Lifetime'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        categories: matchesWonLifetime["years"],
        crosshair : true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Matches Won'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: matchesWonLifetime["scores"]
});
}


function visualizeExtraRuns(extraRuns){
  let serialData = [];
  for(let team in extraRuns){
    serialData.push([team,extraRuns[team]]);
  }
  Highcharts.chart("extra-runs", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Runs Conceded By each team in 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Runs"
      }
    },
    legend: {
      enabled: false
  },
    series: [
      {
        name: "runs",
        data: serialData,
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          align: 'center',
          y: 25, // 10 pixels down from the top
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
      }
    ]
  });
}


function visualizeEconomicalBowler(data1){
  Highcharts.chart('eco-bowl', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Economy Of Bowlers in year 2015'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Economy'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Economy of Bowlers in 2015: <b>{point.y:.1f} runs</b>'
    },
    series: [{
        name: 'Economy',
        data: data1,
        dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            align: 'center',
            format: '{point.y:.2f}', 
            y: 25, 
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}

function visualizeAverageRuns(data){
  for(team of data){
    team["data"].unshift(0);
    team["data"]=team["data"].map(a=>parseFloat(a.toFixed(2)));
  }
  Highcharts.chart('avg-runs', {

    title: {
        text: 'Average Runs Over 20 Overs for Team\'s Career'
    },

    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },

    yAxis: {
        title: {
            text: 'Runs'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 0 to 20'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },

    series: data,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
               }
            }
        }]
    }

});
}