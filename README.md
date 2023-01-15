# Zoe's 20's-themed Birthday Party

This repo is a simple Remix app for a friend's 20's-themed birthday party.

Uses:

- Fly.io deployment with Docker.
- Github actions to automate deployment to Fly.
- A small, simple SQLite database.
- Prisma as an ORM.
- Email/password auth with cookie-based sessions.
- Tailwind for styling.
- TypeScript for static types.
- Cypress/Vitest plumbing for testing. None of this is currently used but was included in the template I used to start the project.

Users can login to the system, view redacted information about the roles in the murder mystery party, and select one role for themselves.

Once they've selected a role, they can download an unredacted copy of their character's description. Pretty simple to set up, and it upped the mystery of the party significantly!
