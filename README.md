# Chronicle for iPhone

React Native / Expo app with bundled Cairo artwork, Journey / Explore / Journal tabs, six-stage decision episode, budget allocation, quiz feedback, historical debrief, three city stories and local saved progress. No accounts, tracking, external API keys or signup backend are required. Only reading-source links need internet access.

## Run on a physical iPhone

1. Install dependencies with `npm install`.
2. Run `npx expo start` from this directory.
3. Follow Expo's device instructions and open the project with a compatible Expo Go version. Keep the computer and phone on the same network. Expo may require both clients to use the same Expo account.

See https://docs.expo.dev/get-started/start-developing/ for current device setup and https://expo.dev/go for SDK compatibility.

## App builds

This is an app source project, not a signed IPA or App Store submission. `npx expo export --platform ios` validates and exports the JavaScript/assets; it does not produce an installable iPhone binary. A development or distribution build requires Apple signing and either a Mac/Xcode setup or a configured Expo EAS build account. The bundle identifier is a placeholder and must be changed to one you control before signing. No developer account or paid build has been created.

## Verification

`npx tsc --noEmit` checks TypeScript. `npx expo export --platform ios` checks iOS asset bundling. Actual iPhone/simulator appearance, accessibility, persistence and gestures still require device testing.

## Content limits

Uses the existing generated concept artwork with cross-fade scene transitions, rather than full character video. Cairo's dates and broad context cite Egypt's Ministry of Tourism and Antiquities, the Ashmolean Museum and The Metropolitan Museum of Art. Adviser roles, budgets and consequences are fictional. Arabic primary-source research and specialist review remain needed.

## GitHub Pages preview

Published app: https://eldar0904.github.io/chronicle-history/

Run npm run build:web to export the browser version and prepare its PWA manifest and offline cache. The GitHub Actions Pages workflow publishes main automatically. On iPhone, open the site in Safari, use Share, then Add to Home Screen. The initial visit requires internet; offline use is available once all assets finish caching. Progress is stored in this browser, separately from the native Expo app. This is a browser preview, not a signed native app.

