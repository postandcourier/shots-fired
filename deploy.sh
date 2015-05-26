echo "Pulling latest revisions for Github..."
git pull origin master
echo "Building Meteor..."
meteor build --directory /var/www/shots-fired-prod/
pushd /var/www/shots-fired-prod/bundle/programs/server/
echo "Installing necessary node modules..."
npm install
echo "Restarting service..."
service shotsfired restart