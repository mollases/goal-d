BASEDIR=$(dirname "$0")

npm run build
for filename in ${BASEDIR}/../public/*; do
  aws s3 cp $filename s3://goald --acl public-read
done
