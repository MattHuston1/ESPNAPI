let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`

const memberID = window.location.href.split("=")[1]
console.log(memberID)

let member = document.getElementById('member')
let memberInfo = document.getElementById('memberInfo')
let qb = document.getElementById('qb')
let rb = document.getElementById('rb')
let wr = document.getElementById('wr')
let te = document.getElementById('te')
let d = document.getElementById('d')
let k = document.getElementById('k')


fetch(draftEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendMemberInfo(myJSON)
  })

fetch(playerEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendPlayers(myJSON)
  })

function appendMemberInfo(myJSON) {
  member.textContent = memberID
  let fullName = document.createElement('h3')

  for (let i = 0; i < myJSON.members.length; i++) {

    if (memberID === myJSON.members[i].displayName) {
      fullName.textContent = myJSON.members[i].firstName + ' ' + myJSON.members[i].lastName
      memberInfo.appendChild(fullName)
      let index = myJSON.members.indexOf(myJSON.members[i])
      let projRank = document.createElement('p')
      let draftProjRank = document.createElement('p')
      let logo = document.createElement('img')
      let points = document.createElement('p')
      let pointsAgainst = document.createElement('p')
      let record = document.createElement('p')
      let trades = document.createElement('p')
      let acquisitions = document.createElement('p')
      let drops = document.createElement('p')
      let waiver = document.createElement('p')

      projRank.textContent = 'Projected Rank: ' + myJSON.teams[index].currentProjectedRank
      draftProjRank.textContent = 'Draft Day Projected Rank: ' + myJSON.teams[index].draftDayProjectedRank
      logo.src = myJSON.teams[index].logo
      logo.className = logo
      points.textContent = 'Total Points: ' + myJSON.teams[index].points
      pointsAgainst.textContent = 'Total Points Against: ' + myJSON.teams[index].record.overall.pointsAgainst
      record.textContent = 'Current Record: ' + myJSON.teams[index].record.overall.wins + ' / ' + myJSON.teams[index].record.overall.losses + ' / ' + myJSON.teams[index].record.overall.ties
      trades.textContent = 'Total Trades: ' + myJSON.teams[index].transactionCounter.trades
      acquisitions.textContent = 'Total acquisitions: ' + myJSON.teams[index].transactionCounter.acquisitions
      drops.textContent = 'Total drops: ' + myJSON.teams[index].transactionCounter.drops
      waiver.textContent = 'Waiver Position: ' + myJSON.teams[index].waiverRank

      memberInfo.appendChild(logo)
      memberInfo.appendChild(record)
      memberInfo.appendChild(projRank)
      memberInfo.appendChild(draftProjRank)
      memberInfo.appendChild(points)
      memberInfo.appendChild(pointsAgainst)
      memberInfo.appendChild(trades)
      memberInfo.appendChild(acquisitions)
      memberInfo.appendChild(drops)
      memberInfo.appendChild(waiver)

    }
    else {
      // console.log('Hmm')
    }
  }
}

function appendPlayers(myJSON) {

  fetch(draftEndpoint)
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      memberPlayer(response)
    })
  function memberPlayer(response) {

    for (let i = 0; i < myJSON.players.length; i++) {
      for (let j = 0; j < response.members.length; j++) {
        if (memberID === response.members[j].displayName) {
          if (response.teams[j].id === myJSON.players[i].onTeamId) {
            let playerLink = document.createElement('a')
            playerLink.href = './players.html'+'?playerID='+ myJSON.players[i].player.id
            playerLink.textContent = myJSON.players[i].player.fullName
            if (myJSON.players[i].player.defaultPositionId === 1) {
              qb.appendChild(playerLink)
            }
            else if (myJSON.players[i].player.defaultPositionId === 2) {
              rb.appendChild(playerLink)
            }
            else if (myJSON.players[i].player.defaultPositionId === 3) {
              wr.appendChild(playerLink)
            }
            else if (myJSON.players[i].player.defaultPositionId === 4) {
              te.appendChild(playerLink)
            }
            else if (myJSON.players[i].player.defaultPositionId === 16) {
              d.appendChild(playerLink)
            }
            else if (myJSON.players[i].player.defaultPositionId === 5) {
              k.appendChild(playerLink)
            }
          }
          else {
            // console.log('Nope')
          }
        }
      }
    }
  }
}


//Position ID

//QB: 1
//RB: 2
//WR: 3
//TE: 4
//D: 16
//K: 5
