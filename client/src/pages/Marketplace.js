import React from "react";
import { useParams, Link } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../utils/queries";

function Marketplace() {
  const { marketplaceId, marketplacename } = useParams();

  const { loading, data } = useQuery(QUERY_REVIEWS, {
    // pass URL parameter
    variables: { marketplaceId: marketplaceId },
  });
  const markeplaceData = data?.viewReview || {};

  // Placeholder marketplace data
  const marketplaceData = {
    ebay: {
      name: "eBay Australia",
      link: "https://www.ebay.com.au/",
      shippingTime: "2-6 business days",
      productCategories: ["Electronics", "Fashion", "Home & Garden", "Toys"],
      services: [
        "Buyer Protection",
        "Click & Collect",
        "Easy Returns",
        "eBay Plus Subscription",
      ],
    },
    amazon: {
      name: "Amazon Australia",
      link: "https://www.amazon.com.au/",
      shippingTime: "1-3 business days",
      productCategories: ["Books", "Electronics", "Beauty", "Kitchen"],
      services: [
        "Amazon Prime",
        "Free Shipping on Eligible Orders",
        "Easy Returns",
        "Customer Support 24/7",
      ],
    },
    catch: {
      name: "Catch",
      link: "https://www.catch.com.au/",
      shippingTime: "3-7 business days",
      productCategories: ["Fashion", "Home & Kitchen", "Sports", "Groceries"],
      services: [
        "Club Catch Membership",
        "Express Delivery",
        "30-Day Free Returns",
        "Customer Service",
      ],
    },
  };

  const currentMarketplace = marketplaceData[marketplacename];

  // Check if currentMarketplace exists before rendering
  if (!currentMarketplace) {
    return <div className="marketplace-content">Marketplace not found.</div>;
  }

  return (
    <div className="marketplace-content">
      <div className="marketplace-container">
        <a href={currentMarketplace.link}>
          <h1 className="marketplace-heading">{currentMarketplace.name}</h1>
        </a>
        <div className="marketplace-info">
          <p>
            <strong>Shipping Time:</strong> {currentMarketplace.shippingTime}
          </p>
          <p>
            <strong>Product Categories:</strong>
          </p>
          <ul className="categories-list">
            {currentMarketplace.productCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <p>
            <strong>Services:</strong>
          </p>
          <ul className="services-list">
            {currentMarketplace.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <div className="customer-reviews">
            <h2 className="reviews-heading">Customer Reviews</h2>
            <ReviewList markeplaceData={markeplaceData} />

            <Link
              to={`/marketplace/${marketplaceId}/add-review`}
              className="add-review-button"
            >
              Add a Review
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Marketplace;
