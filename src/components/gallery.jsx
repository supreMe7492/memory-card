import "../styles/gallery.css";

export default function Gallery({ details, handleShuffle }) {
  return (
    <div className="gallery">
      {details.map((detail) => (
        <div className="card" onClick={handleShuffle} key={detail.name}>
          <img className="cardImg" src={detail.sprites.front_default} alt="" />
          <span className="pokeName">{detail.name}</span>
        </div>
      ))}
    </div>
  );
}
