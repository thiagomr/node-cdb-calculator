APPNAME="node-cdb-calculator"
PORT=3000

remove() {
    docker rm $APPNAME
}

build() {
    docker build -t $APPNAME .
}

stop() {
    docker stop $APPNAME
}

run() {
    docker run -it -d \
    -p $PORT:$PORT \
    --name="$APPNAME" $APPNAME
}

logs() {
    docker logs -f $APPNAME
}

start() {
    build
    stop
    remove
    run
}

$*
