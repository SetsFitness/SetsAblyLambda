zip -X -r server.zip *
aws lambda update-function-code --function-name VastusAblyLambdaFunction --zip-file fileb://server.zip
rm server.zip
