BASEDIR=$(dirname "$0")

for filename in ${BASEDIR}/../public/*; do
  aws s3 cp $filename s3://goald --acl public-read
done
