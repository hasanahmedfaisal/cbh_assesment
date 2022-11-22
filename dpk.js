const crypto = require("crypto");

//Refactored solution

const constants = {
  TRIVIAL_PARTITION_KEY : "0",
  MAX_PARTITION_KEY_LENGTH : 256,
  CREATE_HASH_ALGORITHM : "sha3-512",
  DIGEST_PARAMETER : "hex"
}

const getCandidateFromEvent = (event) => {
  return event.partitionKey ? getStringifiedData(event.partitionKey) : getHashedDigestedValue(JSON.stringify(event))
}

const getStringifiedData = (data) => {
  return typeof data == "string" ? data : JSON.stringify(data)
}

const getHashedDigestedValue = (data) => {
  return crypto.createHash(constants.CREATE_HASH_ALGORITHM).update(data).digest(constants.DIGEST_PARAMETER);
}

exports.deterministicPartitionKey = (event) => {

  const candidate = event ? getCandidateFromEvent(event) : constants.TRIVIAL_PARTITION_KEY;

  return candidate.length > constants.MAX_PARTITION_KEY_LENGTH ? getHashedDigestedValue(candidate) : candidate;

};