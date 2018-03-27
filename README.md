# Cloud Functions

This repo contains functions for Firebase endpoints. Includes Slack interactions, too. 

## Objectives

* CRUDr

  * Create content
  * Read content
  * Update (append) data
  * Delete (obfuscate) data
  * relate data

* SXAN Client Protocol

* Offline considerations


## Contributer Workflow

### Setup

1. Create a fork https://github.com/sxan-experience/sxan-cloud#fork-destination-box
2. Clone repo in terminal with `git clone https://github.com/sxan-experience/sxan-cloud.git`
3. (Once) Add 'upstream' repo to list of remotes with `git remote add upstream https://github.com/`[insert your username here]`/sxan-mobile.git`
4. (Once) Verify the new remote named 'upstream' with `git remote -v`
5. (Optional) Fetch upstream remote to sync your fork with master `git fetch upstream`
6. Checkout your master branch and merge upstream `git checkout master`

### Submitting Work
If a branch is already created, just checkout the branch for step 1 (the last git command)

1. Create a new branch `git checkout master && git branch `[descriptive name of branch, i.e. feature1]` && git checkout `[descriptive name of branch, i.e. feature1]
2. Hack to your heart's delight
3. Fetch upstream and merge `git fetch upstream && git checkout master
 && git merge upstream/master && git checkout `[[descriptive name of branch, i.e. feature1]` && git rebase master`
4. Click the pull request button to submit work.
