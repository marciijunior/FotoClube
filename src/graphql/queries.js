import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    allEvents {
      id
      title
      date
      time
      description
      location
      image
      category
      createdAt
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      time
      description
      location
      image
      category
    }
  }
`;

export const GET_ALL_WINNERS = gql`
  query GetAllWinners {
    allWinners {
      id
      title
      author
      image
      monthWon
      judgesNotes
      isWinner
      position
      isCurrent
      createdAt
    }
  }
`;
