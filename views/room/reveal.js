module.exports = (room) => `
  <ul>
    <li class="button button-primary"><strong>average</strong> - ${room.submissions.reduce((total, i) => total + parseInt(i.score, 10), 0) / room.submissions.length}</li><br>
    ${room.submissions.map((i) => `<li class="button">${i.name} - ${i.score}</li>`).join('')}
  </ul>
  <style>
    ul > li.button {
      cursor: default;
    }

    ul > li.button-primary:hover {
      background-color: #9b4dca;
      border-color: #9b4dca;
    }

    ul > li.button:not(.button-primary) {
      background-color: #606c76;
      border-color: #606c76;
      margin-right: 10px;
    }
  </style>
`