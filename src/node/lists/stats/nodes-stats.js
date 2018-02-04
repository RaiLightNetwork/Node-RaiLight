import consts from 'consts/const_global'
import NodesList from 'node/lists/nodes-list'
import GeoLocationLists from 'node/lists/geolocation-lists/geolocation-lists'
import NodesWaitlist from 'node/lists/waitlist/nodes-waitlist'

class NodesStats {

    // socket : null,

    constructor(){

        this.statsClients = 0;
        this.statsServer = 0;
        this.statsWebPeers = 0;
        this.statsWaitlist = 0;

        NodesList.emitter.on("nodes-list/connected", (result) => { this._recalculateStats(result) } );
        NodesList.emitter.on("nodes-list/disconnected", (result ) => { this._recalculateStats(result ) });

        NodesWaitlist.emitter.on("waitlist/new-node", (result ) => { this._recalculateStats(result ) });

        setInterval( () => { return this._printStats() }, consts.NODE_STATUS_INTERVAL)
    }


    _printStats(){

        console.log(" connected to: ", this.statsClients," , from: ", this.statsServer , " web peers", this.statsWebPeers," Waitlist:",this.statsWaitlist,  "    GeoLocationContinents: ", GeoLocationLists.countGeoLocationContinentsLists );

        let string1 = "";
        let clients = NodesList.getNodes("client");
        for (let i=0; i<clients.length; i++)
            string1 += '('+clients[i].socket.node.sckAddress.address+' , '+clients[i].socket.node.sckAddress.uuid+')   ';

        let string2 = "";
        let server = NodesList.getNodes("server");
        for (let i=0; i<server.length; i++)
            string2 += '(' + server[i].socket.node.sckAddress.address + ' , ' + server[i].socket.node.sckAddress.uuid + ')   ';

        console.log("clients: ",string1);
        console.log("server: ",string2);

    }

    _recalculateStats(nodesListObject){

        this.statsClients = NodesList.getNodes("client").length;
        this.statsServer = NodesList.getNodes("server").length;
        this.statsWebPeers = NodesList.getNodes("webpeer").length;
        this.statsWaitlist = NodesWaitlist.waitlist.length;

        this._printStats();

    }
}

export default new NodesStats();