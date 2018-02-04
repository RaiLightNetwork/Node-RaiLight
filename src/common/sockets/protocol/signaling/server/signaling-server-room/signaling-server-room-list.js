import SocketAddress from 'common/sockets/socket-address'
import SignalingServerRoomConnectionObject from './signaling-server-room-connection-object';
import NodesList from 'node/lists/nodes-list'

const colors = require('colors/safe');

/*
    The List is populated with Node Sockets who are available for WebRTC
 */

class SignalingServerRoomList {

    // signalingRoom = []               - storing the connected sockets
    // events = []                      - used for callbacks

    constructor() {

        console.log("SignalingRoomList constructor");

        this.lastConnectionsId = 0;

        this.list = [];
        this.events = [];

        //{type: ["webpeer", "client"]}
        NodesList.emitter.on("nodes-list/disconnected", (result ) => { this._removeDisconnectedSignalingServerRoomConnections( result ) });
    }

    registerSignalingServerRoomConnection(client1, client2, status) {

        if (client1 === null || client2 === null) return null;

        let connection = this.searchSignalingServerRoomConnection(client1, client2);

        if (connection === null) {

            let roomConnectionObject = new SignalingServerRoomConnectionObject(client1, client2, status, ++this.lastConnectionsId);

            this.list.push(roomConnectionObject);
            this.list.push(roomConnectionObject);

            return roomConnectionObject;

        } else {
            //it was established before, now I only change the status
            connection.status = status;
        }

        return connection;
    }

    setSignalingServerRoomConnectionStatus(client1, client2, status) {
        return this.registerSignalingServerRoomConnection(client1, client2, status);
    }

    searchSignalingServerRoomConnection(client1, client2, skipReverse) {

        //previous established connection
        for (let i = 0; i < this.list.length; i++)
            if ((this.list[i].client1 === client1 && this.list[i].client2 === client2) || (this.list[i].client1 === client2 && this.list[i].client2 === client1)) {

                return this.list[i];

            }

        if ( skipReverse === undefined || skipReverse === false)
            return this.searchSignalingServerRoomConnection(client2, client1, true);

        return null;
    }

    searchSignalingServerRoomConnectionById(id){
        for (let i=0; i<this.list.length; i++)
            if (this.list[i].id === id) return this.list[i];

        return null;
    }

    _removeDisconnectedSignalingServerRoomConnections(nodesListObject) {

        //{type: ["webpeer", "client"]}

        if (nodesListObject.type === "webpeer" ||   // signaling service on webpeer
            nodesListObject.type === "client") {

            for (let i = this.list.length-1; i >= 0 ; i--)
                if (this.list[i].client1 === nodesListObject.socket || this.list[i].client2 === nodesListObject.socket){
                    this.list.splice(i, 1);
                }

        }
    }


}

export default new SignalingServerRoomList();