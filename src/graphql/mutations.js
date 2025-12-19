import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $date: String!
    $time: String!
    $description: String!
    $location: String!
    $image: String
    $category: String
  ) {
    createEvent(
      title: $title
      date: $date
      time: $time
      description: $description
      location: $location
      image: $image
      category: $category
    ) {
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

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $date: String
    $time: String
    $description: String
    $location: String
    $image: String
    $category: String
  ) {
    updateEvent(
      id: $id
      title: $title
      date: $date
      time: $time
      description: $description
      location: $location
      image: $image
      category: $category
    ) {
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

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
      title
    }
  }
`;

export const SET_CURRENT_CONTEST = gql`
  mutation SetCurrentContest($monthWon: String!) {
    setCurrentContest(monthWon: $monthWon)
  }
`;
