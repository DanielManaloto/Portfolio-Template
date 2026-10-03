import content from "../content.json";

const about = content.about;
const facts = about.facts;

function About() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <h1 className="mb-10">{about.sectionTitle}</h1>

      <div className="flex max-sm:flex-col gap-10">
        {/* Image */}
        <div className="w-full sm:w-2/5">
          <img
            src={`${about.imagePath}`}
            alt="Portrait"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full sm:w-3/5">
          <div className="mb-8">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {facts?.map((fact, index) => (
            <p
              className="flex border-y border-border p-2"
              key={fact.id || index}
            >
              <span className="w-40 shrink-0">{fact.label}</span>
              <span>{fact.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
