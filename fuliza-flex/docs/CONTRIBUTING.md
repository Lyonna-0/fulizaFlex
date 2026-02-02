# Contributing Guide

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/Lyonna-0/fulizaFlex.git
cd fuliza-flex
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Follow the [Development Guide](./DEVELOPMENT.md) for code standards.

### 4. Test Your Changes

```bash
# Frontend
cd frontend
npm run lint
npm run build

# Backend
cd backend
npm run lint
npm test
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: Describe your changes"
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub repository
- Click "New Pull Request"
- Compare your branch with `main`
- Add description of changes
- Request review

## Code Review Process

- Maintainers will review your PR
- Address feedback and update your branch
- After approval, your PR will be merged

## Reporting Issues

1. Check existing issues first
2. Create new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - System info (OS, Node version, etc.)

## Feature Requests

Suggest features by creating an issue with the "enhancement" label:

- Describe the feature
- Explain the use case
- Suggest implementation approach (optional)

## Questions or Discussions

- Use GitHub Discussions
- Ask in the community
- Review existing documentation

## License

By contributing, you agree your code is licensed under MIT.
