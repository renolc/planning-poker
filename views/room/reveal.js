module.exports = (room) => `
  <ul>
    ${room.submissions.map((i) => `<li>${i.name} - ${i.score}</li>`).join('')}
    <li><strong>average</strong> - ${room.submissions.reduce((total, i) => total + parseInt(i.score, 10), 0) / room.submissions.length}</li>
  </ul>
`