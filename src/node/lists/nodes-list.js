import GeoLocationLists from 'node/lists/geolocation-lists/geolocation-lists'
import SocketAddress from 'common/sockets/socket-address'
import NodesListObject from './node-list-object.js';

const colors = require('colors/safe');
const EventEmitter = require('events');

/*
    The List is populated with Node Sockets only if the socket pass the Hello Message
 */

class NodesList {

    // nodes = []               - storing the connected sockets
    // events = []              - used for callbacks

    constructor(){

        console.log("NodesList constructor");

        this.emitter = new EventEmitter();

        this.nodes = [];
        this.nodesTotal = 0;

        this.events = [];

        this.removeDisconnectedSockets();
    }


    searchNodeSocketByAddress(sckAddress, type, validationDoubleConnectionsTypes){

        if (type === undefined) type = 'all';

        sckAddress = SocketAddress.createSocketAddress(sckAddress);

        for (let i=0; i<this.nodes.length; i++)
            if ( (this.nodes[i].type === type || type  === "all") && (this.nodes[i].socket.node.sckAddress.matchAddress(sckAddress, validationDoubleConnectionsTypes))){
                return this.nodes[i];
            }

        return null;
    }

    registerUniqueSocket(socket, type, validationDoubleConnectionsTypes){

        if (type === undefined) throw ("type is necessary");

        socket.node.type = type;
        socket.node.index = ++this.nodesTotal;

        if (!socket.node || !socket.node.protocol || !(socket.node.protocol.helloValidated || false)) {

            console.log("Error - registerUniqueSocket rejected by invalid helloValidated", ( socket.node !== undefined ? socket.node.protocol.helloValidated : undefined ) );

            socket.disconnect(true);
            return false;
        }

        // avoiding double connections                              unless it is allowed to double connections
        if ( this.searchNodeSocketByAddress(socket, undefined, validationDoubleConnectionsTypes ) === null ) {

            // it is a unique connection, I should register this connection

            let object = new NodesListObject(socket, type);
            this.nodes.push(object);

            this.emitter.emit("nodes-list/connected", object);

            GeoLocationLists.includeSocket(socket);

            return true;
        }

        console.log(colors.red( "Already connected to "+socket.node.sckAddress.getAddress(true)));
        socket.disconnect(true);
        return false;
    }

    //Removing socket from the list (the connection was terminated)
    disconnectSocket(socket, type){


        if (socket !== null && !socket.hasOwnProperty("node") ) {

            //console.log(colors.red("Error - disconnectSocket rejected by invalid helloValidated"));
            //if (socket.hasOwnProperty("node")) console.log("hello validated value",socket.node.protocol.helloValidated);
            socket.disconnect(true);
            return false;
        }

        if (type === undefined) type = 'all';

        //console.log("disconnecting", socket, this.nodes);

        for (let i=this.nodes.length-1; i>=0; i--)
            if ((this.nodes[i].type === type || type  === "all") && ((this.nodes[i].socket === socket ) || (this.nodes[i].socket.node.sckAddress.uuid === socket.node.sckAddress.uuid  ) )) {

                console.log(colors.green('deleting client socket '+ i +" "+ socket.node.sckAddress.toString()));

                this.emitter.emit("nodes-list/disconnected", this.nodes[i]);

                this.nodes.splice(i, 1);
                socket.disconnect(true);
                return true;
            }

        console.log("Disconnecting Socket but it was not validated before...", socket.node.sckAddress.getAddress());
        socket.disconnect(true);
        return false;
    }

    //return the JOIN of the clientSockets and serverSockets
    getNodes(type){

        if ( type === undefined) type = 'all';

        let list = [];

        for (let i=0; i<this.nodes.length; i++)

            if (typeof type === 'string') { // in case type is just a simple string
                if (type === this.nodes[i].type || type === "all")
                    list.push(this.nodes[i]);
            }
            else if (Array.isArray(type)) //in case type is an Array
                if (this.nodes[i].type in type)
                    list.push(this.nodes[i]);

        return list;
    }


    removeDisconnectedSockets(){

        for (let i=this.nodes.length-1; i>=0; i--)
            if (this.nodes[i].socket.disconnected)
                this.nodes.splice(i,1);

        setTimeout(()=>{this.removeDisconnectedSockets()}, 2000);
    }

}

export default new NodesList();