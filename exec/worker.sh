sudo iceccd -u ubuntu -n {NAME} -s {IP} -vv -d
echo 'export ICECC_IP={IP}' | sudo tee -a ~/.bashrc
echo 'export ICECC_NAME={NAME}' | sudo tee -a ~/.bashrc