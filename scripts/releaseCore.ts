import fs from "fs";
import { resolve } from "path";
import { runCommand } from "./common";

const grapesJSReactPath = resolve(__dirname, "../packages/grapesjs-react");

async function prepareReleaseGrapesJSReact() {
  try {
    const releaseTag = process.argv[2] || "rc";
    console.log("Prepare release GrapesJS tag:", releaseTag);

    runCommand(
      "git diff-index --quiet HEAD --",
      "You have uncommitted changes. Please commit or stash them before running the release script."
    );

    const versionCmd =
      releaseTag === "latest"
        ? "--patch"
        : `--prerelease --preid ${releaseTag}`;
    runCommand(
      `yarn workspace @grapesjs/react version ${versionCmd} --no-git-tag-version --no-commit-hooks`
    );

    // Create a new release branch
    const newVersion = JSON.parse(
      fs.readFileSync(`${grapesJSReactPath}/package.json`, "utf8")
    ).version;
    const newBranch = `release-v${newVersion}`;
    runCommand(`git checkout -b ${newBranch}`);
    runCommand("git add .");
    runCommand(
      `git commit -m "Release GrapesJS React ${releaseTag}: v${newVersion}"`
    );

    console.log(
      `Release prepared! Push the current "${newBranch}" branch and open a new PR targeting 'dev'`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

prepareReleaseGrapesJSReact();
