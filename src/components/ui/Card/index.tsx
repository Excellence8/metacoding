import React from "react";
import "./Card.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  extra?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  hoverable = false,
  extra,
  onClick
}) => {
  const cardClasses = `
    card
    ${hoverable ? "card-hoverable" : ""}
    ${onClick ? "card-clickable" : ""}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {extra && <div className="card-extra">{extra}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
