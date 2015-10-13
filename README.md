# icecloud

Launch a compute cluster running [`icecream`](https://github.com/icecc/icecream) for distributed compilation. Built on [`tinycloud`]() and [`clicloud`]().

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

where `-i` specifies the location of your key pair file. If you get an error during `setup` saying that the connection was refused, just wait a few minutes and try again. This happens because instances take a variable amount of time to become ssh-ready.

Finally, login to the `master` node to run jobs

```
icecloud login beast master -i mykey.pem
```

Once on the master, setup whatever build environment you want that supports distributed compilation. When you start the build, it will use your cluster to complete tasks. See the example use case below for how to use this cluster to build Chrome.

## example use case

One likely use case is performing distributed builds of Chrome. This is what the biggies do, and now you can do it too! 

First launch your cluster (the `m3.large` instance type is recommended, as well as a larger-than-default root volume)

```
icecloud launch chromeo -k mykey -n 5 -t m3.large -s 50
```

Run the `icecc` setup

```
icecloud setup chromeo -i mykey.pem 
```

Then execute a script to set up the Chromium dev environment. This has nothing to do with `icecream` or `icecloud`, but we provide it as an example. Download the script here and then execute on the `master` node (this can take up to an hour because it's cloning the entire Chrome source code)

```
icecloud execute chromeo master -i mykey.pem -e chrome.sh
```

Finally login to the `master` node

```
icecloud login chromeo master -i mykey.pem
```

Start `ninja`

```
cd src
ninja -j 10 -C out/Release chrome
```

and it should start a distributed build.