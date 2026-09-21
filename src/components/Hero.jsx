function Hero() {
  return (
    <div className="min-h-screen w-full flex gap-10 items-center justify-start bg-amber-200 pt-16">
      <div className="flex flex-col gap-3 w-125">
        <h1>Daniel Manaloto</h1>
        <h3>BSECE Graduate · Software Dev · Web Dev</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A laboriosam
          asperiores, voluptatibus nisi provident soluta sit blanditiis,
          accusantium quis ab explicabo dolore nobis, deleniti nam.
        </p>
        <div className="flex gap-5">
          <button className="border border-amber-700 rounded-4xl py-2 px-4 whitespace-nowrap">See Contacts</button>
          <button className="border border-amber-700 rounded-4xl py-2 px-4 whitespace-nowrap"> See my Projects</button>
        </div>
      </div>
      <div className="w-125 h-125 bg-green-200">
        <p>placeholder content</p>
      </div>
    </div>
  );
}

export default Hero;
