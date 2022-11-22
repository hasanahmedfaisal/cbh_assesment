const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns partitionKey from input when it is of type string", () => {
    const event = { partitionKey: "someValue" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("someValue");
  });

  it("Returns stringified partitionKey from input when it is of type string", () => {
    const event = {
      partitionKey: {
        someKey: "someValue"
      }
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  describe("hashed partitionKey using crypto", () => {
    let cryptoMock, createHashMock;
    beforeEach(() => {
      createHashMock = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValueOnce('encrypted'),
      };
      cryptoMock = jest.spyOn(crypto, 'createHash').mockImplementationOnce(() => createHashMock);
    })

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    })

    it("Returns hashed value from crypto when event does not have partitionKey",() => {
      const event = {
        someKey: "someValue"
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(cryptoMock).toBeCalledWith("sha3-512");
      expect(cryptoMock).toBeCalledTimes(1);
      expect(createHashMock.update).toBeCalledWith(JSON.stringify(event));
      expect(createHashMock.digest).toBeCalledWith("hex");
      expect(trivialKey).toBe("encrypted");
    })

    it("Returns hashed value of candidate from crypto when candidate length greater than MAX_PARTITION_KEY_LENGTH",() => {
      const event = {
        partitionKey: new Array(258).join( "a")
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(cryptoMock).toBeCalledWith("sha3-512");
      expect(cryptoMock).toBeCalledTimes(1);
      expect(createHashMock.update).toBeCalledWith(event.partitionKey);
      expect(createHashMock.digest).toBeCalledWith("hex");
      expect(trivialKey).toBe("encrypted");
    })
  })
});
