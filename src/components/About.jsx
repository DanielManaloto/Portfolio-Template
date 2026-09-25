import portrait from "../assets/portrait.jpg";

function About() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <h1 className="mb-10">Lorem ipsum dolor sit amet.</h1>

      <div className="flex max-sm:flex-col gap-10">
        {/* Image */}
        <div className="w-full sm:w-2/5">
          <img
            src={portrait}
            alt="Portrait"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full sm:w-3/5">
          <p className="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            odit expedita ab dolore aliquid ad sapiente perspiciatis error
            distinctio atque quos quibusdam mollitia placeat modi possimus,
            iure facere consectetur, fugiat quis ratione nam assumenda
            tenetur. Voluptatem corrupti asperiores eum sapiente eveniet
            soluta dolorem fuga quas nam ducimus consectetur officiis libero
            fugit debitis, veniam ex ullam adipisci commodi cum beatae
            deserunt!
          </p>

          <p className="flex border-y border-gray-300 p-2">
            <span className="w-40 shrink-0">Focus</span>
            <span>Front-end development and web apps</span>
          </p>

          <p className="flex border-b border-gray-300 p-2">
            <span className="w-40 shrink-0">Also comfortable with</span>
            <span>Automation scripts and low-level programming</span>
          </p>

          <p className="flex border-b border-gray-300 p-2">
            <span className="w-40 shrink-0">Currently learning</span>
            <span>TypeScript and WebAssembly</span>
          </p>

          <p className="flex border-b border-gray-300 p-2">
            <span className="w-40 shrink-0">Availability</span>
            <span>Open to full-time and freelance work</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

