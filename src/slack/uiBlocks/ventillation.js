const utils = require('../../utils');
const db = require('../db');
const uiItems = require('../uiItems');

const typesNotification = { simple: 'Простое сообщение', here: '@here', channel: '@channel' };

const typesWeekDays = {
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  sunday: 'Вс',
};

function successAdded(weekDays, hours, minutes, duration, notification) {
  return [
    new uiItems.text.Markdown().setSection('*Проветривание успешно добавлено!*').get(),
    new uiItems.text.Markdown()
      .setSection(
        `${weekDays} в *${hours}:${minutes}* по GMT длительность: *${duration} минут*, окончание в *${utils.time.calcDuration(
          hours,
          minutes,
          duration,
        )}* по GMT - ${notification}`,
      )
      .get(),
  ];
}

function createList(records, isAdmin, channelId) {
  const blocks = [];
  records.forEach((item, i) => {
    const record = item.toJSON();

    const weekDays = [];

    {
      if (record.week_day_monday) weekDays.push('Пн');
      if (record.week_day_tuesday) weekDays.push('Вт');
      if (record.week_day_wednesday) weekDays.push('Ср');
      if (record.week_day_thursday) weekDays.push('Чт');
      if (record.week_day_friday) weekDays.push('Пт');
      if (record.week_day_saturday) weekDays.push('Сб');
      if (record.week_day_sunday) weekDays.push('Вс');
    }

    const data = new uiItems.text.Markdown()
      .setSection(
        `${utils.emoji.numberToEmoji(i + 1)} ${
          typesNotification[record.notification_type]
        } в *${utils.time.timeToString(record.time_hour)}:${utils.time.timeToString(
          record.time_minute,
        )}* продолжительность *${utils.time.timeToString(
          record.duration_minute,
        )}* минут, завершение *${utils.time.calcDuration(
          record.time_hour,
          record.time_minute,
          record.duration_minute,
        )}* по GMT - ${weekDays.join(', ')}`,
      )
      .get();

    if (isAdmin)
      data.accessory = {
        type: 'button',
        action_id: `remove_ventillation:${channelId}`,
        text: {
          type: 'plain_text',
          text: 'Удалить',
        },
        style: 'danger',
        value: `${JSON.stringify({ record_id: record.id })}`,
      };

    blocks.push(data);
    if (records.length - 1 !== i) {
      blocks.push(uiItems.divider());
    }
  });

  blocks.unshift({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: 'Время указано в GMT',
      },
    ],
  });

  return blocks;
}

function list(channelId, user_id) {
  const scheduleNotFound = [new uiItems.text.Markdown().setSection('*Расписание не найдено!*').get()];

  const scheduleList = (schedule) => {
    return [new uiItems.text.Markdown().setSection('*Расписание проветривания:*').get(), ...schedule];
  };

  return new Promise((resolve) => {
    db.ventillation
      .list(channelId)
      .then((records) => {
        db.admins
          .checkAccess(channelId, user_id)
          .then(() => {
            const schedule = createList(records, true, channelId);

            if (schedule && schedule.length > 1) resolve(scheduleList(schedule));
            resolve(scheduleNotFound);
          })
          .catch(() => {
            const schedule = createList(records, false, channelId);

            if (schedule && schedule.length > 1) resolve(scheduleList(schedule));
            resolve(scheduleNotFound);
          });
      })
      .catch(() => {
        resolve([new uiItems.text.Markdown().setSection('*Расписание не найдено!*').get()]);
      });
  });
}

function dublicateSchedule() {
  return [
    new uiItems.text.Markdown().setSection('*Ошибка добавления расписания!* Такое проветривание уже существует.').get(),
  ];
}

const days = [
  { label: 'Пн', value: 'monday' },
  { label: 'Вт', value: 'tuesday' },
  { label: 'Ср', value: 'wednesday' },
  { label: 'Чт', value: 'thursday' },
  { label: 'Пт', value: 'friday' },
  { label: 'Сб', value: 'saturday' },
  { label: 'Вс', value: 'sunday' },
];

const generateMock = (count, callback, startPosition = 0) => {
  const arr = [];
  for (let index = startPosition; index <= count; ++index) {
    arr.push(callback(index));
  }
  return arr;
};

const hours = generateMock(23, (index) => ({ label: utils.time.timeToString(index), value: `${index}` }));
const minutes = generateMock(11, (index) => ({ label: utils.time.timeToString(index * 5), value: `${index * 5}` }));
const durationMinutes = generateMock(
  12,
  (index) => ({ label: utils.time.timeToString(index * 5), value: `${index * 5}` }),
  1,
);

function addModal(channelId) {
  return uiItems.modal.create('Добавление проветривания', `modal-ventillation-add:${channelId}`, [
    new uiItems.text.Markdown().setContextList(['Указывайте время в GMT']).get(),
    new uiItems.actions.Input('multi_static_select')
      .setBlockId('weekDays')
      .setPlaceholder('Выберите дни недели')
      .setActionId('actionWeekDays')
      .setLabel('Дни недели')
      .setOptions(days)
      .get(),
    new uiItems.actions.Input('static_select')
      .setBlockId('timeHour')
      .setPlaceholder('Выберите час')
      .setActionId('actionTimeHour')
      .setLabel('Часы')
      .setOptions(hours)
      .get(),
    new uiItems.actions.Input('static_select')
      .setBlockId('timeMinute')
      .setPlaceholder('Выберите минуты')
      .setActionId('actionTimeMinute')
      .setLabel('Минуты')
      .setOptions(minutes)
      .get(),
    new uiItems.actions.Input('static_select')
      .setBlockId('durationMinute')
      .setPlaceholder('Выберите минуты')
      .setActionId('actionDurationMinute')
      .setLabel('Продолжительность')
      .setOptions(durationMinutes)
      .get(),
    new uiItems.actions.Input('static_select')
      .setBlockId('notification')
      .setPlaceholder('Выберите тип уведомления')
      .setActionId('actionNotification')
      .setLabel('Уведомление')
      .setOptions([
        { label: 'Простое сообщение', value: 'simple' },
        { label: '@here', value: 'here' },
        { label: '@channel', value: 'channel' },
      ])
      .get(),
  ]);
}

module.exports = { addModal, successAdded, dublicateSchedule, list, typesNotification, typesWeekDays };
