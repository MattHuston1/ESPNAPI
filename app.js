let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`

let leagueName = document.getElementById('league')
let week = document.getElementById('week')
let membersList = document.getElementById('members')
let member = document.getElementById('member')

fetch(draftEndpoint)
.then(response => response.json())
.then(myJSON => {
  appendLeagueInfo(myJSON)
  console.log(myJSON)
})

function appendLeagueInfo(myJSON) {
  leagueName.textContent = myJSON.settings.name
  week.textContent = 'Week ' + myJSON.status.currentMatchupPeriod
  
  for (let i = 0; i < myJSON.members.length; i++) {
    // console.log(myJSON.members[i])
    let memberDisplayName = document.createElement('a')
    memberDisplayName.href = './member.html'+'?memberID='+myJSON.members[i].displayName
    memberDisplayName.textContent = myJSON.members[i].displayName
    membersList.appendChild(memberDisplayName)
  }

}