if [[ "$TRAVIS_BRANCH" == 'dev' && "$TRAVIS_PULL_REQUEST" == 'false'  ]];
then
  yarn build
  rsync -r --delete-after --quiet "$TRAVIS_BUILD_DIR"/build/* root@staging.thyart.fr:/var/www/thyart/
  ssh root@staging.thyart.fr chown -R www-data:www-data /var/www/thyart/

elif [[ "$TRAVIS_BRANCH" == 'master' && "$TRAVIS_PULL_REQUEST" == 'false' ]];
then
  yarn build
  rsync -r --delete-after --quiet "$TRAVIS_BUILD_DIR"/build/* root@www.thyart.fr:/var/www/thyart/
  ssh root@www.thyart.fr chown -R www-data:www-data /var/www/thyart/
fi