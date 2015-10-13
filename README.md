# icecloud

Launch a compute cluster running [`icecream`](https://github.com/icecc/icecream) for distributed compilation. Provides a simple CLI for launching and managing the compilation cluster, built on [`tinycloud`](https://github.com/freeman-lab/tinycloud) and [`clicloud`](https://github.com/freeman-lab/clicloud).

*Note*: This module launches clusters, which can cost real money. It is also still under development. Carefully monitor your usage!

[mascot](http://warriors.wikia.com/wiki/icecloud)

## install

Install as a CLI with

```
npm install icecloud -g
```

## usage

To launch the cluster run

```
icecloud launch beast -k mykey -n 5
```

where `beast` is a name for your cluster, `-k` specifies the name of your key pair, and `-n` specifies the number of worker nodes. After a few minutes, run the setup using

```
icecloud setup beast -i mykey.pem
```

where `-i` specifies the location of your key pair file. If you get an error during `setup` saying `timed out` or `ECONNREFUSED`, just wait a few minutes and try again. This happens because instances take a variable amount of time to become ssh-ready.

Finally, login to the `master` node to run jobs

```
icecloud login beast master -i mykey.pem
```

Once on the `master`, setup whatever build environment you want that supports distributed compilation. When you start the build, it will use your cluster to complete tasks. See the example use case below for how to use this cluster to build Chrome.

## example use case

One likely use case is performing distributed builds of Chrome. This is what the biggies do, and now you can do it too! 

First launch your cluster, the `m3.large` instance type is recommended, as well as a large root volume (50gb should be enough)

```
icecloud launch chromeo -k mykey -n 5 -t m3.large -s 50
```

Run the `icecc` setup (as described above)

```
icecloud setup chromeo -i mykey.pem 
```

Now you need to set up the Chromium dev environment. This part has nothing to do with `icecream` or `icecloud`, but we made a sample script as an example if you want to try it out. Login to the `master` node

```
icecloud login chromeo master -i mykey.pem
```

then run the environment setup script (this will take ~30 min)

```
curl https://raw.githubusercontent.com/freeman-lab/icecloud/master/examples/chrome.sh >> chrome.sh
bash chrome.sh
```

Finally, start your distributed build

```
cd src
source ~/.bashrc
ninja -j 10 -C out/Release chrome
```

## monitoring

The `scheduler` includes a monitoring tool. To connect to it, get the public IP of the `scheduler` using

```
icecloud list chromeo scheduler -i mykey.pem
```

Then `ssh` into the scheduler with X11 forwarding

```
ssh -i mykey.pem -X ubuntu@IP
```

And finally start the monitor

```
icemon -n $ICECC_NAME
```
