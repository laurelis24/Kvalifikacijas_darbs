import Everyone from "@/Layouts/EveryoneLayout";
//import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export default function About() {
    return (
        <Everyone>
            <main>
                <section className="bg-white px-6 py-12 md:px-12 lg:px-24">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Par lietotni</h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Lietotne nodrošina platformu ikvienam lietotājam, lai droši autentificētos un dalītos ar
                            paša novērotiem notikumiem, negadījumiem vai vētras postījumiem visā Latvijas teritorijā.
                            Vieta, kur sabiedrība var ātri apmainīties ar svarīgu informāciju, palīdzot veidot aktuālu
                            pārskatu par situāciju dabā un pilsētvidē. Šī lietotne tika izstrādāta kvalifikācijas darba
                            ietvaros. Autors: Ventspils Augstskolas 2. kursa students Lauris Kairo.
                        </p>
                    </div>
                </section>
                <section className="bg-white py-10">
                    <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">Izmantotās tehnoloģijas</h2>

                    <div className="flex w-full justify-center">
                        <div className="w-[300px] shadow-sm">
                            <Slider />
                        </div>
                    </div>
                </section>
            </main>
        </Everyone>
    );
}

function Slider() {
    const usedTech = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png",
            url: "https://laravel.com/",
            name: "Laravel",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/256px-Openstreetmap_logo.svg.png",
            url: "https://www.openstreetmap.org/",
            name: "OpenStreetmap",
        },
        {
            image: "https://research.binus.ac.id/geoecoai/wp-content/uploads/sites/21/2024/08/Screenshot-2024-08-13-171059.png",
            url: "https://react-leaflet.js.org/",
            name: "React Leaflet",
        },
        {
            image: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
            url: "https://www.weatherapi.com/",
            name: "Weather API",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png",
            url: "https://www.npmjs.com/",
            name: "Node package manager",
        },
        { image: "https://inertiajs.com/twitter-card.png", url: "https://inertiajs.com/", name: "Inertia JS" },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/120px-React_Logo_SVG.svg.png",
            url: "https://react.dev/",
            name: "React JS",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/250px-Typescript.svg.png",
            url: "https://www.typescriptlang.org/",
            name: "TypeScript",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/120px-MySQL_logo.svg.png",
            url: "https://www.mysql.com/",
            name: "MySql",
        },
    ];
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            speed={3000}
            autoplay={{
                delay: 500,
                pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
        >
            {usedTech.map((tech, idx) => {
                return (
                    <SwiperSlide key={idx}>
                        <div className="flex h-full items-center justify-center">
                            <a target="_blank" href={tech.url}>
                                <img src={tech.image} alt={tech.name} />
                            </a>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
