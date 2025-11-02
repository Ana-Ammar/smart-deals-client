import { Link } from "react-router";

const ProdcutCard = ({ product }) => {
  const { _id, image, title, price_min, price_max } = product;

  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-primary">Price: {price_min} - {price_max} Tk</p>
        <div className="card-actions">
          <Link to={`/product-details/${_id}`} className="btn border-primary w-full text-primary">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProdcutCard;
