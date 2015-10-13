echo 'export ICECC_IP={IP}' | sudo tee -a ~/.bashrc
echo 'export ICECC_NAME={NAME}' | sudo tee -a ~/.bashrc
sudo iceccd -u ubuntu -n {NAME} -s {IP} -vv -d