let draftEndpoint = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/1241838?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`

let leagueName = document.getElementById('league')
let membersList = document.getElementById('members')


fetch(draftEndpoint)
.then(response => response.json())
.then(myJSON => {
  console.log(myJSON)
  appendLeagueInfo(myJSON)
})

function appendLeagueInfo(myJSON) {
  leagueName.textContent = myJSON.settings.name
  
  for (let i = 0; i < myJSON.members.length; i++) {
    // console.log(myJSON.members[i])
    let member = document.createElement('ul')
    let displayName = document.createElement('li')
    let name = document.createElement('li')
    displayName.textContent = myJSON.members[i].displayName
    name.textContent = myJSON.members[i].firstName + ' ' + myJSON.members[i].lastName
    membersList.appendChild(member)
    member.appendChild(displayName)
    member.appendChild(name)
  }
}