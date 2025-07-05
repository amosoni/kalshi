# CursorRules: Team Development Guidelines

## Code Style
- Use TypeScript for frontend, TypeScript/Python for backend
- Enforce Prettier formatting and ESLint checks
- Modular, reusable UI components
- API calls should be wrapped for easy switching/upgrading
- Manage secrets via environment variables, never hardcode keys

## Branching Strategy
- `main`: production branch
- `dev`: development branch
- `feature/xxx`: feature branches
- `bugfix/xxx`: bugfix branches

## Commit Messages
- Use semantic commit messages (e.g., feat: add matting, fix: subtitle alignment)
- All PRs require at least one code review

## Documentation & Comments
- Key modules/functions must have English comments
- Major business logic should be documented with diagrams (flowcharts, sequence diagrams)
- Update README and API docs with every major change

## Security & Compliance
- Never upload or store user private data without consent
- Clearly communicate API usage costs and user quotas
- Ensure copyright compliance for all content and AI models

## Collaboration
- Use GitHub Issues/Discussions for task tracking
- Encourage clear, asynchronous communication
- Maintain a changelog for all releases
