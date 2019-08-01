if [[ "$TRAVIS_BRANCH" == 'dev' ]];
then
  aws s3 cp s3://thyart-ops/env/frontend/staging/.env .env

elif [[ "$TRAVIS_BRANCH" == 'master' ]];
then
  aws s3 cp s3://thyart-ops/env/frontend/production/.env .env
fi
