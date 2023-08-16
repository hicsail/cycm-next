import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);


const CurrentState = () => {
  return (
    <div className="flex justify-center mb-[48px]">
      <div className="p-12 max-w-7xl">
        <h1 className="text-7xl font-bold my-7">Current State of Affairs</h1>
        <h3 className="text-4xl font-bold my-7">
          Social Media is big for teens ages 13 to 17
        </h3>
        <div>
          <Bar
            data={{
              labels: ["Youtube", "TikTok", "Instagram", "Snapchat", "Facebook", "Twitter"],
              datasets: [
                {
                  label: "% of teens who use social media",
                  data: [95, 67, 62, 59, 32, 23],
                  backgroundColor: ["red", "yellow", "blue", "black", "green", "orange"],
                  borderColor: "orange",
                  borderWidth: 1
                },
              ]
            }}
            height={300}
            width={500}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CurrentState