# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

https://www.balldontlie.io/api/v1/players	поиск игроков
https://www.balldontlie.io/api/v1/players?page=<AMOUNT>	поиск игроков (номер страницы)
https://www.balldontlie.io/api/v1/players?per_page=<AMOUNT>	поиск игроков (количество игроков на странице)
https://www.balldontlie.io/api/v1/players?search=<name>	поиск игрока по имени
https://www.balldontlie.io/api/v1/players/<ID>	поиск игрока по ID

Teams	
https://www.balldontlie.io/api/v1/teams	поиск всех команд (без статистики)
https://www.balldontlie.io/api/v1/teams?page=<AMOUNT>	поиск команд (номер страницы)
https://www.balldontlie.io/api/v1/teams?per_page=<AMOUNT>	поиск команд (количество команд на странице)
https://www.balldontlie.io/api/v1/teams/<ID>	поиск команды по ID

Games	
https://www.balldontlie.io/api/v1/games?dates[]=<YYYY-MM-DD>	запрос игр по дате
https://www.balldontlie.io/api/v1/games?postseason=<BOOLEAN>	запрос игре по плей-офф
https://www.balldontlie.io/api/v1/games?seasons[]=<YYYY>	запрос игр по сезону
https://www.balldontlie.io/api/v1/games?per_page=<AMOUNT>	поиск игр (количество игр на странице)
https://www.balldontlie.io/api/v1/games?team_ids[]=<ID>	запрос игр по команде
https://www.balldontlie.io/api/v1/games?start_date=<YYYY-MM-DD>	запрос игр по дате начала
https://www.balldontlie.io/api/v1/games?end_date=<YYYY-MM-DD>	запрос игр по дате конца
https://www.balldontlie.io/api/v1/games/<ID>	запрос игр по ID

stats	
https://www.balldontlie.io/api/v1/stats?page=<amount>	
https://www.balldontlie.io/api/v1/stats?per_page=<amount>	
https://www.balldontlie.io/api/v1/stats?dates[]=<YYYY-MM-DD>	
https://www.balldontlie.io/api/v1/stats?seasons[]=<YYYY>	
https://www.balldontlie.io/api/v1/stats?player_ids[]=<ID>	
https://www.balldontlie.io/api/v1/stats?game_ids[]=<ID>	
https://www.balldontlie.io/api/v1/stats?postseason=<BOOLEAN>	
https://www.balldontlie.io/api/v1/stats?start_date=<YYYY-MM-DD>	
https://www.balldontlie.io/api/v1/stats?end_date=<YYYY-MM-DD>	

Season Averages	
https://www.balldontlie.io/api/v1/season_averages?season=<YYYY>&player_ids[]=<ID>	