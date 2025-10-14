from node:alpine as development 

workdir usr/src/app

copy package.json ./
copy package-lock.json ./

run npm install 

copy . .

run npm run build

from node:alpine as production 

workdir usr/src/app

copy package.json ./
copy package-lock.json ./

run npm install --only=production

copy --from=development /usr/src/app/dist ./dist

cmd["node", "dist/apps/reservation/main"]