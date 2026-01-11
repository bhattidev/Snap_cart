"use client";
import "leaflet/dist/leaflet.css";
import { RootState } from "@/redux/store";
import L, { LatLngExpression } from "leaflet";
import {
  ArrowLeft,
  Building,
  CreditCard,
  CreditCardIcon,
  Home,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  Truck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { totalmem } from "os";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Checkout = () => {
  const router = useRouter();

  const { userData } = useSelector((state: RootState) => state.user);
  const { subTotal, deliveryFee, finalTotal, cartData } = useSelector(
    (state: RootState) => state.cart
  );
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);

  /* Sync redux user data */
  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({
        ...prev,
        fullName: userData.name || "",
        mobile: userData.mobile || "",
      }));
    }
  }, [userData]);

  /* Get user location */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log("Location Error", err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  }, []);
  const DraggableMarker: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(position as LatLngExpression, 15, { animate: true });
    }, [position, map]);
    return (
      <Marker
        icon={markerIcon}
        position={position as LatLngExpression}
        draggable={true}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
      />
    );
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!position) return;
      try {
        const result = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`
        );
        setAddress((prev) => ({
          ...prev,
          city: result.data.address?.city || "",
          state: result.data.address?.state || "",
          pincode: result.data.address?.postcode || "",
          fullAddress: result.data.display_name || "",
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, [position]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log("Location Error", err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  };

  const handleSearchQuery = async () => {
    if (!searchQuery) return;
    setSearchLoading(true);
    const provider = new OpenStreetMapProvider();
    const result = await provider.search({ query: searchQuery });

    if (result && result.length > 0) {
      setSearchLoading(false);
      setPosition([result[0].y, result[0].x]);
    }
  };

  // Hanlde Cod Order
  const handleCodOrder = async () => {
    if (!position) {
      return null;
    }
    try {
      const result = await axios.post("/api/user/order", {
        userId: userData?._id,
        items: cartData.map((item) => ({
          grocery: item._id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: finalTotal,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          fullAddress: address.fullAddress,
          pincode: address.pincode,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod,
      });
      router.push("/user/order-success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[92%] md:w-[80%] mx-auto py-10 relative">
      {/* Back Button */}
      <motion.button
        onClick={() => router.push("/user/cart")}
        whileTap={{ scale: 0.97 }}
        className="absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
      >
        <ArrowLeft size={16} />
        <span>Back to cart</span>
      </motion.button>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        Checkout
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Address Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-green-700" />
            Delivery Address
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                placeholder="Full Name"
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
              />
            </div>

            {/* Mobile */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }))
                }
                placeholder="Mobile Number"
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
              />
            </div>

            {/* Full Address */}
            <div className="relative">
              <Home
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.fullAddress}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullAddress: e.target.value,
                  }))
                }
                placeholder="Full Address"
                className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
              />
            </div>

            {/* City / State / Pincode */}
            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="City"
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
                />
              </div>

              <div className="relative">
                <Navigation
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  placeholder="State"
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
                />
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pincode: e.target.value,
                    }))
                  }
                  placeholder="Pincode"
                  className="pl-10 w-full border rounded-lg p-3 text-sm bg-gray-50"
                />
              </div>
            </div>

            {/* Search */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search city or area..."
                className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={handleSearchQuery}
                className="px-5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition-all font-medium"
              >
                {searchLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>
            {/* map  */}
            <div className="relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              {position && (
                <MapContainer
                  center={position as LatLngExpression}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker />
                </MapContainer>
              )}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  handleCurrentLocation();
                }}
                className="absolute bottom-6 right-4 bg-green-600 text-white shadow-lg rounded-full p-3 hover:bg-green-700 transition-all flex items-center justify-center z-999"
              >
                <LocateFixed size={22} />
              </motion.button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 h-fit"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="text-green-600" /> Payment Method
          </h2>
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setPaymentMethod("online")}
              className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${
                paymentMethod === "online"
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
            >
              <CreditCardIcon className="text-green-600" />
              <span className="font-medium text-gray-700">
                Pay Onlice (stripe)
              </span>
            </button>
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all ${
                paymentMethod === "cod"
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
            >
              <Truck className="text-green-600" />
              <span className="font-medium text-gray-700">
                Cash on Delivery
              </span>
            </button>
          </div>
          <div className="border-t pt-4 text-gray-700 space-y-2 text-sm sm:text-base mr-1">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span className="min-w-16 flex justify-between text-green-600">
                <span>Rs.</span> <span>{subTotal}</span>
              </span>
            </div>
            <div className="flex justify-between font-semibold ">
              <span>Delivery Fee</span>
              <span className="min-w-16 flex justify-between text-green-600">
                <span>Rs.</span>
                <span>{deliveryFee}</span>
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3 border-gray-500">
              <span>Final Total</span>
              <span className="min-w-16 flex justify-between text-green-600">
                <span>Rs.</span>
                <span>{finalTotal}</span>
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => {
              if (paymentMethod === "cod") {
                handleCodOrder();
              } else {
                handleOnlineOrder();
              }
            }}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold"
          >
            {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
