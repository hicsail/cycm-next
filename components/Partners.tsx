import React from 'react'

interface Props {
  partners: Array<any>
}

const Partners = ({ partners } : Props) => {
  return (
    <div className="flex justify-center mb-[48px]">
      <div className="p-12 max-w-7xl">
        <h1 className="text-7xl font-bold my-7">Partners and Community Engagement</h1>
        <div className="flex justify-center space-x-20 mt-20">
          {partners.map((partner, index) => {
            return (
              <div key={index} className="flex justify-center">
                {partner.image}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Partners