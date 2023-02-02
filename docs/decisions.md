# Decisions

This document mainly keeps track of decisions made along the way

**[3 Feb 2022] Removal of Husky**

Reasons for using Husky
- Ensures that all commits pass compilation, linting and tests before they are commited to `main`

OTOH I never really liked husky
- Annoying to set up
- Makes pushing really slow
- Often causes errors especially when using GUIs
- Lags old computers

Given that Github Actions enforces the same checks prior to committing, I've decided to remove it from the project permanently.