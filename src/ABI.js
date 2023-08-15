export const ABIShareContract = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "metadataId",
        type: "uint256",
      },
    ],
    name: "CreateMetadata",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    name: "CreateNewUser",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "encryptData",
        type: "string",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    name: "acceptRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "clientToRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestReceived",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadataId",
            type: "string",
          },
          {
            internalType: "string",
            name: "requestKey",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "encryptKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "publicKey",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestSended",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadataId",
            type: "string",
          },
          {
            internalType: "string",
            name: "requestKey",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "encryptKey",
            type: "string",
          },
          {
            internalType: "string",
            name: "publicKey",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metadataByOwner",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "metadataId",
            type: "string",
          },
          {
            internalType: "string",
            name: "keyEncrypt",
            type: "string",
          },
          {
            internalType: "string",
            name: "publicKey",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Metadata[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "metadatas",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "metadataId",
        type: "string",
      },
      {
        internalType: "string",
        name: "keyEncrypt",
        type: "string",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "metadataId",
        type: "string",
      },
      {
        internalType: "string",
        name: "encryptKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    name: "migrateData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ownerToMetadatas",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ownerToRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "rejectRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_metadataId",
        type: "string",
      },
      {
        internalType: "string",
        name: "requestKey",
        type: "string",
      },
    ],
    name: "requestCId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadataId",
        type: "string",
      },
      {
        internalType: "string",
        name: "requestKey",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "encryptKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
