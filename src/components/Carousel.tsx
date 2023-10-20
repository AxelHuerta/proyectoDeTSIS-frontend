import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/**
 * genera un carrusel de imagenes
 * @component
 */
export default function Carousel() {
  // imagenes del carrusel
  const sliderImages = [
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4100486/pexels-photo-4100486.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/4101164/pexels-photo-4101164.jpeg",
    "https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg",
    "https://images.pexels.com/photos/4098224/pexels-photo-4098224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]); // loop para el carrusel

  return (
    <div className="embla mt-26" ref={emblaRef}>
      <div className="embla__container">
        {sliderImages.map((sliderImage, index) => {
          return (
            <div
              className="embla__slide w-full h-screen flex flex-col justify-center items-center"
              style={{
                background: `url('${sliderImage}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              key={index}
            >
              <div className="w-full h-full flex flex-col justify-center items-center text-white px-5 sm:px-20 bg-[rgba(0,0,0,.5)]">
                {/* titulo */}
                <h2 className="text-2xl font-bold max-w-lg">
                  El departamento de psíquiatria ofrece:
                </h2>
                {/* texto */}
                <p className="sm:m-5 sm:p-5 max-w-[1024px]">
                  Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                  reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                  mollit ex esse exercitation amet. Nisi anim cupidatat
                  excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
                  est aliquip amet voluptate voluptate dolor minim nulla est
                  proident. Nostrud officia pariatur ut officia. Sit irure elit
                  esse ea nulla sunt ex occaecat reprehenderit commodo officia
                  dolor Lorem duis laboris cupidatat officia voluptate. Culpa
                  proident adipisicing id nulla nisi laboris ex in Lorem sunt
                  duis officia eiusmod.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
