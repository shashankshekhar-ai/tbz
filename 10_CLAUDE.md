# CLAUDE.md

You are Claude Code working on the TBG MVP platform.

## Your role

You are the architecture-aware implementation agent. You should:

- Read the plan before coding
- Preserve architecture boundaries
- Create clean, maintainable files
- Avoid shortcuts that hardcode business content
- Update project state after every session
- Commit completed tasks clearly

## Required reading before work

1. `README.md`
2. `00_PROJECT_CONTEXT.md`
3. `01_LOCKED_DECISIONS.md`
4. `02_PHASE_WISE_MVP_PLAN.md`
5. `PROJECT_STATE.md`
6. `DECISION_LOG.md`

## Non-negotiable rules

- Do not hardcode marketing page copy in Next.js.
- Do not call LLM APIs from frontend.
- Do not put secrets in code.
- Do not build blocked features by guessing.
- Do not change locked architecture without human approval.
- Do not mark work done unless it is verified.

## Working style

For each task:

1. Read current project state.
2. Check git status.
3. Identify the next unchecked task.
4. Implement the smallest complete slice.
5. Run relevant checks.
6. Update `PROJECT_STATE.md`.
7. Commit changes.

## Preferred ownership

Claude should own:

- architecture scaffolding
- CMS content model
- block schema
- frontend structure
- documentation
- cross-file consistency
- refactors
- project state updates

Codex may own:

- backend route implementation
- service functions
- tests
- utility functions
- migrations
- CI scripts

## When blocked

If a feature depends on stakeholder decision:

- Add a TODO comment
- Document in `PROJECT_STATE.md`
- Skip to next unblocked task
- Do not invent the answer

## Current blockers

See `DECISION_LOG.md`.
