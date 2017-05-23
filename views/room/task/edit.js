module.exports = (room) => `
  <form id="task-edit-form" ic-post-to="/${room.name}/task" ic-replace-target="true">
    <textarea style="height: 15rem" name="task" autofocus>${room.task || ''}</textarea>
    <input id="save" type="submit" value="save"> <a id="cancel" class="button button-clear" ic-get-from="/${room.name}/task/full" ic-target="#task-edit-form" ic-replace-target="true">cancel</a>
  </form>
  <script>
    const textarea = document.querySelector('textarea')
    const cancel = document.querySelector('#cancel')
    const save = document.querySelector('#save')
    var ctrlDown = false

    textarea.onkeydown = (e) => {
      if (e.key === 'Control') return ctrlDown = true
    }

    textarea.onkeyup = (e) => {
      if (e.key === 'Escape') return cancel.click()
      if (e.key === 'Control') return ctrlDown = false
      if (e.key === 'Enter' && ctrlDown) return save.click()
    }
  </script>
`