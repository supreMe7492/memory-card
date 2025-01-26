import "../styles/gallery.css";

export default function Gallery({ details, handleShuffle, handleScore }) {
  return (
    <div className="gallery">
      {details.map((detail) => (
        <div
          className="card"
          key={detail.name}
          onClick={(e) => {
            handleShuffle();
            handleScore(e);
          }}
        >
          <img className="cardImg" src={detail.sprites.front_default} alt="" />
          <span className="pokeName">{detail.name}</span>
        </div>
      ))}
    </div>
  );
}
