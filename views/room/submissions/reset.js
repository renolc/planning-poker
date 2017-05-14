const revealButton = require('./revealButton')

module.exports = (room) => `
  <div ic-get-from="/${room.name}/reveal/enable" ic-trigger-on="sse:update:submissions">
    ${revealButton(room)}
  </div>
  <div ic-get-from="/${room.name}/scores" ic-trigger-on="sse:reveal">
    <ul ic-src="/${room.name}/submissions" ic-trigger-on="sse:update:submissions"></ul>
    <style>
      ul > li.button {
        background-color: #606c76;
        border-color: #606c76;
        cursor: default;
        margin-right: 10px;
      }
    </style>
  </div>
  <form ic-post-to="/${room.name}/submissions" ic-replace-target="true">
    <input id="username" style="width: 250px" type="text" name="name" placeholder="your name" onkeyup="localStorage.setItem('username', this.value)" required><br>
    <input type="radio" name="score" id="score-1" value="1" required> <label for="score-1" class="button button-outline label-inline">1</label>
    <input type="radio" name="score" id="score-2" value="2" required> <label for="score-2" class="button button-outline label-inline">2</label>
    <input type="radio" name="score" id="score-3" value="3" required> <label for="score-3" class="button button-outline label-inline">3</label>
    <input type="radio" name="score" id="score-5" value="5" required> <label for="score-5" class="button button-outline label-inline">5</label>
    <input type="radio" name="score" id="score-8" value="8" required> <label for="score-8" class="button button-outline label-inline">8</label>
    <input type="radio" name="score" id="score-13" value="13" required> <label for="score-13" class="button button-outline label-inline">13</label>
    <input type="radio" name="score" id="score-21" value="21" required> <label for="score-21" class="button button-outline label-inline">21</label>
    <input type="radio" name="score" id="score-34" value="34" required> <label for="score-34" class="button button-outline label-inline">34</label>
    <input type="radio" name="score" id="score-55" value="55" required> <label for="score-55" class="button button-outline label-inline">55</label>
    <input type="radio" name="score" id="score-89" value="89" required> <label for="score-89" class="button button-outline label-inline">89</label>
    <input type="radio" name="score" id="score-144" value="144" required> <label for="score-144" class="button button-outline label-inline">144</label><br>
    <input type="submit">
  </form>
  <style>
    input[type=radio] {
      position: absolute !important;
      clip: rect(0, 0, 0, 0);
    }

    label.button {
      margin-left: 0;
    }

    input[type=radio]:checked + label {
      background-color: #606c76;
      border-color: #606c76;
      color: white;
    }

    input[type=radio]:checked + label:hover {
      background-color: #606c76;
      border-color: #606c76;
      color: white;
    }
  </style>
  <script>
    document.getElementById('username').value = localStorage.getItem('username')
  </script>
`