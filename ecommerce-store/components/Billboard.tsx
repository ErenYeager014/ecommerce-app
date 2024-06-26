import React from 'react'
import { Billboard } from '@/types'
interface billboardsProps {
    data: Billboard
}
const Billboards: React.FC<billboardsProps> = ({ data }) => {
    return (
        <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
            <div style={{
                backgroundImage: `url("${data?.imageURL}")`
            }} className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'>
                <div className='w-full h-full flex flex-col justify-center items-center text-center gap-y-8'>
                    <div className='font-bold text-2xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs'>
                        {data.label}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billboards