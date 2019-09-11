if [[ "$TRAVIS_BRANCH" == 'dev' && "$TRAVIS_PULL_REQUEST" == 'false'  ]];
then
  aws s3 cp s3://thyart-ops/env/frontend/staging/.env .env

elif [[ "$TRAVIS_BRANCH" == 'master' && "$TRAVIS_PULL_REQUEST" == 'false'  ]];
then
  aws s3 cp s3://thyart-ops/env/frontend/production/.env .env
fi
