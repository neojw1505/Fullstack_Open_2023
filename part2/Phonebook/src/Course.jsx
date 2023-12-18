const Course = ({ course }) => {
    return course.map((c) => (
      <div key={c.id}>
        <Header header={c.name} />
        <Content content={c.parts} />
      </div>
    ));
  };

  const Header = ({ header }) => {
    return <h1>{header}</h1>;
  };
  
  const Content = ({ content }) => {
    const sum = content.reduce((total, part) => { return total + part.exercises }, 0);
    return (
      <div>
        {content.map((part) => (
          <Part key={part.id} part={part} />
        ))}
        <b>Total of {sum} exercises</b>
      </div>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  export default Course