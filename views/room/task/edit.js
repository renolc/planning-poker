module.exports = (room) => `
  <form id="task-edit-form" ic-post-to="/${room.name}/task" ic-replace-target="true">
    <textarea name="task" cols="30" rows="10" autofocus>${room.task || ''}</textarea>
    <input type="submit"> <a class="button button-clear" ic-get-from="/${room.name}/task/full" ic-target="#task-edit-form" ic-replace-target="true">cancel</a>
  </form>
`