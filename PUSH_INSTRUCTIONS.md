# Инструкции для пуша кода в GitHub

## На вашем Windows компьютере:

### 1. Откройте PowerShell или Command Prompt
```
cd "C:\Users\fnemo\Desktop\Buisness and Works\Online Travel Agency\ota-platform-poc"
```

### 2. Проверьте статус
```
git status
```

### 3. Пушьте в develop ветку
```
git push origin develop
```

### 4. Проверьте GitHub Actions
После пуша, GitHub Actions должен запуститься автоматически:
- Перейдите на https://github.com/daonlinetravelagency-code/ota-platform
- Откройте вкладку "Actions"
- Вы должны увидеть рабочий процесс "Deploy to Cloudflare (Develop)"

## Что происходит при пуше:

1. Workflow автоматически запускается на develop branch
2. Выполняются проверки: тип-чек, линтинг, сборка
3. Frontend деплоится на Cloudflare Pages (ota-platform-dev)
4. Backend деплоится на Cloudflare Workers
5. Сайт должен быть доступен на указанных URL'ах

## Если что-то не работает:

- Проверьте что у вас в GitHub репозитории настроены Secrets: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
- Убедитесь что вы пушите в правильную ветку (develop)
- Посмотрите логи в GitHub Actions для диагностики ошибок
