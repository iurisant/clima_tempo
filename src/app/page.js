'use client'
import Image from 'next/image'
import MoreInfos from './moreInfos'

//IMGS
import Umidade from "@/img/moisture.svg"
import Vento from "@/img/wind.svg"
import PorSol from "@/img/sunset.svg"

//IMG CLIMA
import Sol from "@/img/sun.svg"
import Lua from "@/img/moon.svg"
import SolNuvem from "@/img/sun_cloud.svg"
import LuaNuvem from "@/img/sun_cloud.svg"
import Nuvem from "@/img/cloud.svg"
import Nuvens from "@/img/clouds.svg"
import NuvemChuva from "@/img/cloud_rain.svg"
import SolChuva from "@/img/cloud_rain.svg"
import LuaChuva from "@/img/cloud_rain.svg"

import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  useEffect(() => {
    if (latitude !== "" && longitude !== "") {
      fetchData();
    }
  }, [latitude, longitude]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8eb1bc2f7effa276175f2ef2fd11079d`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  function timeConverter(UNIX_timestamp, op) {
    const date = new Date(UNIX_timestamp * 1000);
    if (op == 1) {
      const time = date.getHours() + ':' + date.getMinutes();
      return time;
    } else if (op == 2) {
      const time = date.getHours()
      return time;
    }

  }

  function imgTemp(clima, nasc, por) {
    const hrNascSol = timeConverter(nasc, 2)
    const hrPorSol = timeConverter(por, 2)

    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();

    console.log(clima, hrNascSol, hrPorSol, time)

    if (time >= hrPorSol) {
      console.log("DIA")
    }

    return Lua
  }

  return (
    <main className="flex flex-col lg:justify-center items-center lg:w-screen lg:h-full gap-8 my-10">
      <div>
        <div className='flex justify-center items-center gap-4 mb-4'>
          <span className=' text-xl'>
            {data.name ? <>{data.name}</> : 'Localização'}
          </span>
        </div>
        <div className='flex justify-center items-center gap-2'>
          {data.weather ?
            <Image
              className='min-h-[100px] min-w-[100px]'
              src={imgTemp(data.weather[0].description, data.sys.sunrise, data.sys.sunset)}
              alt={"Sol"}
              width={100}
              height={100}
            /> : <></>
          }
          <strong className=' text-6xl'>{data.main ? <>{Math.round(data.main.temp_min - 273)}</> : '0'}º</strong>
        </div>
        <div className='flex justify-center items-center gap-4 mt-4 text-white/70'>
          <span>
            Min: {data.main ? <>{Math.round(data.main.temp_min - 273)}</> : '0'}º
          </span>
          <span>
            |
          </span>
          <span>
            Max: {data.main ? <>{Math.round(data.main.temp_min - 273)}</> : '0'}º
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center flex-wrap gap-4'>
        <MoreInfos
          url={Sol}
          alt={"Sol"}
          title={"Índice UV"}
          info={"- -"}
        />
        <MoreInfos
          url={Umidade}
          alt={"Umidade"}
          title={"Umidade"}
          info={data.main ? <>{data.main.humidity}%</> : '- -'}
        />
        <MoreInfos
          url={Vento}
          alt={"Vento"}
          title={"Vento"}
          info={data.wind ? <>{(data.wind.speed * 3.6).toFixed(1)} Km/h</> : '- -'}
        />
        <MoreInfos
          url={PorSol}
          alt={"Pôr do Sol"}
          title={"Pôr do Sol"}
          info={data.sys ? timeConverter(data.sys.sunset, 1) : '- -'}
        />
      </div>
      <div>
        by Iuri Santana | 2023
      </div>
    </main>
  )
}
