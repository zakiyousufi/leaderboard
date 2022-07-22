import './style.css';

const gameId = 'c2tiUii6qQdFdKdUcqsG';
const leaderboardForm = document.querySelector('.add-score');

leaderboardForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('input-name');
  const score = document.getElementById('input-score');
  const leaderboardFormData = {
    user: user.value,
    score: parseInt(score.value, 10),
  };

  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    method: 'POST',
    body: JSON.stringify(leaderboardFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  user.value = '';
  score.value = '';
  return result;
});

const getData = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`);
  try {
    const users = await response.json();
    users.result.sort((a, b) => a.score - b.score);
    const alluserPart = document.getElementById('recent');
    alluserPart.innerText = '';
    users.result.forEach((user) => {
      const userInfo = `<div>${user.user}: ${user.score}</div>`;
      alluserPart.insertAdjacentHTML('beforeend', userInfo);
    });
  } catch (error) {
    return (error)
  }
};

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', getData);

window.addEventListener('DOMContentLoaded', async () => {
  await getData();
});
