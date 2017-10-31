module.exports = (rooms) => `
  <table ic-get-from="/room/list" ic-trigger-on="sse:update:room:list" ic-replace-target="true">
    <thead>
      <tr>
        <th>Name</th>
        <th>Users</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${
        rooms.map(({ name, clients }) => `
          <tr>
            <td>${name}</td>
            <td>${clients.length}</td>
            <td style="text-align: center"><a class="button" href="/${name}">Join</a></td>
          </tr>
        `).join('')
      }
    </tbody>
  </table>
`