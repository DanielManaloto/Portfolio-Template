function About() {
  return (
    <>
      <div>
        <h1 className="mb-8">Lorem ipsum dolor sit amet.</h1>
        <div className="flex justify-between">
          <div>
            <p>image placeholder</p>
          </div>
          <div className="w-[50%] flex flex-col">
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              odit expedita ab dolore aliquid ad sapiente perspiciatis error
              distinctio atque quos quibusdam mollitia placeat modi possimus,
              iure facere consectetur, fugiat quis ratione nam assumenda
              tenetur. Voluptatem corrupti asperiores eum sapiente eveniet
              soluta dolorem fuga quas nam ducimus consectetur officiis libero
              fugit debitis, veniam ex ullam adipisci commodi cum beatae
              deserunt! Deleniti beatae deserunt iusto perspiciatis iste
              consequatur nesciunt vero veniam officia id aspernatur error
              corrupti accusamus a nam, quisquam maxime voluptates dolor.
              Exercitationem ullam hic ipsam aperiam culpa. Possimus eligendi
              minima obcaecati! Facilis quaerat, repellat dolore odio est
              blanditiis neque!
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
    </>
  );
}

export default About;
