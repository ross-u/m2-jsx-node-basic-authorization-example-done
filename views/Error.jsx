const React = require("react");
const Layout = require("./Layout");

function Error(props) {
  return (
    <Layout title="Error">
      <h1>Error</h1>
      <p>{props.error}</p>
    </Layout>
  );
}

module.exports = Error;
