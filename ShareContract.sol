// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct Request {
    address owner;
    uint256 requestId;
    string metadataId;
    string requestKey;
    uint8 status;
    string encryptKey;
    string publicKey;
    uint256 timestamp;
}

struct Metadata {
    address owner;
    // là hash của data
    string metadataId;
    string keyEncrypt;
    string publicKey;
    uint256 timestamp;
}
struct User {
    address account;
    string publicKey;
}

contract UserContract {
    address public owner;
    mapping(address => User) public users;

    mapping(string => Metadata) public metadatas;
    mapping(address => string[]) public ownerToMetadatas;

    uint256 requestId;
    mapping(address => uint256[]) public clientToRequests;
    mapping(address => uint256[]) public ownerToRequests;
    mapping(uint256 => Request) public requests;
    
    event CreateNewUser(
        address account,
        string publicKey
    );
    event CreateMetadata(
        uint256 metadataId
    );
    constructor() {
        owner = msg.sender;
        requestId = 0;
    }

    function registerUser(string memory publicKey) public {
        users[msg.sender] = User(msg.sender, publicKey);
        emit CreateNewUser(msg.sender, publicKey);
    }
    
    function migrateData(
        string memory metadataId,
        string memory encryptKey,
        string memory publicKey) public {
            // metadataId = metadataId + 1;
            metadatas[metadataId] = Metadata(msg.sender,metadataId,encryptKey,publicKey,block.timestamp);

            ownerToMetadatas[msg.sender].push(metadataId);
    }

    function requestCId(string memory _metadataId,string memory requestKey) public {
            require(metadatas[_metadataId].owner != address(0), "ShareContract: metadataId not existed");
            requestId = requestId + 1;
            requests[requestId] = Request(msg.sender,requestId, _metadataId,requestKey,1,"","",block.timestamp);
            clientToRequests[msg.sender].push(requestId);
            
            Metadata memory metadata = metadatas[_metadataId];
            ownerToRequests[metadata.owner].push(requestId);
    }
    function acceptRequest(uint256 _requestId, string memory encryptData, string memory publicKey) public {
        Request storage req = requests[_requestId];
        require(req.owner != address(0), "ShareContract: requestId not existed");
        
        Metadata memory metadata = metadatas[req.metadataId];
        require(metadata.owner == msg.sender, "ShareContract: sender not owner of metadata");
        
        req.status = 2;
        req.encryptKey = encryptData;
        req.publicKey = publicKey;
        req.timestamp = block.timestamp;
    }
    function rejectRequest(uint256 _requestId) public {
        Request storage req = requests[_requestId];
        require(req.owner != address(0), "ShareContract: requestId not existed");

        Metadata memory metadata = metadatas[req.metadataId];
        require(metadata.owner == msg.sender, "ShareContract: sender not owner of metadata");

        req.status = 3;
        req.timestamp = block.timestamp;
    }



    function metadataByOwner() public view returns (Metadata[] memory){
        string[] memory ids = ownerToMetadatas[msg.sender];
        Metadata[] memory output = new Metadata[](ids.length);

        for(uint8 i=0;i<ids.length;i++){
            output[i] = metadatas[ids[i]];
        }
        return output;
    }
    function getRequestSended() public view returns (Request[] memory){
        uint256[] memory ids = clientToRequests[msg.sender];
        Request[] memory output = new Request[](ids.length);

        for(uint8 i=0;i<ids.length;i++){
            output[i] = requests[ids[i]];
        }
        return output;
    }
    function getRequestReceived() public view returns (Request[] memory){
        uint256[] memory ids = ownerToRequests[msg.sender];
        Request[] memory output = new Request[](ids.length);

        for(uint8 i=0;i<ids.length;i++){
            output[i] = requests[ids[i]];
        }
        return output;
    }
}