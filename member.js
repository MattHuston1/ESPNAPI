let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`
let transactionsEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mTransactions2`

let workingLeagueID = '1241838'

const memberWindowId = window.location.href.split("=")[1]
// console.log(memberWindowId)

let member = document.getElementById('member')
let memberInfo = document.getElementById('memberInfo')
let qb = document.getElementById('qb')
let rb = document.getElementById('rb')
let wr = document.getElementById('wr')
let te = document.getElementById('te')
let d = document.getElementById('d')
let k = document.getElementById('k')

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
let weeklyTrades = document.createElement('p')

let SWID = '{68845481-EF2D-41D7-8454-81EF2DF1D747}'
let ESPN_2 = 'AECAmGXbqMZ1gRqxk%2BAG2Lb2FNmSkp7jDo15IZkSiAGOUNAKovnS5lNJTgQqctTH%2FaWiTm%2FERbEJXs6gWGRQ%2B28E%2BTOu5X%2BHBc66oL4Jc%2BfD8WYfdT6Mk8oh8%2Fz6wp936JC%2F4xE8mMeCD9o3TT8Lwn9Hu%2FDHizsDHGRodf%2BQ5UVUiVu32EyluLd9vsDNlRsAY8Hw5HNtmNynFcn1DKKj1yb%2FqrcOG3ingEgtjAym2wZ%2FstC3nNqbxV66qlQLrxPZjF4miylalREcHXNnmXKxuYOeQxnFalFZ1mGQ8VbaeIgAcgrF81wepoxsqtyrz229Bv8%3D'

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

  for (let i = 0; i < myJSON.teams.length; i++) {
    // let index = myJSON.members.indexOf(myJSON.members[i])

    if (memberWindowId === myJSON.members[i].id) {
      member.textContent = myJSON.teams[i].location + ' ' + myJSON.teams[i].nickname
      let memberId = myJSON.members[i].id
      let fullName = document.createElement('h3')
      fullName.textContent = myJSON.members[i].firstName + ' ' + myJSON.members[i].lastName
      memberInfo.appendChild(fullName)
      for (let j = 0; j < myJSON.teams.length; j++) {
        let teamOwnerId = myJSON.teams[j].primaryOwner
        if (teamOwnerId === memberId) {

          projRank.textContent = 'Projected Rank: ' + myJSON.teams[j].currentProjectedRank
          draftProjRank.textContent = 'Draft Day Projected Rank: ' + myJSON.teams[j].draftDayProjectedRank
          logo.src = myJSON.teams[j].logo
          logo.className = logo
          points.textContent = 'Total Points: ' + myJSON.teams[j].points
          pointsAgainst.textContent = 'Total Points Against: ' + myJSON.teams[j].record.overall.pointsAgainst
          record.textContent = 'Current Record: ' + myJSON.teams[j].record.overall.wins + ' / ' + myJSON.teams[j].record.overall.losses + ' / ' + myJSON.teams[j].record.overall.ties
          trades.textContent = 'Total Trades: ' + myJSON.teams[j].transactionCounter.trades
          acquisitions.textContent = 'Total acquisitions: ' + myJSON.teams[j].transactionCounter.acquisitions
          drops.textContent = 'Total drops: ' + myJSON.teams[j].transactionCounter.drops
          waiver.textContent = 'Waiver Position: ' + myJSON.teams[j].waiverRank

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
      }
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
    for (let j = 0; j < response.teams.length; j++) {
      if (memberWindowId === response.members[j].id) {
        for (let i = 0; i < myJSON.players.length; i++) {
          if (response.teams[j].id === myJSON.players[i].onTeamId) {
            // console.log(response.teams[j].id + " team id")
            // console.log(myJSON.players[i].onTeamId + " player team id")
            let playerLink = document.createElement('a')
            playerLink.href = './players.html' + '?playerID=' + myJSON.players[i].player.firstName + myJSON.players[i].player.lastName
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

// fetch(transactionsEndpoint)
//   .then(response => response.json())
//   .then(myJSON => {
//     transactionsResponse(myJSON)
//     console.log('transactions', myJSON)
//   })


// function transactionsResponse(myJSON) {

//   fetch(playerEndpoint)
//     .then(response => response.json())
//     .then(response => {
//       // console.log(response)
//       playerToTrades(response)
//     })

//   function playerToTrades(response) {

//     for (let i = 0; i < myJSON.transactions.length; i++) {
//       for (let j = 0; j < myJSON.transactions[i].items.length; j++) {
//         for (let k = 0; k < response.players.length; k++) {

//           if (memberWindowId === myJSON.transactions[i].memberId) {
//             // console.log(myJSON.transactions[i].items[j].type)
//             if (myJSON.transactions[i].type === 'TRADE_PROPOSAL') {
//               console.log(myJSON.transactions[i].playerId)
//               if (myJSON.transactions[i].items[j].playerId === response.players[k].id) {
//                 console.log(response.players[k].player.fullName)
//                 weeklyTrades.textContent = 'This Weeks Trade Proposals: ' + myJSON.transactions[i].items[j].type

//                 console.log('trades', myJSON.transactions[i])
//               }
//               // console.log(myJSON.transactions[i].items[j])
//               // weeklyTrades.textContent = myJSON.transactions[i].items[j].type

//               // console.log(weeklyTrades)
//               // memberInfo.appendChild(weeklyTrades)
//             }
//             else if (myJSON.transactions[i].items[j].type === 'ADD') {
//               // console.log('adds', myJSON.transactions[i])
//             }
//             else if (myJSON.transactions[i].items[j].type === 'LINEUP') {
//               // console.log('lineup', myJSON.transactions[i])
//             }
//             else if (myJSON.transactions[i].items[j].type === 'DROP') {
//               // console.log('drop', myJSON.transactions[i])
//             }
//           }
//         }
//       }
//     }
//   }
// }

//Position ID

//QB: 1
//RB: 2
//WR: 3
//TE: 4
//K: 5
//D: 16