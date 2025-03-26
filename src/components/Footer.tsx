export default function Footer() {
  return (
    <div className='text-white pt-[100px] bg-stone-900 max-sm:text-sm md:px-32 links-container'>
      <div className='flex flex-wrap items-center justify-between gap-2 py-8'>
        <p>@{new Date().getFullYear()} PCTE, All Rights Reserved</p>
        <div className='flex flex-wrap items-center gap-2 max-sm:text-xs'>
          <a href='#' className='min-w-fit'>Terms of Use</a>
          <div className='w-[1px] h-5 bg-black15'></div>
          <a href='#' className='min-w-fit'>Privacy Policy</a>
          <div className='w-[1px] h-5 bg-black15'></div>
          <a href='#' className='min-w-fit'>Cookie Policy</a>
        </div>
      </div>

    </div>
  )
}