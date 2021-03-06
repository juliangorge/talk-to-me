SECRET=`cat ./config/secrets/.secret`
CONFIG_FILE=./config/default.json

VALUE_TO_REPLACE=":secret"
if [ -z $REVERT ]; then
  REVERT='FALSE'
else
  REVERT=$REVERT
fi

if [ "$REVERT" == 'FALSE' ]; then
  echo " sed -i '' -e 's/'$VALUE_TO_REPLACE'/'$SECRET'/g' $CONFIG_FILE"
  sed -i '' -e 's/'$VALUE_TO_REPLACE'/'$SECRET'/g' $CONFIG_FILE
else
  echo " sed -i '' -e 's/'$SECRET'/'$VALUE_TO_REPLACE'/g' $CONFIG_FILE"
  sed -i '' -e 's/'$SECRET'/'$VALUE_TO_REPLACE'/g' $CONFIG_FILE
fi
