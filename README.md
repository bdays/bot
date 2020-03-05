
![logo]

# DOCKER

Для того чтобы запустить приложение, используя **docker** нужно:

1) Создать файл .env и внести в него нужные переменные 

- Нельзя указывать переменные:

- `SLACK_EVENT_SERVER_PORT`

2) Настроить файл Caddyfile (для https и настройки LetsEncrypt):

- заменить `#domain#` на ваш домен

- заменить `#email#` на ваш email

3) Выполнить команды:

- `docker build -t exceedteam_bot .`

- `docker-compose up -d`


# Получить токен Slack

https://api.slack.com/apps/{Your APP ID}/oauth

# ENV

`WEATHER_INTERVAL` - Частота обновления погоды в минутах (default: 15)

`WEATHER_API_TOKEN` - Токен API к сервису openweathermap.org (default: b6907d289e10d714a6e88b30761fae22)

`SLACK_DB` - База данных для Slack (default: sqlite:./dbs/slack_database.db)

`APP_DB` - База данных для приложения (default: sqlite:./dbs/app_database.db)

`SLACK_API_TOKEN` - токен Slack

`SLACK_EVENT_SERVER_PORT` - порт Event Server Slack (default: 3003)

`SLACK_EVENT_SERVER_SECRET` - cекретный ключ (добавляется в QUERY ?secret={SLACK_EVENT_SERVER_SECRET}) (default: super_secret)

# SLACK

## Slash path:

`/slack/slash/ventillation?secret={SLACK_EVENT_SERVER_SECRET}` - command /ventillation

`/slack/slash/admins?secret={SLACK_EVENT_SERVER_SECRET}` - command /admins

`/slack/slash/settings?secret={SLACK_EVENT_SERVER_SECRET}` - command /settings

`/slack/events?secret={SLACK_EVENT_SERVER_SECRET}` - Events URL

`/slack/interactive?secret={SLACK_EVENT_SERVER_SECRET}` - Interactive URL

# Установка


## Добавить Slash команды в панели управления

### /ventilation

Request URL - https?: //{YOUR DOMAIN}/slack/slash/ventillation?secret=super_secret

Short Description - Ventilation Schedule

Usage Hint - [schedule, add, delete]

### /settings

Request URL - https?: //{YOUR DOMAIN}/slack/slash/settings?secret=super_secret

Short Description - Settings

Usage Hint - [weather admin]

Добавить URL https?: //{YOUR DOMAIN}/slack/interactive?secret=super_secret на странице с настройками интерактивных компонентов

## После добавления бота в Slack необходимо добавить его в канал, в котором он должен работать


[logo]: botImage.png 'Bot Logo'
