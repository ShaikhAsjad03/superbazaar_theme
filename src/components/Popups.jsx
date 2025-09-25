  "use client";
  import { useEffect, useState } from "react";
  import { getPopups } from "@/services/homeService";
  import { X } from "lucide-react";
  import { ImageUrl } from "@/helper/imageUrl";

  const parseCooldown = (cooldownStr) => {
  
    if (!cooldownStr) return 1 * 60 * 60 * 1000; 
    const unit = cooldownStr.slice(-1);
    const value = parseInt(cooldownStr.slice(0, -1));
    if (unit === "m") return value * 60 * 1000; 
    if (unit === "h") return value * 60 * 60 * 1000;
    return 1 * 60 * 60 * 1000; 
  };

  const Popups = () => {
    const [popups, setPopups] = useState([]);
    const [visiblePopups, setVisiblePopups] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getPopups();
        const active = data.filter((p) => p.isActive);

        const filtered = active.filter((popup) => {
          const closedData = localStorage.getItem(`popup_closed_${popup.id}`);
          if (!closedData) return true;

          const { closedAt, cooldownStr } = JSON.parse(closedData);
          const now = Date.now();
          const cooldownMs = parseCooldown(cooldownStr);

          return now - closedAt > cooldownMs;
        });

        setPopups(filtered);
      };
      fetchData();
    }, []);

    useEffect(() => {
      popups.forEach((popup) => {
        setTimeout(() => {
        setVisiblePopups((prev) => {
    if (prev.find((p) => p.id === popup.id)) return prev; 
    return [...prev, popup];
  });


          if (popup.autoclose === "yes") {
            setTimeout(() => {
              setVisiblePopups((prev) =>
                prev.filter((p) => p.id !== popup.id)
              );
            }, 5000);
          }
        }, popup.delay * 1000);
      });
    }, [popups]);

    useEffect(() => {
      if (visiblePopups.length > 0) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [visiblePopups]);

    const closePopup = (id, cooldownStr = "2m") => {
    
      localStorage.setItem(
        `popup_closed_${id}`,
        JSON.stringify({ closedAt: Date.now(), cooldownStr })
      );
      setVisiblePopups((prev) => prev.filter((p) => p.id !== id));
    };

    const getPositionClasses = (position) => {
      switch (position) {
        case "center":
          return "flex items-center justify-center";
        case "bottom-right":
          return "flex items-end justify-end p-6";
        case "bottom-left":
          return "flex items-end justify-start p-6";
        case "top-right":
          return "flex items-start justify-end p-6";
        case "top-left":
          return "flex items-start justify-start p-6";
        default:
          return "flex items-center justify-center";
      }
    };

    return (
      <>
        {visiblePopups.map((popup) => (
          <div key={popup.id} className="fixed inset-0 z-50">
          
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => closePopup(popup.id, popup.cooldownStr || "2m")}
            ></div>

            <div
              className={`relative z-60 ${getPositionClasses(
                popup.modalPosition
              )} h-full w-full`}
            >
              <div
               className={`bg-white shadow-lg rounded-2xl relative animate-fadeIn flex flex-col
    ${
      popup.type === "newsletter"
        ? "max-w-md w-full"
        : "max-w-2xl w-full md:flex-row md:min-h-[340px]"
    }`}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black z-10"
                  onClick={() => closePopup(popup.id, popup.cooldownStr || "5m")}
                >
                  <X size={20} />
                </button>
                {popup.image && (
                  <div
                    className={`w-full ${
                      popup.type === "newsletter"
                        ? "h-75 "
                        : "md:w-1/2 h-60 md:min-h-[340px]"
                    }`}
                  >
                    <img
                      src={ImageUrl(popup.image)}
                      alt={popup.heading}
                      className={`w-full h-full ${
                        popup.type === "newsletter"
                          ? "rounded-t-2xl"
                          : "rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                      }`}
                    />
                  </div>
                )}

                <div
                  className={`w-full ${
                    popup.type === "newsletter" ? "" : "md:w-1/2"
                  } p-6 flex flex-col justify-center text-center md:text-left`}
                >
                  <h2
                    className={`text-xl font-bold mb-3 ${
                      popup.headingStyle === "center"
                        ? "text-center"
                        : popup.headingStyle === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {popup.heading}
                  </h2>
                  <p className="text-sm text-gray-800 mb-4">{popup.description}</p>

                  {popup.type === "newsletter" && (
                    <form className="flex flex-col gap-5">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border rounded-md p-3 text-sm w-full"
                      />
                      <button className="bg-zinc-950 text-white py-2 hover:bg-transparent hover:text-zinc-950 border border-zinc-950 transition">
                        Subscribe
                      </button>
                    </form>
                  )}

                  {popup.type === "default" && (
                    <a
                      href={popup.link}
                      className="text-center inline-block bg-zinc-950 text-white px-5 py-2 rounded-lg hover:bg-transparent hover:text-zinc-950 border border-zinc-950 transition"
                    >
                      Shop Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  export default Popups;
