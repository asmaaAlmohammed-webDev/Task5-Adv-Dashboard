interface TitleCompProps {
  title: string;
}

const TitleComponent = ({ title }: TitleCompProps) => {
  return (
    <div>
      <h2 className="fw-semibold fs-60 mt-b-76">{title}</h2>
    </div>
  );
};

export default TitleComponent;
