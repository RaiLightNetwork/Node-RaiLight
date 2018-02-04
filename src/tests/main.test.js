if(( typeof window !== 'undefined' && !window._babelPolyfill) ||
    ( typeof global !== 'undefined' && !global._babelPolyfill)) {
    require('babel-polyfill')
}


if ( typeof describe !== 'undefined') {

    require ('tests/satoshmindb/Interface-SatoshminDB.test');

    require ('tests/utils/big-number/BigNumber.test');
    require ('tests/utils/serialization/Serialization.test');

    // require ('tests/blockchain/Node-Web-Peer.test')

}

