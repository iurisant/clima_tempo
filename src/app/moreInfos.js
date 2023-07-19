import Image from 'next/image';

export default function MoreInfos({ url, alt, title, info }) {
  return (
    <div className='flex flex-col justify-center items-center bg-white/5 w-[45%] border border-white/10 rounded-xl p-8'>
      <Image
        src={url}
        alt={alt}
        width={50}
        height={50}
      />
      <strong className='text-center truncate'>{title}</strong>
      <span className=' text-white/70 text-center truncate'>{info}</span>
    </div>
  )

}