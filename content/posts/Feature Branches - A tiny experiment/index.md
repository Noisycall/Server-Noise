+++
title = "Feature Branches - a Tiny Experiment"
date = "2026-05-24T18:05:31+05:30"
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
author = "Noisycall"
cover = ""
tags = ["engineering"]
keywords = ["engineering", "branches", "git"]
description = ""
showFullContent = false
readingTime = false
hideComments = false
+++
At my current workplace (at the time of writing), we have what could be best described as the classic "trunk based" development pattern.

A branch called main, with release branches cut off from it at arbitrary points. Work merged in whenever it was ready. You get the idea, but if not, [this seems to be a good illustration](https://trunkbaseddevelopment.com/)

This works pretty well and is ultimately what will continue to be used by us for days to come. However, I had a specific set of problems with this method, that I aimed to solve using pretty specific approach, that builds on top of trunks, and is the namesake of this post.

## Problems Faced
Before I get into the feature branch itself, it is worth highlighting the points that I aimed to resolve.
1. Making a release branch was a tricky process, especially if changes were in main that were not ready to be released (this may seem strange on the face of it, but will become clearer later).
2. Multiple people changing the same code made life harder for both the PR maker and the reviewers, as there were often conflicts to resolve.
3. Integration Tests lived outside the main codebase, and often one set of changes in the application + tests would break the tests for a different change
    - Change A + Tests A == Works ✅
    - Change B + Tests B == Works ✅
    - Change B + Tests A+B == Nope ❌
4. A change would have multiple tickets, and thus PRs associated with it. A PR being merged in main did NOT mean the change was ready to test using manual & automated regression.
5. Changes that are waiting for external dependencies still need to be worked on and built upon
## Enter Feature Branches
A kind of short term/easy fix for the problem in my mind was "feature branches". It would work as follows
![Feature Branch](Feature%20Branch.png)
1. A new branch would be created from main like `feat/my-epic-feature`
    1. This would not be associated with a small ticket directly, but with the epic/initiative, or perhaps with just a big feature ticket.
2. A new branch would be made from this one like `TKT-1234`
    1. This is the actual ticket being worked upon
3. Once this ticket was ready, we would open a PR to `feat/my-epic-feature`
4. Anyone could review and approve this ticket (we need 2 approvals to reach main, so 2 are needed for this as well)
5. You would continue building your feature on top of your existing branch (`TKT-1234`) for a different ticket, for example `TKT-1235`
6. You would open a PR to `feat/my-epic-feature` when you were done working on `TKT-1235`.
7. It would be reviewed.
8. Repeat for as many tickets as the feature needed.
9. Rubber stamp approval on `feat/my-epic-feature` when it was time to merge it to main.
   While the above was happening, you could continue working smaller features into main, releasing it etc.
### How it was meant to solve our problems
1. By keeping the un-releasable change out of main, we ensured that it was trivial to make a release build.
2. Multiple people could work at different paces, with the person making the bigger changes baring the brunt of the out reconciliation efforts.
3. We have the capability to run tests against a specific branch, thus it meant that we could have an equivalent.`feat/my-epic-feature-integration-tests` branch in our external testing repo
    1. The API tests could also use a similar approach of branch, thus each individual test PR could be associated with a ticket PR
    2. Anyone working on a smaller change could get it merged in much more easily
4. It kept the feature in its own playground, and since we could have multiple branches/different branches in the dev environment at any given point. It didn't impact the developer too much
5. We could wait till an external dependency was merged/released/updated before merging the release branch
### It didn't work :/
To put it bluntly, it didn't work. In the process of failing, however, it helped quantify previously identified issues we had in our workflows.
1. We weren't using squash and merge. This might be obvious to some, but it was probably the single biggest improvement to our git history, and made cherry-picking for releases easier.
2. We didn't have good release branch automation. We were so dependent on main being releasable. We could however, just set up an automation workflow to release from any branch, and that made life easier.
3. Reviews! I think the biggest hurdle to velocity will always be reviews (and I am glad for that). Careful considered reviews are probably the most valuable thing a team can have
    1. We had a 2 review requirement for anything going to main, feature branches added an additional review cycle (the rubber stamp) to get something to main.
    2. Anytime the feature branch went out of sync with main and needed to be reconciled (either by merging or rebasing), it required another set of reviews to fix (since the feature branch was a protected branch).
    3. Not wasting team members' time on frivolous reviews was critical.
4. Reconciling the feature branch was more error-prone (and in-fact introduced a regression we discovered later).
5. Since API tests could be run against a branch, the case for [point 3](#how-it-was-meant-to-solve-our-problems) was dramatically weakened.
## Conclusion
This was a tiny experiment in moving the needle in my team towards finding a more optimal GitHub workflow. Even if the branches themselves didn't work, it shed a closer light on some of the underlying issues. We didn't lose much time on this either since we only did it a few times.

I encourage you, dear reader, to try some tiny experiments at work yourself. Maybe you'll find something that sticks.