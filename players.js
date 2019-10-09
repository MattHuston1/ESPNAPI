let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`
let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`

const playerName = window.location.href.split("=")[1]

let playerInfo = document.getElementById('playerInfo')


fetch(playerEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendPlayerInfo(myJSON)
  })

function appendPlayerInfo(myJSON) {
  for (let i = 0; i < myJSON.players.length; i++) {

    if (myJSON.players[i].player.firstName + myJSON.players[i].player.lastName === playerName) {

      console.log(myJSON.players[i])
      let playerName = document.createElement('h1')
      let playerTeam = document.createElement('h2')
      let positionRanking = document.createElement('h3')
      let percentOwned = document.createElement('h3')
      let percentStarted = document.createElement('h3')
      let percentChanged = document.createElement('h3')
      let adp = document.createElement('h3')
      let outlook = document.createElement('p')
      let seasonOutlook = document.createElement('p')

      playerName.textContent = myJSON.players[i].player.fullName + ' # ' + myJSON.players[i].player.jersey
      playerInfo.appendChild(playerName)

      positionRanking.textContent = 'Position Ranking: ' + myJSON.players[i].ratings[0].positionalRanking
      percentOwned.textContent = 'Percent Owned: ' + myJSON.players[i].player.ownership.percentOwned.toFixed(2) + '%'
      percentStarted.textContent = 'Percent Started: ' + myJSON.players[i].player.ownership.percentStarted.toFixed(2) + '%'
      percentChanged.textContent = 'Percent Changed: ' + myJSON.players[i].player.ownership.percentChange.toFixed(2) + '%'
      adp.textContent = 'Average Draft Position: ' + myJSON.players[i].player.ownership.averageDraftPosition.toFixed(2)


      let allOutlooks = myJSON.players[i].player.outlooks.outlooksByWeek
      Object.keys(allOutlooks)
      let lastOutlook = allOutlooks[Object.keys(allOutlooks).length - 1]
      outlook.textContent = 'Weekly Outlook: ' + lastOutlook
      seasonOutlook.textContent = 'Seasonal Outlook: ' + myJSON.players[i].player.seasonOutlook




      if (myJSON.players[i].player.proTeamId === 0) {
        playerTeam.textContent = "Free Agent"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 1) {
        playerTeam.textContent = "Atlanta Falcons"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 2) {
        playerTeam.textContent = "Buffalo Bills"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 3) {
        playerTeam.textContent = "Chicago Bears"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 4) {
        playerTeam.textContent = "Cincinatti Bengals"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 5) {
        playerTeam.textContent = "Cleveland Browns"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 6) {
        playerTeam.textContent = "Dallas Cowboys"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 7) {
        playerTeam.textContent = "Denver Broncos"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 8) {
        playerTeam.textContent = "Detroit Lions"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 9) {
        playerTeam.textContent = "Green Bay Packers"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 10) {
        playerTeam.textContent = "Tennessee Titans"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 11) {
        playerTeam.textContent = "Indianapolis Colts"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 12) {
        playerTeam.textContent = "Kansas City Chiefs"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 13) {
        playerTeam.textContent = "Oakland Raiders"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 14) {
        playerTeam.textContent = "Los Angeles Rams"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 15) {
        playerTeam.textContent = "Miami Dolphins"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 16) {
        playerTeam.textContent = "Minnesota Vikings"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 17) {
        playerTeam.textContent = "New England Patriots"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 18) {
        playerTeam.textContent = "New Orleans Saints"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 19) {
        playerTeam.textContent = "New York Giants"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 20) {
        playerTeam.textContent = "New York Jets"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 21) {
        playerTeam.textContent = "Philadelphia Eagles"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 22) {
        playerTeam.textContent = "Arizona Cardinals"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 23) {
        playerTeam.textContent = "Pittsburgh Steelers"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 24) {
        playerTeam.textContent = "Los Angeles Chargers"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 25) {
        playerTeam.textContent = "San Fransisco 49er's"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 26) {
        playerTeam.textContent = "Seattle Seahawks"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 27) {
        playerTeam.textContent = "Tampa Bay Buccaneers"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 28) {
        playerTeam.textContent = "Washington Redskins"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 29) {
        playerTeam.textContent = "Carolina Panthers"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 30) {
        playerTeam.textContent = "Jacksonville Jaguars"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 33) {
        playerTeam.textContent = "Baltimore Ravens"
        playerInfo.appendChild(playerTeam)
      }
      else if (myJSON.players[i].player.proTeamId === 34) {
        playerTeam.textContent = "Houston Texans"
        playerInfo.appendChild(playerTeam)
      }

      playerInfo.appendChild(positionRanking)
      playerInfo.appendChild(adp)
      playerInfo.appendChild(percentOwned)
      playerInfo.appendChild(percentStarted)
      playerInfo.appendChild(percentChanged)
      playerInfo.appendChild(outlook)
      playerInfo.appendChild(seasonOutlook)

    }
    else {
      // console.log('oops')
    }
  }

}

fetch(draftEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendDraftDetails(myJSON)
  })
  
function appendDraftDetails(myJSON) {

  fetch(playerEndpoint)
    .then(response => response.json())
    .then(response => {
      // console.log(myJSON)
      appendPlayerInfo(response)
    })

  function appendPlayerInfo(response) {
    for (let i = 0; i < myJSON.draftDetail.picks.length; i++) {
      for (let j = 0; j < response.players.length; j++) {
        let draftDetails = document.createElement('h3')
        let draftPicks = myJSON.draftDetail.picks[i]
        let firstAndLastName = response.players[j].player.firstName + response.players[j].player.lastName

        // console.log(draftPicks.playerId)
        if (playerName === firstAndLastName && draftPicks.playerId === response.players[j].id) {
          // console.log(draftPicks.roundId)
          // console.log(draftPicks.roundPickNumber)
          draftDetails.textContent = 'Drafted Round ' + draftPicks.roundId + ' Pick ' + draftPicks.roundPickNumber
          playerInfo.appendChild(draftDetails)
        }

      }
    }
  }
}