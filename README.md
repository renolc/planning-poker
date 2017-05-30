# planning-poker

Planning poker web app.

## Features

- multiple, independent rooms can vote in parallel
- real-time voting (via SSE -- no websockets required)
- basic interface with no clutter or cruft
- automatic room teardown when no users present

## Screenshots

![room list](/images/room-list.png)
![room view](/images/room.png)
![score](/images/score.png)

## Usage

You can create a new room from the room list view. Alternatively, just visit any room name directly in the URL (ie, if you want to make a room named `Red`, just goto `poker-app.url/Red`). This allows you to bookmark common rooms even if it's not currently active (and thus not listed on in the room list).

The top right text in the room view will let you know how many other people are there with you.

To add a task to vote on, click the blockquote near the top of the page to enable edit mode. Once you are done, click Save to present the task to everyone in the room.

Anyone in the room can edit the current task by clicking on the blockquote.

While editing the task, you may cancel by pressing ESC or save by pressing Ctrl + Enter.

a name must be present to vote. The name you typed in is saved to `localStorage`, so your browser will remember your name the next time you use the poker app.

To vote, select one of the fibonacci numbers and click Submit.

To reset all votes, edit the current task and click Save. All task edits, even if the task content doesn't actually change, will reset all votes.

The app will automatically remove the room from the list once everyone has abandoned it.

## Tech

- Node server
- Express API
- sse-node real-time connections/messaging
- Intercooler client-side interactions with API