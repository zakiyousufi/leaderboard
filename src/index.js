import './style.css';

const recentScore = document.getElementsById('recent')
const playID = 'CsVjrIhDWuIKDeZ1pqQ'
const leaderboardForm = document.getElementsById('add-your-score')

leaderboardForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const person = document.getElementById('input-name');
  const score = document.getElementById('input-score');
  const leaderboardFormData = {
    person: person.value,
    score: parseInt(score.value, 10),
  };

});
