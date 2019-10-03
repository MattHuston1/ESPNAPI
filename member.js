let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`

const memberWindowId = window.location.href.split("=")[1]
console.log(memberWindowId)

let member = document.getElementById('member')
let memberInfo = document.getElementById('memberInfo')
let qb = document.getElementById('qb')
let rb = document.getElementById('rb')
let wr = document.getElementById('wr')
let te = document.getElementById('te')
let d = document.getElementById('d')
let k = document.getElementById('k')



// let memberObject = {
//   id: ,
//   teamId: ,
//   displayName: ,
//   firstName: ,
//   lastName: ,
// }


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
  member.textContent = memberWindowId
  
  for (let i = 0; i < myJSON.members.length; i++) {
    
    let memberId = myJSON.members[i].id
    // console.log(memberId)
    let teamOwnerId = myJSON.teams[i].primaryOwner
    // console.log(teamOwnerId)
    // let index = myJSON.members.indexOf(myJSON.members[i])
    // console.log(myJSON.members[i].displayName)
    console.log(memberWindowId)
    console.log(myJSON.members[i].displayName)
    console.log(memberId)
    console.log(teamOwnerId)

    while (memberWindowId === myJSON.members[i].displayName) {
      let fullName = document.createElement('h3')
      fullName.textContent = myJSON.members[i].firstName + ' ' + myJSON.members[i].lastName
      memberInfo.appendChild(fullName)
      
    }
    
    
    if (memberWindowId === myJSON.members[i].displayName && memberId === teamOwnerId) {
      



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

      projRank.textContent = 'Projected Rank: ' + myJSON.teams[i].currentProjectedRank
      draftProjRank.textContent = 'Draft Day Projected Rank: ' + myJSON.teams[i].draftDayProjectedRank
      logo.src = myJSON.teams[i].logo
      logo.className = logo
      points.textContent = 'Total Points: ' + myJSON.teams[i].points
      pointsAgainst.textContent = 'Total Points Against: ' + myJSON.teams[i].record.overall.pointsAgainst
      record.textContent = 'Current Record: ' + myJSON.teams[i].record.overall.wins + ' / ' + myJSON.teams[i].record.overall.losses + ' / ' + myJSON.teams[i].record.overall.ties
      trades.textContent = 'Total Trades: ' + myJSON.teams[i].transactionCounter.trades
      acquisitions.textContent = 'Total acquisitions: ' + myJSON.teams[i].transactionCounter.acquisitions
      drops.textContent = 'Total drops: ' + myJSON.teams[i].transactionCounter.drops
      waiver.textContent = 'Waiver Position: ' + myJSON.teams[i].waiverRank

      memberInfo.appendChild(logo)
      memberInfo.appendChild(record)
      memberInfo.appendChild(draftProjRank)
      memberInfo.appendChild(points)
      memberInfo.appendChild(pointsAgainst)
      memberInfo.appendChild(trades)
      memberInfo.appendChild(acquisitions)
      memberInfo.appendChild(drops)
      memberInfo.appendChild(waiver)

    }
    // else {
      // console.log('Huh')
    // }
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
        if (memberWindowId === response.members[j].displayName && response.teams[j].id === myJSON.players[i].onTeamId) {

          let playerLink = document.createElement('a')
          playerLink.href = './players.html' + '?playerID=' + myJSON.players[i].player.id
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


//     for (let i = 0; i < myJSON.players.length; i++) {
//       for (let j = 0; j < response.members.length; j++) {
//         if (memberWindowId === response.members[j].displayName) {
//           if (response.teams[j].id === myJSON.players[i].onTeamId) {
//             let playerLink = document.createElement('a')
//             playerLink.href = './players.html'+'?playerID='+ myJSON.players[i].player.id
//             playerLink.textContent = myJSON.players[i].player.fullName
//             if (myJSON.players[i].player.defaultPositionId === 1) {
//               qb.appendChild(playerLink)
//             }
//             else if (myJSON.players[i].player.defaultPositionId === 2) {
//               rb.appendChild(playerLink)
//             }
//             else if (myJSON.players[i].player.defaultPositionId === 3) {
//               wr.appendChild(playerLink)
//             }
//             else if (myJSON.players[i].player.defaultPositionId === 4) {
//               te.appendChild(playerLink)
//             }
//             else if (myJSON.players[i].player.defaultPositionId === 16) {
//               d.appendChild(playerLink)
//             }
//             else if (myJSON.players[i].player.defaultPositionId === 5) {
//               k.appendChild(playerLink)
//             }
//           }
//           else {
//             // console.log('Nope')
//           }
//         }
//       }
//     }
//   }


//Position ID

//QB: 1
//RB: 2
//WR: 3
//TE: 4
//D: 16
//K: 5;