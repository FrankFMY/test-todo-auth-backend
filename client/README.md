# Todo App (Frontend)

## Основные возможности

-   Современный UI, адаптивность, поддержка темной темы
-   Всплывающие уведомления (toast) для ошибок и успеха
-   CRUD для задач, авторизация, регистрация
-   Переключатель темы, плавные анимации
-   Inline-редактирование задач прямо в списке
-   Мгновенная валидация форм (email, пароль, заголовок задачи)
-   Кнопка показать/скрыть пароль (PasswordInput)
-   Покрытие тестами новых компонентов и хуков (тесты лежат рядом с компонентами, видны для CI/CD)

## UX форм и валидация

-   Все поля форм валидируются на лету с подсказками (email, пароль, заголовок задачи).
-   Для пароля используется компонент PasswordInput с возможностью показать/скрыть символы.
-   Для управления состоянием и валидацией используется хук useFormField.

**Пример PasswordInput:**

```
<PasswordInput value={password} onChange={...} placeholder="Пароль" />
```

**Пример useFormField:**

```
const email = useFormField('', [emailValidator]);
<Input value={email.value} onChange={email.onChange} onBlur={email.onBlur} />
```

## Редактирование задач

-   Для каждой задачи доступна кнопка "Редактировать".
-   Редактирование происходит прямо в списке (inline), без перехода на отдельную страницу.
-   Валидация: нельзя сохранить пустой заголовок.
-   После успешного редактирования появляется уведомление.

**Пример:**

```
<...>
<Button onClick={() => setEditingId(todo._id)}>Редактировать</Button>
{editingId === todo._id && (
  <TaskEditForm ... />
)}
```

## Уведомления (Toast)

-   При успешных и ошибочных действиях (создание, удаление, обновление задач) появляются всплывающие уведомления в правом верхнем углу.
-   Уведомления автоматически исчезают через 3 секунды или могут быть закрыты вручную.
-   Поддерживаются типы: успех (зелёный), ошибка (красный), инфо (синий).

**Пример:**

```
showToast('Задача добавлена', 'success');
showToast('Ошибка удаления', 'error');
```

## Тестирование

-   Все новые компоненты и хуки покрыты юнит-тестами (Jest + React Testing Library).
-   Тесты лежат рядом с компонентами (например, src/components/TaskEditForm.test.tsx) и автоматически подхватываются CI/CD.
-   Для запуска тестов:

```
npm run test
```

## Скриншоты

-   ![Светлая тема](./public/screenshot-light.png)
-   ![Тёмная тема](./public/screenshot-dark.png)

## Как запустить

```
cd client
npm install
npm start
```

## TODO

-   Улучшение UX форм (дополнительные подсказки, маски)
-   Профиль пользователя
-   E2E тесты

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

