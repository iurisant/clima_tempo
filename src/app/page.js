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
import LuaNuvem from "@/img/moon_cloud.svg"
import Nuvem from "@/img/cloud.svg"
import Nuvens from "@/img/clouds.svg"
import NuvemChuva from "@/img/cloud_rain.svg"
import SolChuva from "@/img/cloud_rain.svg"
import LuaChuva from "@/img/cloud_rain.svg"
import SolRaio from "@/img/sun_rain.svg"
import LuaRaio from "@/img/moon_rain.svg"
import Floco from "@/img/snowflake.svg"
import Nevoa from "@/img/mist.svg"

import { useEffect, useState } from 'react'

export default function Home() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
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
      const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8eb1bc2f7effa276175f2ef2fd11079d&units=metric`);
      const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8eb1bc2f7effa276175f2ef2fd11079d&units=metric`);
      const jsonData1 = await response1.json();
      const jsonData2 = await response2.json();
      setData1(jsonData1);
      setData2(jsonData2.list);
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

  function imgTemp2(clima) {
    switch (clima) {
      case "01d", "01n":
        return Sol
        break;
      case "02d", "02n":
        return SolNuvem
        break;
      case "03d", "03n":
        return SolNuvem
        break;
      case "04d", "04n":
        return Nuvens
        break;
      case "09d", "09n":
        return NuvemChuva
        break;
      case "10d", "10n":
        return SolChuva
        break;
      case "11d", "11n":
        return SolRaio
        break;
      case "13d", "13n":
        return Floco
        break;
      case "50d", "50n":
        return Nevoa
        break;
      default:
        return Sol
        break;
    }
  }

  function imgTemp(clima, nasc, por) {
    const hrNascSol = timeConverter(nasc, 2)
    const hrPorSol = timeConverter(por, 2)

    const date = new Date();
    const time = date.getHours();
    if (time >= hrNascSol && time <= hrPorSol) {
      switch (clima) {
        case "clear sky":
          return Sol
          break;
        case "few clouds":
          return SolNuvem
          break;
        case "scattered clouds":
          return SolNuvem
          break;
        case "broken clouds":
          return Nuvens
          break;
        case "shower rain":
          return NuvemChuva
          break;
        case "rain":
          return SolChuva
          break;
        case "thunderstorm":
          return SolRaio
          break;
        case "snow":
          return Floco
          break;
        case "mist":
          return Nevoa
          break;
        default:
          return Sol
          break;
      }
    } else {
      switch (clima) {
        case "clear sky":
          return Lua
          break;
        case "few clouds":
          return LuaNuvem
          break;
        case "scattered clouds":
          return LuaNuvem
          break;
        case "broken clouds":
          return Nuvens
          break;
        case "shower rain":
          return NuvemChuva
          break;
        case "rain":
          return LuaChuva
          break;
        case "thunderstorm":
          return LuaRaio
          break;
        case "snow":
          return Floco
          break;
        case "mist":
          return Nevoa
          break;
        default:
          return Lua
          break;
      }
    }
  }

  function diaSemana(dia) {
    const data = new Date(dia);
    const numeroDiaSemana = data.getDay();
    const nomesDiasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const nomeDiaSemana = nomesDiasSemana[numeroDiaSemana];
    return nomeDiaSemana
  }

  return (
    <main className="flex flex-col lg:justify-center items-center lg:w-screen lg:h-full gap-8 my-10">
      <div>
        <div className='flex justify-center items-center gap-4 mb-4'>
          <span className=' text-xl'>
            {data1.name ? <>{data1.name}</> : 'Localização'}
          </span>
        </div>
        <div className='flex justify-center items-center gap-2'>
          {data1.weather ?
            <Image
              className='min-h-[100px] min-w-[100px]'
              src={imgTemp(data1.weather[0].description, data1.sys.sunrise, data1.sys.sunset)}
              alt={"Sol"}
              width={100}
              height={100}
            /> : <></>
          }
          <strong className=' text-6xl'>{data1.main ? <>{Math.round(data1.main.temp)}</> : '0'}º</strong>
        </div>
        <div className='flex justify-center items-center gap-4 mt-4 text-white/70'>
          <span>
            Min: {data1.main ? <>{Math.round(data1.main.temp_min)}</> : '0'}º
          </span>
          <span>
            |
          </span>
          <span>
            Max: {data1.main ? <>{Math.round(data1.main.temp_min)}</> : '0'}º
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
          info={data1.main ? <>{data1.main.humidity}%</> : '- -'}
        />
        <MoreInfos
          url={Vento}
          alt={"Vento"}
          title={"Vento"}
          info={data1.wind ? <>{(data1.wind.speed * 3.6).toFixed(1)} Km/h</> : '- -'}
        />
        <MoreInfos
          url={PorSol}
          alt={"Pôr do Sol"}
          title={"Pôr do Sol"}
          info={data1.sys ? timeConverter(data1.sys.sunset, 1) : '- -'}
        />
        <div className='flex flex-col justify-center items-center max-w-[92%] w-full gap-8 mt-8 overflow-hidden'>
          <h1 className='text-xl'>Previsões</h1>
          <div className='flex flex-col justify-between items-center w-full bg-white/5 border border-white/10 rounded-xl p-8'>
            <ul className='flex justify-between w-full pb-4 text-white/70'>
              <li className='w-[100px]'>Dia</li>
              <li className='w-[69px]'>Umidade</li>
              <li className='w-[43px]'>Clima</li>
              <li className='w-[27px]'>Min</li>
              <li className='w-[32px]'>Max</li>
            </ul>
            {data2.length > 0 && data2.map((repo, index) => {
              return (
                <>
                  {(index == 2 || index == 10 || index == 18 || index == 26 || index == 34) &&
                    <ul key={index} className='flex justify-between items-center w-full my-0.5'>
                      <li className='w-[100px] truncate'>{data2[index].dt_txt ? <>{diaSemana((data2[index].dt_txt).substring(0, 10))}</> : '- -'}</li>
                      <li className='flex justify-center w-[69px]'>{data2[index].main ? <>{data2[index].main.humidity}%</> : '- -'}</li>
                      <li className='flex justify-center w-[43px] h-[30px]'>
                        <Image
                          src={imgTemp2(data2[index].weather[0].icon)}
                          alt="Clima"
                          width={100}
                          height={20}
                        />
                      </li>
                      <li className='flex justify-center w-[27px]'>{data2[index].main ? <>{Math.round(data2[index].main.temp_min)}º</> : '- -'}</li>
                      <li className='flex justify-center w-[32px]'>{data2[index].main ? <>{Math.round(data2[index].main.temp_max)}º</> : '- -'}</li>
                    </ul>
                  }
                </>
              )
            })}
          </div>
        </div>
      </div>

      <div>
        by Iuri Santana | 2023
      </div>
    </main>
  )
}
