// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className='px-4 py-12 max-w-3xl mx-auto'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6'>About EOS Archive</h1>
      <p className='leading-relaxed mb-4'>
        eos archive showcases event flyers, posters, and other visuals from
        subcultural art/music/political spaces in Leipzig and beyond...
      </p>
      <p className='leading-relaxed mb-4'>
        {/* Replace with your actual text from Figma */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
        fringilla justo, nec venenatis lectus. Morbi vehicula magna eget leo
        vehicula, at condimentum urna pellentesque.
      </p>
      <p className='leading-relaxed'>
        For more information, email us at{' '}
        <a
          href='mailto:info@eosarchive.xyz'
          className='underline'>
          info@eosarchive.xyz
        </a>
        .
      </p>
    </div>
  );
}
