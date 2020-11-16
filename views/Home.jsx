const React = require("react");
const Layout = require("./Layout");

function Home() {
  return (
    <Layout title="Home Page">
      <h1>Home Page</h1>
      <a href="/auth/signup">
        <button> SIGN UP </button>
      </a>
    </Layout>
  );
}

module.exports = Home;
