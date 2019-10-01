let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
const memberID = window.location.href.split("=")[1]
console.log(memberID)

let member = document.getElementById('member')
let memberInfo = document.getElementById('memberInfo')

fetch(draftEndpoint)
.then(response => response.json())
.then(myJSON => {
  console.log(myJSON)
  appendMemberInfo(myJSON)
})

function appendMemberInfo(myJSON) {
  member.textContent = memberID
  let fullName = document.createElement('h3')

  for (let i = 0; i < myJSON.members.length; i++) {
    console.log(myJSON.members[i].displayName)
    // console.log(myJSON.members.indexOf(myJSON.members[i]))

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
    else{
      console.log('Hmm')
    }
  }

    
}
