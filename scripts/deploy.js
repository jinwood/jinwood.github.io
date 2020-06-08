const ghpages = require("gh-pages");

ghpages.publish(
  "public",
  {
    branch: "master",
    repo: "git@github.com:jinwood/jinwood.github.io.git",
  },
  () => {
    console.log("deploy complete");
  }
);
