const React = require("react");

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title> {props.title ? props.title : "No Title"} </title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <body>
        <nav>
          <div>
            <img src="https://i.imgur.com/RP5vFgT.png" width="100px" alt="" />
            <p>User's name</p>
          </div>
          <ul>
            <li>
              <a href="/auth/signup">Signup</a>
            </li>
            <li>
              <a href="/auth/login">Login</a>
            </li>
          </ul>
        </nav>

        {props.children}
      </body>
    </html>
  );
}

module.exports = Layout;
