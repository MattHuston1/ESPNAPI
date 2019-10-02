let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`

const playerID = window.location.href.split("=")[1]
console.log(playerID)

let playerInfo = document.getElementById('playerInfo')

fetch(playerEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendPlayerInfo(myJSON)
  })

  function appendPlayerInfo(myJSON) {
    for (let i = 0; i < myJSON.players.length; i++) {
      if (myJSON.players[i].id === playerID) {
        // let playerName = document.createElement('h1')
        // playerName.textContent = myJSON.players[i].player.fullName
        console.log(myJSON.players[i].player.fullName)
        // playerInfo.appendChild(playerName)
      }      
    }

  }