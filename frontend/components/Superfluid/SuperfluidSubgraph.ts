import { gql, Client, cacheExchange, fetchExchange } from "urql";

export const getAllStreams = async (address: string) => {
  const client = new Client({
    url: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
    exchanges: [cacheExchange, fetchExchange]
  });

  const sendingStreamsQuery = gql`
    query sendingStreamsQuery($sender: ID = "") {
    streams(where: {sender: $sender}) {
      currentFlowRate
      receiver {
        id
      }
      createdAtTimestamp
      token {
        name
      }
    }
  }`

  ///formula to get total amount streamed till now is -> streamedUntilUpdatedAt + ((currentTime in seconds) - updatedAtTimestamp) * currentFlowRate

  const receivingStreamsQuery = gql`
    query ($receiver: ID = "") {
      streams(where: {receiver: $receiver}) {
        currentFlowRate
        receiver {
        id
      }
      sender {
        id
      }
      createdAtTimestamp
  }
  }
  `
  const result1 = await client.query(sendingStreamsQuery, {sender: address}).toPromise();
  const result2 = await client.query(receivingStreamsQuery, {receiver: address}).toPromise();


};
