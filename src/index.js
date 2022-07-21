import './style.css';

const playId = 'CsVjrIhDWuIKDeZ1pqQ'
const leaderboardForm = document.querySelector('.add-score')

leaderboardForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const person = document.getElementById('input-name');
  const score = document.getElementById('input-score');
  const leaderboardFormData = {
    person: person.value,
    score: parseInt(score.value, 10),
  };
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${playId}/scores/`, {
    method: 'POST',
    body: JSON.stringify(leaderboardFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  person.value = '';
  score.value = '';
  return result;
});

const getInfo = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${playId}/scores/`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
};
const addData = async () => {
  const players = await getInfo();
  const allPlayerPart = document.getElementById('recent');
  players.result.forEach((player) => {
    const playerInfo = `<div>${player.player}: ${player.score}</div>`;
    allPlayerPart.insertAdjacentHTML('beforeend', playerInfo);
  });
};

const refreshData = async () => {
  const allUsersPart = document.getElementById('scores');
  allUsersPart.innerHTML = '';
  await addData();
};


