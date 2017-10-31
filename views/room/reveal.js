module.exports = ({ submissions }) => `
  <ul>
    <li class="button button-primary"><strong>average</strong> - ${submissions.reduce((total, { score }) => total + parseInt(score, 10), 0) / submissions.length}</li><br>
    ${submissions.map(({ name, score }) => `<li class="button">${name} - ${score}</li>`).join('')}
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