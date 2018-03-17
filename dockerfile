FROM node
COPY package.json /scraper-data-api/
COPY package-lock.json /scraper-data-api/
COPY dist /scraper-data-api/dist
COPY bin /scraper-data-api/bin
RUN cd /scraper-data-api && npm install --production
ENV NODE_ENV=production
CMD [ "/scraper-data-api/bin/start.sh" ]
