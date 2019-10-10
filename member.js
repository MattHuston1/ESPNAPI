let espnAPI = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mTransactions2&view=mPositionalRatings&view=mPositionalRatingsStats&view=mSettings&view=mTeam&view=modular&view=mNav&view=kona_player_info&view=players_wl&view=kona_league_communication&view=kona_game_state`

let workingLeagueID = '1241838'

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

fetch(espnAPI)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON)
    appendMemberInfo(myJSON)
  })

function appendMemberInfo(myJSON) {

  for (let i = 0; i < myJSON.teams.length; i++) {
    for (let j = 0; j < myJSON.members.length; j++) {
      // let index = myJSON.members.indexOf(myJSON.members[i])
      let memberId = myJSON.members[j].id
      let teamOwnerId = myJSON.teams[i].primaryOwner

      if (memberWindowId === memberId && teamOwnerId === memberWindowId) {
        member.textContent = myJSON.teams[i].location + ' ' + myJSON.teams[i].nickname

        let fullName = document.createElement('h3')
        fullName.textContent = myJSON.members[j].firstName + ' ' + myJSON.members[j].lastName
        memberInfo.appendChild(fullName)

        projRank.textContent = 'Projected Rank: ' + myJSON.teams[i].currentProjectedRank
        draftProjRank.textContent = 'Draft Day Projected Rank: ' + myJSON.teams[i].draftDayProjectedRank
        logo.src = myJSON.teams[i].logo
        logo.className = logo
        points.textContent = 'Total Points For: ' + myJSON.teams[i].points
        pointsAgainst.textContent = 'Total Points Against: ' + myJSON.teams[i].record.overall.pointsAgainst
        record.textContent = 'Current Record: ' + myJSON.teams[i].record.overall.wins + ' / ' + myJSON.teams[i].record.overall.losses + ' / ' + myJSON.teams[j].record.overall.ties
        trades.textContent = 'Total Trades: ' + myJSON.teams[i].transactionCounter.trades
        acquisitions.textContent = 'Total acquisitions: ' + myJSON.teams[i].transactionCounter.acquisitions
        drops.textContent = 'Total drops: ' + myJSON.teams[i].transactionCounter.drops
        waiver.textContent = 'Waiver Position: ' + myJSON.teams[i].waiverRank

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
    }
  }

  for (let i = 0; i < myJSON.teams.length; i++) {
    for (let j = 0; j < myJSON.players.length; j++) {
      if (memberWindowId === myJSON.teams[i].primaryOwner) {
        if (myJSON.teams[i].id === myJSON.players[j].onTeamId) {

          let playerLink = document.createElement('a')
          playerLink.href = './players.html' + '?playerID=' + myJSON.players[j].player.firstName + myJSON.players[j].player.lastName
          playerLink.textContent = myJSON.players[j].player.fullName
          if (myJSON.players[j].player.defaultPositionId === 1) {
            qb.appendChild(playerLink)
          }
          else if (myJSON.players[j].player.defaultPositionId === 2) {
            rb.appendChild(playerLink)
          }
          else if (myJSON.players[j].player.defaultPositionId === 3) {
            wr.appendChild(playerLink)
          }
          else if (myJSON.players[j].player.defaultPositionId === 4) {
            te.appendChild(playerLink)
          }
          else if (myJSON.players[j].player.defaultPositionId === 16) {
            d.appendChild(playerLink)
          }
          else if (myJSON.players[j].player.defaultPositionId === 5) {
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