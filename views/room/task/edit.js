module.exports = (room) => `
  <form id="task-edit-form" ic-post-to="/${room.name}/task" ic-replace-target="true">
    <textarea style="height: 15rem" name="task" autofocus>${room.task || ''}</textarea>
    <input type="submit" value="save"> <a class="button button-clear" ic-get-from="/${room.name}/task/full" ic-target="#task-edit-form" ic-replace-target="true">cancel</a>
  </form>
`