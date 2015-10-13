sudo apt-get install git debconf-utils -y
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
export PATH=$PATH:/home/ubuntu/depot_tools
echo 'export PATH=$PATH:/home/ubuntu/depot_tools' >> ~/.bashrc
fetch --nohooks --no-history chromium
echo 'ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true' | sudo debconf-set-selections
echo 'deb http://us.archive.ubuntu.com/ubuntu/ trusty multiverse' | sudo tee -a /etc/apt/sources.list 
echo 'deb-src http://us.archive.ubuntu.com/ubuntu/ trusty multiverse' | sudo tee -a /etc/apt/sources.list
echo 'deb http://us.archive.ubuntu.com/ubuntu/ trusty-updates multiverse' | sudo tee -a /etc/apt/sources.list
echo 'deb-src http://us.archive.ubuntu.com/ubuntu/ trusty-updates multiverse' | sudo tee -a /etc/apt/sources.list
cd src 
sudo ./build/install-build-deps.sh --no-prompt
gclient runhooks
sudo pkill -f icecc
sudo iceccd -u ubuntu -vvv -s $ICECC_IP -n $ICECC_NAME -d