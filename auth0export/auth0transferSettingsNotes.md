https://chatgpt.com/share/68790116-2e94-8001-ad91-a34a1a4bda31

1. Установить официальную утилиту для переноса.

yarn global add auth0-deploy-cli

2. Если на windows -- может быть, убедиться, что прописалась в PATH

3. В своём тенанте создать Matchine to Machine приложение; из него скопировать данные

{
"AUTH0_DOMAIN": "dev-yourtenant.eu.auth0.com",
"AUTH0_CLIENT_ID": "ваш-client-id",
"AUTH0_CLIENT_SECRET": "ваш-client-secret",
"AUTH0_KEYWORD_REPLACE_MAPPINGS": {},
"AUTH0_ALLOW_DELETE": true
}

4. Импортировать в свой тенант. Должны будут создаться новые приложения, в том числе M2M; из него взять AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN и подставить в .env своей ветки; туда же прописать аналогичные данные из spa -- если его для логина использовать.

(команда для импорта)
a0deploy import -c .\auth0export\config-target.json -i .\auth0export\auth0exportData\

(заодно команда для экспорта

a0deploy export -c .\auth0export\config-source.json -f directory -o .\auth0export\auth0exportData\

)
