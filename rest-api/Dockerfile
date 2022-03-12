FROM node:16.13-alpine
WORKDIR "/usr/src/app"
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13-alpine
WORKDIR "/usr/src/app"
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist /usr/src/app
COPY --from=0 /usr/src/app/prisma/schema.prisma /usr/src/app/prisma/schema.prisma
COPY --from=0 /usr/src/app/prisma/migrations /usr/src/app/prisma/migrations

CMD ["npm","run","prod"]

