
function Socials({ link, imgURL, alt, children }) {
  return (
    <div className="social-container">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={alt || "Social link"}
      >
        {children ? (
          children
        ) : (
          <img src={imgURL} className="social-img" alt={alt || "social"} />
        )}
      </a>
    </div>
  );
}

export default Socials;
