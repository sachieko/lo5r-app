import './ItemCard.scss';

export const ChoiceCard = function({choice, stat, info}) {
  if (info) {
    const parablocks = info.split('\n').map((para, index) => <p key={index}>{para}</p>);

    return (
      <div className="card">
        <div className="title">{choice}</div>
        <div className="emphasis">{stat}</div>
        <div className="desc">
          {info ? parablocks : info}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
        <div className="title">{choice}</div>
        <div className="emphasis">{stat}</div>
    </div>
  );
};