Use this as your standard Git workflow for every future change.

**Recommended Flow (safe and clean)**  
`main` = production/live  
`develop` = integration branch  
`feature/*` = your work branch for each change

1. Start from latest `develop`
```powershell
git switch develop
git pull origin develop
```

2. Create a new feature branch
```powershell
git switch -c feature/update-experience-section
```

3. Make code changes, then check status
```powershell
git status
```

4. Stage files
```powershell
git add experience.html
```
(or `git add .` if multiple files)

5. Commit with a clear message
```powershell
git commit -m "Update experience section content"
```

6. Push feature branch to GitHub
```powershell
git push -u origin feature/update-experience-section
```

7. Open GitHub Pull Request
- Base: `develop`
- Compare: `feature/update-experience-section`
- Create PR and merge

8. Keep local branches updated after merge
```powershell
git switch develop
git pull origin develop
```

9. When ready to release to `main`
- Create PR: `develop` -> `main` on GitHub  
- Merge PR  
- Sync local:
```powershell
git switch main
git pull origin main
```

---

**If you want quick workflow without feature branch**
```powershell
git switch develop
git pull origin develop
# make changes
git add .
git commit -m "Your message"
git push origin develop
```
Then PR `develop` -> `main`.

---

**Useful everyday commands**
```powershell
git status                      # what changed
git branch --show-current       # current branch
git log --oneline --graph -n 10 # recent commits
git diff                        # unstaged changes
git diff --staged               # staged changes
```

---

**If push is rejected (branch updated by others)**
```powershell
git pull --rebase origin develop
git push origin develop
```

If conflicts appear, fix files, then:
```powershell
git add .
git rebase --continue
git push origin develop
```



# Recommended Git Workflow (Safe and Clean)

## Branching strategy
- Keep `main` as production and `develop` as the integration branch.
- Create a short-lived feature branch per change (`feature/your-topic`).

## Daily work
```powershell
git switch develop
git pull origin develop
git switch -c feature/xyz
# edit files
git status
git add experience.html
git commit -m "Describe the change"
git push -u origin feature/xyz