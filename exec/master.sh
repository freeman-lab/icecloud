echo 'export ICECC_IP={IP}' | sudo tee -a ~/.bashrc
echo 'export ICECC_NAME={NAME}' | sudo tee -a ~/.bashrc
echo 'export PATH="/usr/lib/icecc/bin:$PATH"' | sudo tee -a ~/.bashrc
echo 'export GYP_DEFINES="$GYP_DEFINES clang=0 linux_use_debug_fission=0 linux_use_bundled_binutils=0"' | sudo tee -a ~/.bashrc
sudo iceccd -u ubuntu -n {NAME} -s {IP} -vv -d