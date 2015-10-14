# Модуль для Рутокен плагин

Модуль позволяет узнать, возможна ли работа с плагином Рутокен и загрузить его.

Для работы с модулем в Internet Explorer необходимо воспользоваться polyfill, предоставляющим интерфейс ECMAScript Promise (например [es6-promise-polyfill](https://github.com/jakearchibald/es6-promise)).

## Установка

```sh
npm install rutoken
```

## Пример использования

```js
window.onload = function () {
    rutoken.ready.then(function () {
        if (window.chrome) {
            return rutoken.isExtensionInstalled();
        } else {
            return Promise.resolve(true);
        }
    }).then(function (result) {
        if (result) {
            return rutoken.isPluginInstalled();
        } else {
            throw "Rutoken Extension wasn't found";
        }
    }).then(function (result) {
        if (result) {
            return rutoken.loadPlugin();
        } else {
            throw "Rutoken Plugin wasn't found";
        }
    }).then(function (plugin) {
    	//Можно начинать работать с плагином

    	//Только для работы через старый интерфейс плагина
        return plugin.wrapWithOldInterface();
    }).then(function (wrappedPlugin) {
        //Можно начинать работать через старый интерфейс плагина
    }).then(undefined, function (reason) {
        console.log(reason);
    });
}
```

## API

### Свойства

* ready -> Promise

Свойство типа Promise. Оно будет разрешено, когда закончится инициализация модуля.

### Функции

Модуль содержит следующие функции:

* isExtensionInstalled() -> Promise(bool)

Функция позволяет узнать, установлено ли расширение для браузер Chrome. В зависимости от этого в браузере Chrome возвращенный promise будет разрешен со значением true(установлен)/false(не установлен).

* isPluginInstalled() -> Promise(bool)

Функция позволяет узнать, установлен ли Рутокен плагин. В зависимости от этого возвращенный promise разрешается значением true(установлен)/false(не установлен)

* loadPlugin() -> Promise(rutokenPlugin)

Функция позволяет загрузить Рутокен плагин. Возвращенный promise будет разрешен объектом плагина, готовым к использованию.

Кроме того, для совместимости с сайтами, использовавшими более ранние версии Рутокен плагина, модуль добавляет в плагин функцию:

* wrapWithOldInterface() -> Promise(rutokenPlugin)

Функция позволяет получить объект Рутокен плагина, с которым можно взаимодействовать через старый интерфейс, основанный на successCallback и errorCallback. Данная функция предназначена только для обеспечения совместимости, мы настоятельно рекомендуем использовать новый интерфейс с promise.

## Лицензия

Исходный код распространяется под лицензией Simplified BSD. См. файл LICENSE в корневой директории проекта.
