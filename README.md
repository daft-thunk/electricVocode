# VOCODE

### Voice-controlled Snippet Management

*This desktop application built with Electron using the [electron-react-boilerplate.](https://github.com/chentsulin/electron-react-boilerplate)*

### How to use

Users can call up a number of boilerplate snippets including:
  - React Components (both stateful and stateless)
  - Redux Store, Reducer
  - Express
  - Webpack
  - HTML
  - CSS

After login, a user can:
  - add other user snippets from the Discover page with (+). These snippets can be forked and edited in the Sandbox.
  - create new snippets which can be called up by voice from the Sandbox.
  - manage their snippets in the Snippets page.

Websites (github, stackoverflow, waffle) can be called up by voice. Homepages are shown by default. A user can add their screenname(s) via a Profile page.

### Speech Keywords (not limited to the following) * = Wildcard available

"Component*," "Stateless*," "Reducer*," "Store*," "Express," "Webpack," "HTML*," "CSS," "Github," "StackOverflow," "Waffle"

- \* A wildcard is the set of words following the keyword. Example: Say "component user profile" and the component will be named according to the wildcard "user profile."
- Speech is activated with the *global* shortcut 'Alt+Z' that can be used while *any* application is in focus.
- Commands are copied to your clipboard after being recognized for easy pasting in your current text file.


