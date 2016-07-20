#!/usr/bin/env bash

# Get root up in here
sudo su

# Just a simple way of checking if we need to install everything
if [ ! -d "/var/www" ]
then

    # Update and begin installing some utility tools
    apt-get -y update
    apt-get install -y python-software-properties
    apt-get install -y vim git subversion curl
    apt-get install -y memcached build-essential

    # Add nodejs repo
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Add nodejs repo
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Install nodejs
    apt-get install -y nodejs

    # Symlink our host www to the guest /var/www folder
    ln -s /vagrant/www /var/www

    #install grunt globally
    npm install -g grunt-cli

    #install gulp globally
    npm install -g gulp

    #install bower globally
    npm install -g bower

    cd /var/www/<%= srcdir %>

    #install NPM modules
    npm install

    #install BOWER components
    bower install --allow-root

    # Victory!
    echo "All done!"

fi