// let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1063759?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
let playerEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_player_info`
let positionalRatingsEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mPositionalRatingsStats`
let transactionsEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mTransactions2`
let teamEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mTeam`
let pendingTransactionsEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mPendingTransactions`
let communicationEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=kona_league_communication`
let playersWLEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=players_wl`

let espnAPI = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mTransactions2&view=mPositionalRatings&view=mPositionalRatingsStats&view=mSettings&view=mTeam&view=modular&view=mNav&view=kona_player_info&view=players_wl&view=kona_league_communication&view=kona_game_state`

let leagueName = document.getElementById('league')
let week = document.getElementById('week')
let membersList = document.getElementById('members')
let member = document.getElementById('member')
let transactions = document.getElementById('transactions')
let trades = document.getElementById('trades')

let SWID = '{68845481-EF2D-41D7-8454-81EF2DF1D747}'
let ESPN_2 = 'AECAmGXbqMZ1gRqxk%2BAG2Lb2FNmSkp7jDo15IZkSiAGOUNAKovnS5lNJTgQqctTH%2FaWiTm%2FERbEJXs6gWGRQ%2B28E%2BTOu5X%2BHBc66oL4Jc%2BfD8WYfdT6Mk8oh8%2Fz6wp936JC%2F4xE8mMeCD9o3TT8Lwn9Hu%2FDHizsDHGRodf%2BQ5UVUiVu32EyluLd9vsDNlRsAY8Hw5HNtmNynFcn1DKKj1yb%2FqrcOG3ingEgtjAym2wZ%2FstC3nNqbxV66qlQLrxPZjF4miylalREcHXNnmXKxuYOeQxnFalFZ1mGQ8VbaeIgAcgrF81wepoxsqtyrz229Bv8%3D'

const cookies = {
  'swid': SWID,
  'espn_s2': ESPN_2
}

fetch(espnAPI)
  .then(response => response.json())
  .then(myJSON => {
    appendLeagueInfo(myJSON)
    console.log(myJSON)
  })

fetch(draftEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    appendLeagueInfo(myJSON)
    // console.log(myJSON)
  })

function appendLeagueInfo(myJSON) {
  leagueName.textContent = myJSON.settings.name
  week.textContent = 'Week ' + myJSON.status.currentMatchupPeriod

  for (let i = 0; i < myJSON.teams.length; i++) {
    // console.log(myJSON.members[i])
    // if (myJSON.members[i].id === myJSON.teams[i].primaryOwner) {
    //   console.log(myJSON.members[i].id)
    // console.log(myJSON.teams[i].primaryOwner)
    //   console.log('worked')
    let memberDisplayName = document.createElement('a')
    memberDisplayName.href = './member.html' + '?memberID=' + myJSON.teams[i].primaryOwner
    memberDisplayName.textContent = myJSON.teams[i].location + ' ' + myJSON.teams[i].nickname
    membersList.appendChild(memberDisplayName)


    // }
    // else {
    //   console.log('didnt work')
    // }
    // memberDisplayName.href = './member.html'+'?memberID='+myJSON.members[i].displayName
    // memberDisplayName.textContent = myJSON.members[i].displayName
    // membersList.appendChild(memberDisplayName)
  }

}

fetch(playerEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    // appendLeagueInfo(myJSON)
    // console.log(myJSON)
  })

fetch(positionalRatingsEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    // appendLeagueInfo(myJSON)
    // console.log(myJSON)
  })

fetch(transactionsEndpoint)
  .then(response => response.json())
  .then(myJSON => {
    transactionsResponse(myJSON)
    // console.log('transactions', myJSON)
  })


function transactionsResponse(myJSON) {

  fetch(playerEndpoint)
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      playerToTrades(response)
    })

  function playerToTrades(response) {

    for (let i = 0; i < myJSON.transactions.length; i++) {
      for (let j = 0; j < myJSON.transactions[i].items.length; j++) {
        for (let k = 0; k < response.players.length; k++) {
          if (myJSON.transactions[i].type === 'TRADE_PROPOSAL') {
            // console.log(myJSON.transactions[i])
            if (myJSON.transactions[i].items[j].playerId === response.players[k].id) {
              console.log('Proposed Trade From ' + myJSON.transactions[i].memberId + ' : ' + response.players[k].player.fullName)
              // console.log(response.players[k].player.fullName)
              // console.log(myJSON.transactions[i].items[j].fromTeamId)
              // console.log(myJSON.transactions[i].memberId)
              // console.log('Proposed Trade From ' + myJSON.transactions[i].items[j].fromTeamId + ' : ' + response.players[k].player.fullName)


            }
          }
        }
      }
    }
  }
}

  fetch(teamEndpoint)
    .then(response => response.json())
    .then(myJSON => {
      // appendLeagueInfo(myJSON)
      // console.log("team", myJSON)
    })

  fetch(communicationEndpoint)
    .then(response => response.json())
    .then(myJSON => {
      // appendLeagueInfo(myJSON)
      // console.log(myJSON)
    })

  fetch(playersWLEndpoint)
    .then(response => response.json())
    .then(myJSON => {
      // appendLeagueInfo(myJSON)
      // console.log(myJSON)
    })