echo 'export ICECC_IP={IP}' | sudo tee -a ~/.bashrc
echo 'export ICECC_NAME={NAME}' | sudo tee -a ~/.bashrc
sudo icecc-scheduler -u ubuntu -n {NAME} -vv -d