
There are two project in this repository, root project is the Ionic React mobile app and the second one is the Xcode project to run the mobile app as an iOS application.

1) Run the mobile web app (Vite + React):
Install the depedencies at root level same as the package json.
From terminal run: 
npm run dev

More info about ionic projects: https://ionicframework.com/docs/intro/cli

2) Run the Xcode Project (Capacitor iOS Project):
From terminal run:
npx cap sync
npx cap run ios

You may need to install ruby and do a pod install to install since the project uses cocoapods.
More infor about Capacitor projects: https://capacitorjs.com/docs/basics/workflow#sync-your-project
