import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_MARKETPLACES = gql`
  query marketplaces {
    marketplaces {
      _id
      name
      imageSrc
      altText
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query viewReview($marketplaceId: ID!) {
    viewReview(marketplaceId: $marketplaceId) {
      _id
      name
      reviews {
        _id
        title
        review
        author
        created_date
      }
    }
  }
`;
export const QUERY_REVIEW = gql`
  query reviews($reviewId: ID!) {
    reviews(reviewId: $reviewId) {
      _id
      title
      review
      author
      created_date
    }
  }
`;

