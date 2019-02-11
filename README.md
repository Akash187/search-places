# Search Places
---
A VueJS project that shows nearby places such as park, museum and etc in a city using Google Maps API and FourSquare API.

## Project Purpose:

The purpose of project to practise my vuejs skill and integrating google MAPs in vuejs project. I have also used FourSquare Places API.

## How to Load the App

You can run a hosted version of the app at [https://search-places.netlify.com/](https://search-places.netlify.com/)

The project uses Node.js and the vue cli 3. If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/Akash187/search-places.git
yarn install
```

Once all of the dependencies have been installed you have to create a .env file in root of folder and store few api keys that you have to get from 'Google Javascript Map API' and FourSquare API

```
VUE_APP_GOOGLE_MAPS_API_KEY=AIzaSyASfUwD_3KGri5DHxxxxxxxxxxxxRL5Xejs
VUE_APP_CLIENT_ID=5NIRKNO5FB5EZ2xxxxxxxxxxxxxSYTX55ZT3RXVD2M
VUE_APP_CLIENT_SECRET=HO1MJ3KZQT4A1ELXxxxxxxxxxxxx4MUKDBBXYCUOZVOTA
VUE_APP_VERSION_DATE=20180210
```

After setting up .env file you can run project by below command

```
yarn serve
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:8080/](http://localhost:8080/) in your browser